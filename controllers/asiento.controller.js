import { asientoModel } from "../models/asiento.model.js";

// http://localhost:3000/api/v1/asientos/register
const register = async (req, res) => {
    try {
        console.log(req.body);//
        const {numero_asiento, clase, estado, avion_perteneciente} = req.body;
    if(!numero_asiento || !clase || !estado || !avion_perteneciente ){
        return res.status(400).json({ok: false, 
                                    message: "Faltan campos!"});
    }
    

    //nueva funcionalidad o faltante
    const newAsiento= await asientoModel.create({numero_asiento, clase, estado, avion_perteneciente});

    return res.status(201).json({
        ok: true,
        message: "Asiento creado exitosamente" 
    });
    
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: "Error al crear el asiento!"
        });
    }
}

export const asientoController = {
    register
}