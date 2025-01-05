/**
 * Configuracion del servidor
 */
import dotenv from 'dotenv';
dotenv.config(); // Importa la configuración de entorno 

import express from 'express'; // Importar el modulo express
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
app.use(express.json());//parsear el body de la petición a json
app.use(express.urlencoded({ extended: true}));//formdata para tramites con formularios
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
/* app.use(express.static('img')); */


app.use('/', publicRouter);//
app.use('/api/v1/clientes', clienteRouter);//vista cliente
app.use('/api/v1/users', usersRouter);//vista Usuario
app.use('/api/v1/pasajeros', pasajeroRouter);//vista Pasajero
app.use('/api/v1/vuelos', vueloRouter);//vista Vuelo
app.use('/api/v1/aeropuertos', aeropuertoRouter);//vista aeropuerto
app.use('/api/v1/aviones', avionRouter);//vista avion
app.use('/api/v1/asientos', asientoRouter);//vista asiento
app.use('/api/v1/empleados', empleadoRouter);//vista empleado
app.use('/api/v1/reservas', reservaRouter);//vista reserva
app.use('/api/v1/pagos', pagoRouter);//vista pago
app.use('/api/v1/facturas', facturaRouter);//vista factura






//RUTAS 
const PORT = process.env.PORT || 3000; // Para usar procces.env se importa el dotenv/config

//Levantar el servidor 
app.listen(PORT, () => { console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`)});