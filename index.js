import 'dotenv/config'; // Importa la configuración de entorno 
import express from 'express'; // Importar el modulo express
// import cors from 'cors'; // Importar el modulo cors
import clienteRouter from './routes/Cliente.routes.js';
import publicRouter from './routes/public.routes.js';
import usersRouter from './routes/users.routes.js';
import pasajeroRouter from './routes/pasajero.routes.js';
import vueloRouter from './routes/vuelo.routes.js';
import aeropuertoRouter from './routes/aeropuerto.routes.js';
import avionRouter from './routes/avion.routes.js';
import asientoRouter from './routes/asiento.routes.js';
import empleadoRouter from './routes/empleado.routes.js';
import reservaRouter from './routes/reserva.routes.js';
import pagoRouter from './routes/pago.routes.js';
import facturaRouter from './routes/factura.routes.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);//añadido
const __dirname = path.dirname(__filename);//añadido

const app = express(); // Crear una instancia de express

/* app.get('/', (req,res,next) => {// app.get a la ruta raiz, funcion de callback
    res.send('Hello World!') // respuesta del servidor
}); */

// Redirigir la ruta raíz a la página de login
app.get('/', (req, res) => {
    res.redirect('/login');
});


//Middleware de aplicación app.use()
//app.use(cors());
app.use(express.json()); // Parsear el body de la petición a JSON
app.use(express.urlencoded({ extended: true })); // Formdata para trámites con formularios

// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));


// Usar rutas
app.use('/', publicRouter);
app.use('/api/v1/clientes', clienteRouter); // Vista cliente
app.use('/api/v1/users', usersRouter); // Vista Usuario
app.use('/api/v1/pasajeros', pasajeroRouter); // Vista Pasajero
app.use('/api/v1/vuelos', vueloRouter); // Vista Vuelo
app.use('/api/v1/aeropuertos', aeropuertoRouter); // Vista aeropuerto
app.use('/api/v1/aviones', avionRouter); // Vista avión
app.use('/api/v1/asientos', asientoRouter); // Vista asiento
app.use('/api/v1/empleados', empleadoRouter); // Vista empleado
app.use('/api/v1/reservas', reservaRouter); // Vista reserva
app.use('/api/v1/pagos', pagoRouter); // Vista pago
app.use('/api/v1/facturas', facturaRouter); // Vista factura

// RUTAS
const PORT = process.env.PORT || 3001; // Para usar process.env se importa dotenv/config

// Levantar el servidor
app.listen(PORT, () => { console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`)});