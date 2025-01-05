import 'dotenv/config';
import pg from 'pg'; // Importar pg de postgres

const { Pool } = pg; // Destructuring del pool

const dbConfig = {
    user: 'postgres', // Reemplaza con tu usuario de la base de datos
    host: 'localhost', // Reemplaza con el host de tu base de datos
    database: 'db_aerolinea_eterea', // Reemplaza con el nombre de tu base de datos
    password: 'Admin1234', // Reemplaza con tu contraseña de la base de datos
    port: 5432 // Reemplaza con el puerto de tu base de datos
};

console.log("Configuración de la base de datos:", dbConfig); // Verificar la configuración

// Instancia nueva de Pool
export const db = new Pool({
    allowExitOnIdle: true, // se deja en true para que el pool se cierre cuando no se esté utilizando
    ...dbConfig // Conexión a la base de datos usando los parámetros definidos
});

// Probar conexión
try {
    await db.query('SELECT NOW()'); // Realizar una consulta
    console.log("Conexión Exitosa!!");
} catch (error) {
    console.error("Error en la conexión:", error);
}
