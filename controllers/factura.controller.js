import { facturaModel } from "../models/factura.model.js";

// http://localhost:3000/api/v1/facturas/register
const register = async (req, res) => {
    try {
        console.log(req.body);//
        const {id_pago, fecha_factura, detalles} = req.body;
    if(!id_pago || !fecha_factura || !detalles){
        return res.status(400).json({ok: false, 
                                    message: "Faltan campos!"});
    }
   

    //nueva funcionalidad o faltante
    const newFactura = await facturaModel.create({id_pago, fecha_factura, detalles});

    return res.status(201).json({
        ok: true,
        message: "factura creado exitosamente" 
    });
    
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: "Error al crear la factura!"
        });
    }
}

export const facturaController = {
    register
}