import {db} from '../database/conexion_db.js';

const create = async ({nombre, apellido, numero_pasaporte, id_cliente }) => {
    const query = {
        text: `
        INSERT INTO aerolinea.pasajero (nombre, apellido, numero_pasaporte, id_cliente)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        values: [nombre, apellido, numero_pasaporte, id_cliente]
    }
//(1076017781, 'Juan', 'Pérez', 'Ortiz', '123456789', '987654321', 'juan@email.com')
    const { rows } = await db.query(query);//faltaba definir el rows
    return rows[0];
}

//Mostrar datos de los clientes
const show = async (req, res) => {
    const result = await db.query('SELECT * FROM aerolinea.pasajero');
    res.json(result.rows);
}


//Buscar o validar si el pasaporte ya existe

const findOneByPassport = async (numero_pasaporte) => {
    const query = {
        text: `
            SELECT * FROM aerolinea.pasajero
            WHERE numero_pasaporte = $1
        `,
        values: [numero_pasaporte]
    }
    const { rows } = await db.query(query, [numero_pasaporte]);
    return rows[0];
}


export const pasajeroModel = {
    create,
    show,
    findOneByPassport
}