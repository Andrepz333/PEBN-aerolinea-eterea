import { db } from '../database/conexion_db.js';

const createUser = async ({email, password, role}) => {
    const query = {
        text: `
        INSERT INTO public.users (email, password, role) 
        VALUES ($1, $2, $3 ) 
        RETURNING email, password, role
        `,
        values: [email, password, role]
    };

    const { rows } = await db.query(query);
    return rows[0];
}

const showUser = async () => {
    try {
        const result = await db.query('SELECT id, email, role, created_at FROM public.users');
        return result.rows;
    } catch (error) {
        throw new Error('Error al obtener usuarios');
    }
}

const findOneByEmail = async (email) => {
    const query = {
        text:`
        SELECT * FROM public.users 
        WHERE email = $1`,
        values: [email]
    }
    const {rows} = await db.query(query);
    return rows[0];
}

export const UserModel = {
    createUser,
    showUser,
    findOneByEmail
}