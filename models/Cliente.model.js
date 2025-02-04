import {db} from '../database/conexion_db.js';
//Metodo Create
const createCliente = async ({cliente_id, nombre, apellido,  direccion, telefono, email}) => {
    const query = {
        text: `
        INSERT INTO aerolinea.cliente (cliente_id, nombre, apellido,  direccion, telefono, email)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
        `,
        values: [cliente_id, nombre, apellido,  direccion, telefono, email]
    }

    const { rows } = await db.query(query);
    return rows[0];
}

//Metodo Read
const readCliente = async () => {
    const result = {
        text: `
        SELECT * FROM aerolinea.cliente ORDER BY cliente_id ASC` // ordenar los datos en forma ascendente
    }
    const { rows } = await db.query(result);
    return rows
}

const updateCliente = async (cliente_id, updateFields) => {
    const setClause = Object.keys(updateFields).map((key, index) => `${key} = $${index + 2}`).join(', ');
    const values = [cliente_id, ...Object.values(updateFields)];

    const updateQuery = {
        text: `
        UPDATE aerolinea.cliente
        SET ${setClause}
        WHERE cliente_id = $1
        RETURNING *
        `,
        values: values
    };

    try {
        const { rows } = await db.query(updateQuery);
        if (rows.length === 0) {
            throw new Error('Cliente no encontrado');
        }
        return rows[0];
    } catch (error) {
        console.error('Error al actualizar el cliente:', error);
        throw new Error('Error al intentar actualizar el cliente');
    }
};

//Buscar o validar por email
const findOneByEmail = async (email) => {
    const query = {
        text: `
        SELECT * FROM aerolinea.cliente 
        WHERE email = $1
        `,
        values: [email]//faltaba
    }
    const {rows} = await db.query(query, [email]);
    return rows[0];
}
//Buscar por ID
const findBycliente_id = async (cliente_id) => {
    const query = {
        text: `
        SELECT * FROM aerolinea.cliente
        WHERE cliente_id = $1
        `,
        values: [cliente_id]
    }
    const { rows } = await db.query(query)
    return rows[0]
}
const findIdOrEmail = async (query) => {
    const isNumber = !isNaN(query); // Verifica si el query es numérico
    const text = isNumber 
        ? 'SELECT * FROM aerolinea.cliente WHERE cliente_id = $1' 
        : 'SELECT * FROM aerolinea.cliente WHERE email = $1';

    const values = [query];

    const { rows } = await db.query({ text, values });
    return rows; // Devuelve directamente las filas
};


//Metodo Delete
const deleteCliente = async (cliente_id) => {
    const deleteQuery = {
        text: `
        DELETE FROM aerolinea.cliente
        WHERE cliente_id = $1
        `,
        values: [cliente_id]
    }
    try {
        const result = await db.query(deleteQuery);
        if (result.rowCount === 0) {
            throw new Error('Cliente no encontrado');
    }
     // Si la eliminación fue exitosa, podemos devolver un mensaje o un valor
        return { success: true, message: 'Cliente eliminado' };

    }catch (error) {
        // Manejo de errores en caso de fallos en la consulta
        console.error('Error al eliminar el cliente:', error);
        throw new Error('Error al intentar eliminar el cliente');
        
    }
}


export const ClientModel = {
    createCliente,
    readCliente,
    updateCliente,
    deleteCliente,
    findOneByEmail,
    findBycliente_id,
    findIdOrEmail
}