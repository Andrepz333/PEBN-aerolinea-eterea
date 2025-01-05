import { ReservaModel } from "../models/reserva.model.js";

// http://localhost:3000/api/v1/reservas/register
const register = async (req, res) => {
    try {
        console.log(req.body);//
        const {cliente_asignado, vuelo_asignado, total_pasajeros, fecha_reserva, estado_reserva, total_a_pagar, asientos_asignados} = req.body;
    if(!cliente_asignado || !vuelo_asignado || !total_pasajeros || !fecha_reserva || !estado_reserva|| !total_a_pagar|| !asientos_asignados){
        return res.status(400).json({ok: false, 
                                    message: "Faltan campos!"});
    }
    
    //nueva funcionalidad o faltante
    const newReserva = await ReservaModel.create({cliente_asignado, vuelo_asignado, total_pasajeros, fecha_reserva, estado_reserva, total_a_pagar, asientos_asignados});

    return res.status(201).json({
        ok: true,
        message: "Reserva creada exitosamente" 
    });
    
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: "Error al crear el reserva!"
        });
    }
}

export const ReservaController = {
    register
}