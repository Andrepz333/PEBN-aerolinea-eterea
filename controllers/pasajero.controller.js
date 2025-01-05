import { pasajeroModel } from "../models/pasajero.model.js";

// http://localhost:3000/api/v1/pasajeros/register
const register = async (req, res) => {
    try {
        console.log(req.body);//
        const {nombre, apellido, numero_pasaporte, id_cliente} = req.body;
    if(!nombre || !apellido || !numero_pasaporte || !id_cliente){
        return res.status(400).json({ok: false, 
                                    message: "Faltan campos!"});
    }
    const pasajero = await pasajeroModel.findOneByPassport(numero_pasaporte);
    if(pasajero){
        return res.status(409).json({ok:true, 
                                    message: "El pasajero ya existe!"});
    }

    //nueva funcionalidad o faltante
    const newPasajero = await pasajeroModel.create({nombre, apellido, numero_pasaporte,id_cliente});

    return res.status(201).json({
        ok: true,
        message: "Pasajero creado exitosamente"
    });
    
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: "Error al crear el cliente!"
        });
    }
}

export const pasajeroController = {
    register
}