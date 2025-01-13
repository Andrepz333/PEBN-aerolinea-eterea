import {db} from '../database/conexion_db.js';

//Metodo Create
const createVuelo = async ({codigo_vuelo, fecha_salida, fecha_llegada, origen, destino, avion_asignado, empleados_asignados }) => {
    const query = {
        text: `
        INSERT INTO aerolinea.Vuelo (codigo_vuelo, fecha_salida, fecha_llegada, origen, destino, avion_asignado, empleados_asignados )
        VALUES ($1, $2, $3, $4 , $5, $6, $7)
        RETURNING *
        `,
        values: [codigo_vuelo, fecha_salida, fecha_llegada, origen, destino, avion_asignado, empleados_asignados ]
    }

    const { rows } = await db.query(query);
    return rows[0];
}

//Metodo Read
const readVuelo = async () => {
    const result = {
        text: `SELECT * FROM aerolinea.Vuelo ORDER BY Vuelo_id ASC` //organiza los datos de manera ascendente
    }
    const { rows } = await db.query(result);
    return rows
}

// Método Update modificado para usar codigo_vuelo
const updateVuelo = async (codigo_vuelo, updateFields) => {
    const setClause = Object.keys(updateFields).map((key, index) => `${key} = $${index + 2}`).join(', ');
    const values = [codigo_vuelo, ...Object.values(updateFields)];

    const updateQuery = {
        text: `
        UPDATE aerolinea.Vuelo
        SET ${setClause}
        WHERE codigo_vuelo = $1
        RETURNING *
        `,
        values: values
    };

    try {
        const { rows } = await db.query(updateQuery);
        if (rows.length === 0) {
            throw new Error('Vuelo no encontrado');
        }
        return rows[0];
    } catch (error) {
        console.error('Error al actualizar el Vuelo:', error);
        throw new Error('Error al intentar actualizar el Vuelo');
    }
};

// Buscar por número de codigo_vuelo
const findByCodigoVuelo = async (codigo_vuelo) => {
    const query = {
        text: `
        SELECT * FROM aerolinea.Vuelo 
        WHERE codigo_vuelo = $1
        `,
        values: [codigo_vuelo]
    }
    const {rows} = await db.query(query);
    return rows[0];
}

// Buscar por avion_asignado
const findByAvion = async (avion_asignado) => {
    const query = {
        text: `
        SELECT * FROM aerolinea.Vuelo
        WHERE avion_asignado = $1
        `,
        values: [avion_asignado]
    }
    const { rows } = await db.query(query);
    return rows; // Retorna todos los Vuelos asociados al avion
}

// Búsqueda flexible por codigo_vuelo o avion_asignado

const findByCodigoVueloOrAvion = async (searchQuery) => {
    let query;

    // Divide las condiciones para manejar diferentes tipos de datos
    query = {
        text: `
            SELECT * FROM aerolinea.Vuelo 
            WHERE 
                ($1::text IS NOT NULL AND codigo_vuelo = $1) OR
                ($2::int IS NOT NULL AND avion_asignado = $2)
        `,
        values: [searchQuery, !isNaN(searchQuery) ? parseInt(searchQuery, 10) : null] // Envía null si no aplica
    };

    try {
        const { rows } = await db.query(query);
        return rows;
    } catch (error) {
        console.error('Error al buscar Vuelo:', error);
        throw error; // Propaga el error para manejarlo en el controlador
    }
};


// Método Delete modificado para usar número de codigo_vuelo
const deleteVuelo = async (codigo_vuelo) => {
    const deleteQuery = {
        text: `
        DELETE FROM aerolinea.Vuelo
        WHERE codigo_vuelo = $1
        `,
        values: [codigo_vuelo]
    }
    try {
        const result = await db.query(deleteQuery);
        if (result.rowCount === 0) {
            throw new Error('Vuelo no encontrado');
        }
        return { success: true, message: 'Vuelo eliminado' };
    } catch (error) {
        console.error('Error al eliminar el Vuelo:', error);
        throw new Error('Error al intentar eliminar el Vuelo');
    }
}

export const vueloModel = {
    createVuelo,
    readVuelo,
    updateVuelo,
    deleteVuelo,
    findByCodigoVuelo,
    findByAvion,
    findByCodigoVueloOrAvion
}