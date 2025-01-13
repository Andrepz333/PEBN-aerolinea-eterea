import {db} from '../database/conexion_db.js';

//Metodo Create
const createPasajero = async ({nombre, apellido, numero_pasaporte, id_cliente}) => {
    const query = {
        text: `
        INSERT INTO aerolinea.pasajero (nombre, apellido, numero_pasaporte, id_cliente)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        values: [nombre, apellido, numero_pasaporte, id_cliente]
    }

    const { rows } = await db.query(query);
    return rows[0];
}

//Metodo Read
const readPasajero = async () => {
    const result = {
        text: `SELECT * FROM aerolinea.pasajero ORDER BY pasajero_id ASC` //organiza los datos de manera ascendente
    }
    const { rows } = await db.query(result);
    return rows
}

// Método Update modificado para usar número de pasaporte
const updatePasajero = async (numero_pasaporte, updateFields) => {
    const setClause = Object.keys(updateFields).map((key, index) => `${key} = $${index + 2}`).join(', ');
    const values = [numero_pasaporte, ...Object.values(updateFields)];

    const updateQuery = {
        text: `
        UPDATE aerolinea.pasajero
        SET ${setClause}
        WHERE numero_pasaporte = $1
        RETURNING *
        `,
        values: values
    };

    try {
        const { rows } = await db.query(updateQuery);
        if (rows.length === 0) {
            throw new Error('Pasajero no encontrado');
        }
        return rows[0];
    } catch (error) {
        console.error('Error al actualizar el pasajero:', error);
        throw new Error('Error al intentar actualizar el pasajero');
    }
};

// Buscar por número de pasaporte
const findByPasaporte = async (numero_pasaporte) => {
    const query = {
        text: `
        SELECT * FROM aerolinea.pasajero 
        WHERE numero_pasaporte = $1
        `,
        values: [numero_pasaporte]
    }
    const {rows} = await db.query(query);
    return rows[0];
}

// Buscar por ID del cliente
const findByIdCliente = async (id_cliente) => {
    const query = {
        text: `
        SELECT * FROM aerolinea.pasajero
        WHERE id_cliente = $1
        `,
        values: [id_cliente]
    }
    const { rows } = await db.query(query);
    return rows; // Retorna todos los pasajeros asociados al cliente
}

// Búsqueda flexible por pasaporte o id_cliente
const findByPasaporteOrIdCliente = async (searchQuery) => {
    let query;

    if (!isNaN(searchQuery)) {
        // Si `searchQuery` es un número, busca por `id_cliente`
        query = {
            text: `SELECT * FROM aerolinea.pasajero WHERE id_cliente = $1`,
            values: [parseInt(searchQuery, 10)] // Asegura que sea un entero
        };
    } else {
        // Si `searchQuery` no es un número, busca por `numero_pasaporte`
        query = {
            text: `SELECT * FROM aerolinea.pasajero WHERE numero_pasaporte = $1`,
            values: [searchQuery]
        };
    }

    try {
        const { rows } = await db.query(query);
        return rows;
    } catch (error) {
        console.error('Error al buscar pasajero:', error);
        throw error; // Propaga el error para manejarlo en el controlador
    }
};


// Método Delete modificado para usar número de pasaporte
const deletePasajero = async (numero_pasaporte) => {
    const deleteQuery = {
        text: `
        DELETE FROM aerolinea.pasajero
        WHERE numero_pasaporte = $1
        `,
        values: [numero_pasaporte]
    }
    try {
        const result = await db.query(deleteQuery);
        if (result.rowCount === 0) {
            throw new Error('Pasajero no encontrado');
        }
        return { success: true, message: 'Pasajero eliminado' };
    } catch (error) {
        console.error('Error al eliminar el pasajero:', error);
        throw new Error('Error al intentar eliminar el pasajero');
    }
}

export const pasajeroModel = {
    createPasajero,
    readPasajero,
    updatePasajero,
    deletePasajero,
    findByPasaporte,
    findByIdCliente,
    findByPasaporteOrIdCliente
}