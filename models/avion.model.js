import {db} from '../database/conexion_db.js';

const create = async ({modelo, capacidad_pasajeros,  piloto_id}) => {
    const query = {
        text: `
        INSERT INTO aerolinea.avion (modelo, capacidad_pasajeros,  piloto_id)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        values: [modelo, capacidad_pasajeros,  piloto_id]
    }
//(1076017781, 'Juan', 'Pérez', 'Ortiz', '123456789', '987654321', 'juan@email.com')
    const { rows } = await db.query(query);//faltaba definir el rows
    return rows[0];
}

//Mostrar datos de los aviones
const show = async (req, res) => {
    const result = await db.query('SELECT * FROM aerolinea.avion');
    res.json(result.rows);
}



export const avionModel = {
    create,
    show  
}