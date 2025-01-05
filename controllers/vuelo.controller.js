import { vueloModel } from "../models/vuelo.model.js";

// http://localhost:3000/api/v1/vuelos/register
const register = async (req, res) => {
    try {
        console.log(req.body);//
        const {codigo_vuelo, fecha_salida, fecha_llegada, origen, destino, avion_asignado, empleados_asignados} = req.body;
    if(!codigo_vuelo || !fecha_salida || !fecha_llegada ||  !origen || !destino ||!avion_asignado ||!empleados_asignados){
        return res.status(400).json({ok: false, 
                                    message: "Faltan campos!"});
    }
    const vuelo = await vueloModel.findOneByCodigoVuelo(codigo_vuelo);
    if(vuelo){
        return res.status(409).json({ok:true, 
                                    message: "El vuelo ya existe!"});
    }

    //nueva funcionalidad o faltante
    const newVuelo = await vueloModel.create({codigo_vuelo, fecha_salida, fecha_llegada, origen, destino, avion_asignado, empleados_asignados});

    return res.status(201).json({
        ok: true,
        message: "Vuelo creado exitosamente"
    });
    
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: "Error al crear el vuelo!"
        });
    }
}

export const vueloController = {
    register
}