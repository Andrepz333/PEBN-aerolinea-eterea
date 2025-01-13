document.addEventListener('DOMContentLoaded', () => {
    const registerClient = document.querySelector('#formCliente')
    registerClient.addEventListener('submit', async e => {
        e.preventDefault();
        const cliente_id = e.target.cliente_id.value;
        const nombre = e.target.nombre.value;
        const apellido = e.target.apellido.value;
        const direccion = e.target.direccion.value;
        const telefono = e.target.telefono.value;
        const email = e.target.email.value;
    
        try {//api/v1/clientes/register
            const { data } = await axios.post('/api/v1/clientes/register', {
                cliente_id, nombre, apellido, direccion, telefono, email
            });
        registerClient.reset();
        Swal.fire({
            icon: 'success',
            title: 'Cliente registrado',
            text: 'El cliente ha sido registrado exitosamente'
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
    
    //Obtener los datos de la DB 
    async function loadClientes() {
        try {
            const response = await axios.get('/api/v1/clientes/list');
            const clientes = response.data;
            const tableBody = document.getElementById('clientesTbBd');
            tableBody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos
    
            clientes.forEach(cliente => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${cliente.cliente_id}</td>
                    <td>${cliente.nombre}</td>
                    <td>${cliente.apellido}</td>
                    <td>${cliente.direccion}</td>
                    <td>${cliente.telefono}</td>
                    <td>${cliente.email}</td>
                    <td>
                        <button class="btn  btn-sm"  style="background-color: #b623f0; color: white; border: 1px solid #660066;"  onclick="updateCliente('${cliente.cliente_id}')">Actualizar</button>
                        <button class="btn  btn-sm" style="background-color: #7fffd4; color: black; border: 1px solid #00CCCC;"   onclick="deleteCliente('${cliente.cliente_id}')">Eliminar</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error al cargar los clientes:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al cargar los clientes'
            });
        }
    }
    async function deleteCliente(cliente_id) {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`/api/v1/clientes/${cliente_id}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Enviar el token en los encabezados de la solicitud
                }
            });
            console.log('Cliente eliminado con éxito');
            Swal.fire({
                icon: 'success',
                title: 'Cliente eliminado',
                text: 'El cliente ha sido eliminado exitosamente'
            });
            loadClientes(); // Recargar la lista de clientes después de eliminar
        } catch (error) {
            console.error('Error al eliminar el cliente:', error);
            alert('Error al eliminar el Cliente');
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Error al eliminar el cliente'
            });
        }
    }
    
    // Función para mostrar el formulario con los datos del cliente a actualizar
    async function updateCliente(cliente_id) {
        const token = localStorage.getItem('token');
        const updateFields = {
            nombre: prompt('Nuevo nombre:'),
            apellido: prompt('apellido:'),
            direccion: prompt('Nueva direccion:'),
            telefono: prompt('Nuevo teléfono :'),
            email: prompt('Nuevo correo electrónico:')
        };
    
        try {
            const { data } = await axios.patch(`/api/v1/clientes/${cliente_id}`, updateFields, {
                headers: {
                    Authorization: `Bearer ${token}` // Enviar el token en los encabezados de la solicitud
                }
            });
            console.log('Cliente actualizado con éxito');
            Swal.fire({
                icon: 'success',
                title: 'Cliente actualizado',
                text: 'El cliente ha sido actualizado exitosamente'
            });
            loadClientes(); // Recargar la lista de clientes después de actualizar
        } catch (error) {
            console.error('Error al actualizar el cliente:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Error al actualizar el cliente'
            });
        }
    }

    async function searchCliente() {
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
    
            const response = await axios.get(`/api/v1/clientes/search?query=${searchInput}`);
            const clientes = response.data;
    
            if (!Array.isArray(clientes) || clientes.length === 0) {
                Swal.fire({
                    icon: 'info',
                    title: 'Sin resultados',
                    text: 'No se encontraron clientes con el criterio de búsqueda'
                });
                return;
            }
    
            const tableBody = document.getElementById('clientesTbBd');
            tableBody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos
    
            clientes.forEach(cliente => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${cliente.cliente_id}</td>
                    <td>${cliente.nombre}</td>
                    <td>${cliente.apellido}</td>
                    <td>${cliente.direccion}</td>
                    <td>${cliente.telefono}</td>
                    <td>${cliente.email}</td>
                    <td>
                        <button class="btn btn-sm"  style="background-color: #b623f0; color: white; border: 1px solid #660066;" onclick="updateCliente('${cliente.cliente_id}')">Actualizar</button>
                        <button class="btn btn-sm"  style="background-color: #7fffd4; color: black; border: 1px solid #00CCCC;" onclick="deleteCliente('${cliente.cliente_id}')">Eliminar</button>
                    </td>
                    
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error al buscar el cliente:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al buscar el cliente. Por favor, intente de nuevo.'
            });
        } finally {
            searchBtn.disabled = false; // Reactiva el botón
            searchBtn.innerHTML = '<i class="bi bi-search"></i>';
        }
    }
    
    
    
    // Exponer las funciones globalmente para que puedan ser llamadas desde el HTML
    window.deleteCliente = deleteCliente;
    window.updateCliente = updateCliente;
    window.loadClientes = loadClientes;
    window.searchCliente = searchCliente;
    });

    