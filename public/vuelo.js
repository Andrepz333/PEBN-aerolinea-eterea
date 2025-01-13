//registrar un Vuelo
document.addEventListener('DOMContentLoaded', () => {
    const registerVuelo = document.querySelector('#formVuelo')
    registerVuelo.addEventListener('submit', async e => {
        e.preventDefault();
        const codigo_vuelo = e.target.codigo_vuelo.value;
        const fecha_salida = e.target.fecha_salida.value;
        const fecha_llegada= e.target.fecha_llegada.value;
        const origen = e.target.origen.value;
        const destino = e.target.destino.value;
        const avion_asignado = e.target.avion_asignado.value;
        const empleados_asignados = e.target.empleados_asignados.value;

    
        try {//api/v1/Vuelos/register
            const { data } = await axios.post('/api/v1/Vuelos/register', {
                codigo_vuelo, fecha_salida, fecha_llegada, origen, destino,avion_asignado,empleados_asignados
            });
        registerVuelo.reset();
        Swal.fire({
            icon: 'success',
            title: 'Vuelo registrado',
            text: 'El Vuelo ha sido registrado exitosamente'
        });
        } catch (error) {
            if (error.response) {
                console.error('Error de respuesta del servidor:', error.response.data);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response.data.message || 'Error de respuesta del servidor'
                });
            } else if (error.request) {
                console.error('No se recibió respuesta del servidor:', error.request);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se recibió respuesta del servidor'
                });
            } else {
                console.error('Error al configurar la solicitud:', error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al configurar la solicitud'
                });
            }
        }
    });
    
    //Funcion para obtener los datos de la DB 
    async function loadVuelos() {
        try {
            const response = await axios.get('/api/v1/Vuelos/list');
            const Vuelos = response.data;
            const tableBody = document.getElementById('VuelosTbBd');
            tableBody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos
    
            Vuelos.forEach(Vuelo => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${Vuelo.vuelo_id}</td>
                    <td>${Vuelo.codigo_vuelo}</td>
                    <td>${Vuelo.fecha_salida}</td>
                    <td>${Vuelo.fecha_llegada}</td>
                    <td>${Vuelo.origen}</td>
                    <td>${Vuelo.destino}</td>
                    <td>${Vuelo.avion_asignado}</td>
                    <td>${Vuelo.empleados_asignados}</td>
                    <td>
                        <button class="btn  btn-sm"  style="background-color: #b623f0; color: white; border: 1px solid #660066;"  onclick="updateVuelo('${Vuelo.codigo_vuelo}')">Actualizar</button>
                        <button class="btn  btn-sm" style="background-color: #7fffd4; color: black; border: 1px solid #00CCCC;"   onclick="deleteVuelo('${Vuelo.codigo_vuelo}')">Eliminar</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error al cargar los Vuelos:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al cargar los Vuelos'
            });
        }
    }

    //Funcion para eliminar un Vuelo
    async function deleteVuelo(codigo_vuelo) {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`/api/v1/Vuelos/${codigo_vuelo}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Enviar el token en los encabezados de la solicitud
                }
            });
            console.log('Vuelo eliminado con éxito');
            Swal.fire({
                icon: 'success',
                title: 'Vuelo eliminado',
                text: 'El Vuelo ha sido eliminado exitosamente'
            });
            loadVuelos(); // Recargar la lista de  Vuelos después de eliminar
        } catch (error) {
            console.error('Error al eliminar el Vuelo:', error);
            alert('Error al eliminar el Vuelo');
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Error al eliminar el Vuelo'
            });
        }
    }
    
    // Función para mostrar el formulario con los datos del cliente a actualizar
    async function updateVuelo(codigo_vuelo) {
        const token = localStorage.getItem('token');
        const updateFields = {
            codigo_vuelo: prompt('Nuevo codigo_vuelo:'),
            fecha_salida: prompt('Nueva fecha_salida:'),
            fecha_llegada: prompt('Nueva fecha_llegada:'),
            origen: prompt('Nuevo origen :'),
            destino: prompt('Nuevo destino:'),
            avion_asignado: prompt('Nuevo avion_asignado:'),
            empleados_asignados: prompt('Nuevos empleados_asignados:')
        };
    
        try {
            const { data } = await axios.patch(`/api/v1/Vuelos/${codigo_vuelo}`, updateFields, {
                headers: {
                    Authorization: `Bearer ${token}` // Enviar el token en los encabezados de la solicitud
                }
            });
            console.log('Vuelo actualizado con éxito');
            Swal.fire({
                icon: 'success',
                title: 'Vuelo actualizado',
                text: 'El Vuelo ha sido actualizado exitosamente'
            });
            loadVuelos(); // Recargar la lista de clientes después de actualizar
        } catch (error) {
            console.error('Error al actualizar el cliente:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Error al actualizar el cliente'
            });
        }
    }

    //Funcion para buscar un Vuelo 

    async function searchVuelo() {
        const searchInput = document.getElementById('searchInput').value.trim();
        const searchBtn = document.querySelector('.btn-outline-success');
    
        if (!searchInput) {
            Swal.fire({
                icon: 'warning',
                title: 'Atención',
                text: 'Por favor, ingrese un valor para buscar'
            });
            return;
        }
    
        try {
            searchBtn.disabled = true; // Desactiva el botón mientras carga
            searchBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Buscando...`;
    
            const response = await axios.get(`/api/v1/Vuelos/search?query=${searchInput}`);
            const Vuelos = response.data;
    
            if (!Array.isArray(Vuelos) || Vuelos.length === 0) {
                Swal.fire({
                    icon: 'info',
                    title: 'Sin resultados',
                    text: 'No se encontraron Vuelos con el criterio de búsqueda'
                });
                return;
            }
    
            const tableBody = document.getElementById('VuelosTbBd');
            tableBody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos
    
            Vuelos.forEach(Vuelo => {
                const row = document.createElement('tr');
                row.innerHTML = `
                  
                     <td>${Vuelo.vuelo_id}</td>
                    <td>${Vuelo.codigo_vuelo}</td>
                    <td>${Vuelo.fecha_salida}</td>
                    <td>${Vuelo.fecha_llegada}</td>
                    <td>${Vuelo.origen}</td>
                    <td>${Vuelo.destino}</td>
                    <td>${Vuelo.avion_asignado}</td>
                    <td>${Vuelo.empleados_asignados}</td>

                    <td >
                        <button class="btn btn-sm"  style="background-color: #b623f0; color: white; border: 1px solid #660066;" onclick="updateVuelo('${Vuelo.codigo_vuelo}')">Actualizar</button>
                        <button class="btn btn-sm"  style="background-color: #7fffd4; color: black; border: 1px solid #00CCCC;" onclick="deleteVuelo('${Vuelo.codigo_vuelo}')">Eliminar</button>
                        
                    </td>
                    
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error al buscar el Vuelo:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al buscar el Vuelo. Por favor, intente de nuevo.'
            });
        } finally {
            searchBtn.disabled = false; // Reactiva el botón
            searchBtn.innerHTML = '<i class="bi bi-search"></i>';
        }
    }
    
    
    
    // Exponer las funciones globalmente para que puedan ser llamadas desde el HTML
    window.deleteVuelo = deleteVuelo;
    window.updateVuelo = updateVuelo;
    window.loadVuelos = loadVuelos;
    window.searchVuelo = searchVuelo;
    });
