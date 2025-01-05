import {db} from '../database/conexion_db.js';

const create = async ({nombre, apellido, cargo, salario, fecha_contratacion, aeropuerto_asignado, email_empleado}) => {
    const query = {
        text: `
        INSERT INTO aerolinea.empleado (nombre, apellido, cargo, salario, fecha_contratacion, aeropuerto_asignado, email_empleado)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `,
        values: [nombre, apellido, cargo, salario, fecha_contratacion, aeropuerto_asignado, email_empleado]
    }
//(1076017781, 'Juan', 'Pérez', 'Ortiz', '123456789', '987654321', 'juan@email_empleado.com')
    const { rows } = await db.query(query);//faltaba definir el rows
    return rows[0];
}

//Mostrar datos de los empleados
const show = async (req, res) => {
    const result = await db.query('SELECT * FROM aerolinea.empleado');
    res.json(result.rows);
}

//Buscar o validar si el email_empleado ya existe
const findOneByEmail = async (email_empleado) => {
    const query = {
        text: `
        SELECT * FROM aerolinea.empleado
        WHERE email_empleado = $1
        `,
        values: [email_empleado]//faltaba
    }
    const {rows} = await db.query(query, [email_empleado]);
    return rows[0];
}


export const EmpleadoModel = {
    create,
    show,
    findOneByEmail
}