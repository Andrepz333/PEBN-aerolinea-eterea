import { pasajeroModel } from "../models/pasajero.model.js";

// http://localhost:3000/api/v1/pasajeros/register
const registerPasajero = async (req, res) => {
    try {
        console.log(req.body);//
        const {nombre, apellido, numero_pasaporte, id_cliente} = req.body;
    if(!nombre || !apellido || !numero_pasaporte || !id_cliente){
        return res.status(400).json({ok: false, 
                                    message: "Faltan campos!"});
    }
    const Pasajero = await pasajeroModel.findByPasaporte(numero_pasaporte);
    if(Pasajero){
        return res.status(409).json({ok:true, 
                                    message: "El Pasajero ya existe!"});
    }

    //nueva funcionalidad o faltante
    const newPasajero = await pasajeroModel.createPasajero({nombre, apellido, numero_pasaporte, id_cliente});

    return res.status(201).json({
        ok: true,
        message: newPasajero //cambiar mensaje por Pasajero creado
    });
    
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: "Error al crear el Pasajero!"
        });
    }
}


// http://localhost:3000/api/v1/Pasajeros/list
const listPasajero = async (req, res) => {
    try {
        const Pasajeros = await pasajeroModel.readPasajero();
        res.json(Pasajeros);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los Pasajeros' });
    }
};
// http://localhost:3000/api/v1/Pasajeros/search

const searchPasajero = async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({
            ok: false,
            message: 'El parámetro de búsqueda es requerido'
        });
    }

    try {
        const pasajeros = await pasajeroModel.findByPasaporteOrIdCliente(query);

        if (!pasajeros || pasajeros.length === 0) {
            return res.status(404).json({
                ok: false,
                message: 'No se encontraron Pasajeros'
            });
        }

        return res.json(pasajeros);

    } catch (error) {
        console.error('Error al buscar el Pasajero:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error en el servidor'
        });
    }
};


// http://localhost:3000/api/v1/Pasajeros/deletepasajeros
const deletePasajero = async (req, res) => {
    const { numero_pasaporte } = req.params;
    const userRole = req.role;

     // Verificar si el rol del usuario es "superadmin" o "editor"
     if (userRole !== 'Superadmin' && userRole !== 'editor') {
        return res.status(403).json({
            ok: false,
            message: 'No tienes permisos para eliminar Pasajeros'
        });
    }
    try {
        const result = await pasajeroModel.deletePasajero(numero_pasaporte);
        if (result.rowCount === 0) {
            return res.status(404).json({
                ok: false,
                message: 'Pasajero no encontrado'
            });
        }
        return res.status(200).json({
            ok: true,
            message: 'Pasajero eliminado correctamente'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Error al eliminar el Pasajero'
        });
    }
}

const updatePasajero = async (req, res) => {
    const { numero_pasaporte } = req.params;
    const updateFields = req.body;

    try {
        const updatedPasajero = await pasajeroModel.updatePasajero(numero_pasaporte, updateFields);
        return res.status(200).json({
            ok: true,
            message: 'Pasajero actualizado correctamente',
            data: updatedPasajero
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};

export const pasajeroController = {
    registerPasajero,
    listPasajero,
    searchPasajero,
    deletePasajero,
    updatePasajero
}