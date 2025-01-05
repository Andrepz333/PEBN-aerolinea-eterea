import {db} from '../database/conexion_db.js';

const create = async ({nombre, ciudad, pais, codigo_iata}) => {
    const query = {
        text: `
        INSERT INTO aerolinea.aeropuerto (nombre, ciudad, pais, codigo_iata)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        values: [nombre, ciudad, pais, codigo_iata]
    }
//(1076017781, 'Juan', 'Pérez', 'Ortiz', '123456789', '987654321', 'juan@codigo_iata.com')
    const { rows } = await db.query(query);//faltaba definir el rows
    return rows[0];
}

//Mostrar datos de los aeropuertos
const show = async (req, res) => {
    const result = await db.query('SELECT * FROM aerolinea.aeropuerto');
    res.json(result.rows);
}


//Buscar o validar si el codigo_iata ya existe
const findOneBycodigo_iata = async (codigo_iata) => {
    const query = {
        text: `
        SELECT * FROM aerolinea.aeropuerto
        WHERE codigo_iata = $1
        `,
        values: [codigo_iata]//faltaba
    }
    const {rows} = await db.query(query, [codigo_iata]);
    return rows[0];
}


export const aeropuertoModel = {
    create,
    show,
    findOneBycodigo_iata
}