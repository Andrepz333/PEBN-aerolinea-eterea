import { pagoModel } from "../models/pago.model.js";

// http://localhost:3000/api/v1/pagos/register
const register = async (req, res) => {
    try {
        console.log(req.body);//
        const {id_reserva, fecha_pago, monto, metodo_pago} = req.body;
    if(!id_reserva || !fecha_pago || !monto || !metodo_pago ){
        return res.status(400).json({ok: false, 
                                    message: "Faltan campos!"});
    }
    

    //nueva funcionalidad o faltante
    const newpago = await pagoModel.create({id_reserva, fecha_pago, monto, metodo_pago});

    return res.status(201).json({
        ok: true,
        message: "pago creado exitosamente" 
    });
    
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: "Error al crear el pago!"
        });
    }
}

export const pagoController = {
    register
}