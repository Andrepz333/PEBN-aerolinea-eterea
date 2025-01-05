import {db} from '../database/conexion_db.js';

const create = async ({cliente_asignado, vuelo_asignado, total_pasajeros, fecha_reserva, estado_reserva, total_a_pagar, asientos_asignados}) => {
    const query = {
        text: `
        INSERT INTO administracion.reserva (cliente_asignado, vuelo_asignado, total_pasajeros, fecha_reserva, estado_reserva, total_a_pagar, asientos_asignados)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `,
        values: [cliente_asignado, vuelo_asignado, total_pasajeros, fecha_reserva, estado_reserva, total_a_pagar, asientos_asignados]
    }
//(1076017781, 'Juan', 'Pérez', 'Ortiz', '123456789', '987654321', 'juan@email.com')
    const { rows } = await db.query(query);//faltaba definir el rows
    return rows[0];
}

//Mostrar datos de los reservas
const show = async (req, res) => {
    const result = await db.query('SELECT * FROM administracion.reserva');
    res.json(result.rows);
}

export const ReservaModel = {
    create,
    show
}