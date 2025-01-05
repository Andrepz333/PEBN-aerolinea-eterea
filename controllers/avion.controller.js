import { avionModel } from "../models/avion.model.js";

// http://localhost:3000/api/v1/aviones/register
const register = async (req, res) => {
    try {
        console.log(req.body);//
        const {modelo, capacidad_pasajeros,  piloto_id} = req.body;
    if(!modelo || !capacidad_pasajeros || !piloto_id ){
        return res.status(400).json({ok: false, 
                                    message: "Faltan campos!"});
    }
    
    //nueva funcionalidad o faltante
    const newAvion = await avionModel.create({modelo, capacidad_pasajeros,  piloto_id});

    return res.status(201).json({
        ok: true,
        message: "Avion creado exitosamente" //cambiar mensaje por cliente creado
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

export const avionController = {
    register
}