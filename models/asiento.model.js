import {db} from '../database/conexion_db.js';

const create = async ({numero_asiento, clase, estado, avion_perteneciente}) => {
    const query = {
        text: `
        INSERT INTO aerolinea.asiento(numero_asiento, clase, estado, avion_perteneciente)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        values: [numero_asiento, clase, estado, avion_perteneciente]
    }
//(1076017781, 'Juan', 'Pérez', 'Ortiz', '123456789', '987654321', 'juan@email.com')
    const { rows } = await db.query(query);//faltaba definir el rows
    return rows[0];
}

//Mostrar datos de los asientos
const show = async (req, res) => {
    const result = await db.query('SELECT * FROM aerolinea.asiento');
    res.json(result.rows);
}



export const asientoModel = {
    create,
    show
}