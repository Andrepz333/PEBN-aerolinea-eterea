import { vueloModel } from "../models/vuelo.model.js";

// http://localhost:3000/api/v1/vuelos/register
const registerVuelo = async (req, res) => {
    try {
        console.log(req.body);//
        const {codigo_vuelo, fecha_salida, fecha_llegada, origen, destino, avion_asignado, empleados_asignados } = req.body;
    if(!codigo_vuelo ||!fecha_salida ||!fecha_llegada ||!origen || !destino || !avion_asignado || !empleados_asignados){
        return res.status(400).json({ok: false, 
                                    message: "Faltan campos!"});
    }
    const Vuelo = await vueloModel.findByCodigoVuelo(codigo_vuelo);
    if(Vuelo){
        return res.status(409).json({ok:true, 
                                    message: "El Vuelo ya existe!"});
    }

    //nueva funcionalidad o faltante
    const newVuelo = await vueloModel.createVuelo({codigo_vuelo, fecha_salida, fecha_llegada, origen, destino, avion_asignado, empleados_asignados });

    return res.status(201).json({
        ok: true,
        message: newVuelo //cambiar mensaje por Vuelo creado
    });
    
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: "Error al crear el Vuelo!"
        });
    }
}


// http://localhost:3000/api/v1/vuelos/list
const listVuelo = async (req, res) => {
    try {
        const vuelos = await vueloModel.readVuelo();
        res.json(vuelos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los vuelos' });
    }
};

// http://localhost:3000/api/v1/vuelos/search

const searchVuelo = async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({
            ok: false,
            message: 'El parámetro de búsqueda es requerido'
        });
    }

    try {
        const vuelos = await vueloModel.findByCodigoVueloOrAvion(query);

        if (!vuelos || vuelos.length === 0) {
            return res.status(404).json({
                ok: false,
                message: 'No se encontraron vuelos'
            });
        }

        return res.json(vuelos);
    } catch (error) {
        console.error('Error al buscar el Vuelo:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error en el servidor'
        });
    }
};



// http://localhost:3000/api/v1/vuelos/deletevuelos
const deleteVuelo = async (req, res) => {
    const { codigo_vuelo } = req.params;
    const userRole = req.role;

     // Verificar si el rol del usuario es "superadmin" o "editor"
     if (userRole !== 'Superadmin' && userRole !== 'editor') {
        return res.status(403).json({
            ok: false,
            message: 'No tienes permisos para eliminar vuelos'
        });
    }
    try {
        const result = await vueloModel.deleteVuelo(codigo_vuelo);
        if (result.rowCount === 0) {
            return res.status(404).json({
                ok: false,
                message: 'Vuelo no encontrado'
            });
        }
        return res.status(200).json({
            ok: true,
            message: 'Vuelo eliminado correctamente'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Error al eliminar el Vuelo'
        });
    }
}

const updateVuelo = async (req, res) => {
    const { codigo_vuelo } = req.params;
    const updateFields = req.body;

    try {
        const updatedVuelo = await vueloModel.updateVuelo(codigo_vuelo, updateFields);
        return res.status(200).json({
            ok: true,
            message: 'Vuelo actualizado correctamente',
            data: updatedVuelo
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};

export const vueloController = {
    registerVuelo,
    listVuelo,
    searchVuelo,
    deleteVuelo,
    updateVuelo
}