import { aeropuertoModel } from "../models/aeropuerto.model.js";

// http://localhost:3000/api/v1/aeropuertos/register
const register = async (req, res) => {
    try {
        console.log(req.body);//
        const {nombre, ciudad, pais, codigo_iata} = req.body;
    if(!nombre || !ciudad || !pais || !codigo_iata){
        return res.status(400).json({ok: false, 
                                    message: "Faltan campos!"});
    }
    const aeropuerto = await aeropuertoModel.findOneBycodigo_iata(codigo_iata);
    if(aeropuerto){
        return res.status(409).json({ok:true, 
                                    message: "El aeropuerto ya existe!"});
    }

    //nueva funcionalidad o faltante
    const newAeropuerto = await aeropuertoModel.create({nombre, ciudad, pais, codigo_iata});

    return res.status(201).json({
        ok: true,
        message: "Aeropuerto creado exitosamente" 
    });
    
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: "Error al crear el aeropuerto!"
        });
    }
}

export const aeropuertoController = {
    register
}