//registrar un pasajero
document.addEventListener('DOMContentLoaded', () => {
    const registerPasajero = document.querySelector('#formPasajero')
    registerPasajero.addEventListener('submit', async e => {
        e.preventDefault();
        const nombre = e.target.nombre.value;
        const apellido = e.target.apellido.value;
        const numero_pasaporte = e.target.numero_pasaporte.value;
        const id_cliente = e.target.id_cliente.value;
    
        try {//api/v1/pasajeros/register
            const { data } = await axios.post('/api/v1/pasajeros/register', {
                nombre, apellido, numero_pasaporte, id_cliente
            });
        registerPasajero.reset();
        Swal.fire({
            icon: 'success',
            title: 'pasajero registrado',
            text: 'El pasajero ha sido registrado exitosamente'
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
    async function loadPasajeros() {
        try {
            const response = await axios.get('/api/v1/pasajeros/list');
            const pasajeros = response.data;
            const tableBody = document.getElementById('pasajerosTbBd');
            tableBody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos
    
            pasajeros.forEach(pasajero => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${pasajero.pasajero_id}</td>
                    <td>${pasajero.nombre}</td>
                    <td>${pasajero.apellido}</td>
                    <td>${pasajero.numero_pasaporte}</td>
                    <td>${pasajero.id_cliente}</td>
                    <td>
                        <button class="btn  btn-sm"  style="background-color: #b623f0; color: white; border: 1px solid #660066;"  onclick="updatePasajero('${pasajero.numero_pasaporte}')">Actualizar</button>
                        <button class="btn  btn-sm" style="background-color: #7fffd4; color: black; border: 1px solid #00CCCC;"   onclick="deletePasajero('${pasajero.numero_pasaporte}')">Eliminar</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error al cargar los pasajeros:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al cargar los pasajeros'
            });
        }
    }

    //Funcion para eliminar un pasajero
    async function deletePasajero(numero_pasaporte) {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`/api/v1/pasajeros/${numero_pasaporte}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Enviar el token en los encabezados de la solicitud
                }
            });
            console.log('Pasajero eliminado con éxito');
            Swal.fire({
                icon: 'success',
                title: 'Pasajero eliminado',
                text: 'El pasajero ha sido eliminado exitosamente'
            });
            loadPasajeros(); // Recargar la lista de  pasajeros después de eliminar
        } catch (error) {
            console.error('Error al eliminar el pasajero:', error);
            alert('Error al eliminar el pasajero');
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Error al eliminar el pasajero'
            });
        }
    }
    
    // Función para mostrar el formulario con los datos del cliente a actualizar
    async function updatePasajero(numero_pasaporte) {
        const token = localStorage.getItem('token');
        const updateFields = {
            nombre: prompt('Nuevo nombre:'),
            apellido: prompt('Nuevo apellido:'),
            numero_pasaporte: prompt('Nuevo numero_pasaporte:'),
            id_cliente: prompt('Nuevo cliente asignado:')
        };
    
        try {
            const { data } = await axios.patch(`/api/v1/pasajeros/${numero_pasaporte}`, updateFields, {
                headers: {
                    Authorization: `Bearer ${token}` // Enviar el token en los encabezados de la solicitud
                }
            });
            console.log('Pasajero actualizado con éxito');
            Swal.fire({
                icon: 'success',
                title: 'Pasajero actualizado',
                text: 'El Pasajero ha sido actualizado exitosamente'
            });
            loadPasajeros(); // Recargar la lista de clientes después de actualizar
        } catch (error) {
            console.error('Error al actualizar el cliente:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Error al actualizar el cliente'
            });
        }
    }

    //Funcion para buscar un pasajero 

    async function searchPasajero() {
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
    
            const response = await axios.get(`/api/v1/pasajeros/search?query=${searchInput}`);
            const pasajeros = response.data;
    
            if (!Array.isArray(pasajeros) || pasajeros.length === 0) {
                Swal.fire({
                    icon: 'info',
                    title: 'Sin resultados',
                    text: 'No se encontraron pasajeros con el criterio de búsqueda'
                });
                return;
            }
    
            const tableBody = document.getElementById('pasajerosTbBd');
            tableBody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos
    
            pasajeros.forEach(pasajero => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${pasajero.pasajero_id}</td>
                    <td>${pasajero.nombre}</td>
                    <td>${pasajero.apellido}</td>
                    <td>${pasajero.numero_pasaporte}</td>
                    <td>${pasajero.id_cliente}</td>
                    <td >
                        <button class="btn btn-sm"  style="background-color: #b623f0; color: white; border: 1px solid #660066;" onclick="updatePasajero('${pasajero.numero_pasaporte}')">Actualizar</button>
                        <button class="btn btn-sm"  style="background-color: #7fffd4; color: black; border: 1px solid #00CCCC;" onclick="deletePasajero('${pasajero.numero_pasaporte}')">Eliminar</button>
                        
                    </td>
                    
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error al buscar el pasajero:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al buscar el pasajero. Por favor, intente de nuevo.'
            });
        } finally {
            searchBtn.disabled = false; // Reactiva el botón
            searchBtn.innerHTML = '<i class="bi bi-search"></i>';
        }
    }
    
    
    
    // Exponer las funciones globalmente para que puedan ser llamadas desde el HTML
    window.deletePasajero = deletePasajero;
    window.updatePasajero = updatePasajero;
    window.loadPasajeros = loadPasajeros;
    window.searchPasajero = searchPasajero;
    });
