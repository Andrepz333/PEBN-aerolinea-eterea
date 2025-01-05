import {db} from '../database/conexion_db.js';

const create = async ({codigo_vuelo, fecha_salida, fecha_llegada, origen, destino, avion_asignado, empleados_asignados }) => {
    const query = {
        text: `
        INSERT INTO aerolinea.vuelo (codigo_vuelo, fecha_salida, fecha_llegada, origen, destino, avion_asignado, empleados_asignados)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `,
        values: [codigo_vuelo, fecha_salida, fecha_llegada, origen, destino, avion_asignado, empleados_asignados ]
    }
//(1076017781, 'Juan', 'Pérez', 'Ortiz', '123456789', '987654321', 'juan@email.com')
    const { rows } = await db.query(query);//faltaba definir el rows
    return rows[0];
}

//Mostrar datos de los clientes
const show = async (req, res) => {
    const result = await db.query('SELECT * FROM aerolinea.vuelo');
    res.json(result.rows);
}


//Buscar o validar si el codigo vuelo ya existe
const findOneByCodigoVuelo = async (codigo_vuelo) => {
    const query = {
        text: `
            SELECT * FROM aerolinea.vuelo
            WHERE codigo_vuelo = $1
        `,
        values: [codigo_vuelo]
    };
    const { rows } = await db.query(query, [codigo_vuelo]);
    return rows[0];
};


export const vueloModel = {
    create,
    show,
    findOneByCodigoVuelo
}