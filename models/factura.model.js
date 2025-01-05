import {db} from '../database/conexion_db.js';

const create = async ({id_pago, fecha_factura, detalles}) => {
    const query = {
        text: `
        INSERT INTO administracion.factura (id_pago, fecha_factura, detalles)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        values: [id_pago, fecha_factura, detalles]
    }
//(1076017781, 'Juan', 'Pérez', 'Ortiz', '123456789', '987654321', 'juan@email.com')
    const { rows } = await db.query(query);//faltaba definir el rows
    return rows[0];
}

//Mostrar datos de los clientes
const show = async (req, res) => {
    const result = await db.query('SELECT * FROM administracion.factura');
    res.json(result.rows);
}





export const facturaModel = {
    create,
    show
}