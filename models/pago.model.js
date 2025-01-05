import {db} from '../database/conexion_db.js';

const create = async ({id_reserva, fecha_pago, monto, metodo_pago}) => {
    const query = {
        text: `
        INSERT INTO administracion.pago (id_reserva, fecha_pago, monto, metodo_pago)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        values: [id_reserva, fecha_pago, monto, metodo_pago]
    }
//(1076017781, 'Juan', 'Pérez', 'Ortiz', '123456789', '987654321', 'juan@email.com')
    const { rows } = await db.query(query);//faltaba definir el rows
    return rows[0];
}

//Mostrar datos de los clientes
const show = async (req, res) => {
    const result = await db.query('SELECT * FROM administracion.pago');
    res.json(result.rows);
}





export const pagoModel = {
    create,
    show
}