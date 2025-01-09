import { Router } from "express";
import path from "path";
import { fileURLToPath } from 'url';



const router = Router();

//Ocultar la extencion del archivo

/* const __dirname = import.meta.dirname;
const publicPath = path.join(__dirname, "../public");

router.get('/clientes', (req, res) => {
    res.sendFile(publicPath + '/clientes.html');
});

router.get('/clientes', (req, res) => {
    res.sendFile();
}); */

const __filename = fileURLToPath(import.meta.url);//añadido
const __dirname = path.dirname(__filename);//añadido

//ruta login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

//ruta home
router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

//ruta cliente
router.get('/cliente', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/cliente.html'));
});

//ruta pasajero
router.get('/pasajero', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pasajero.html'));
});

//ruta vuelo
router.get('/vuelo', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/vuelo.html'));
});

//ruta aeropuerto
router.get('/aeropuerto', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/aeropuerto.html'));
});

//ruta avion
router.get('/avion', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/avion.html'));
});

//ruta asiento
router.get('/asiento', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/asiento.html'));
});

//ruta empleado
router.get('/empleado', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/empleado.html'));
});

//ruta reserva
router.get('/reserva', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/reserva.html'));
});

//ruta pago
router.get('/pago', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pago.html'));
});

//ruta factura
router.get('/factura', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/factura.html'));
});

//ruta Users
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

//ruta image
router.get('/img', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/img/freepik__candid-image-photography-natural-textures-highly-r__6280'));
});

//ruta image
router.get('/img eterea', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/img/freepik__candid-image-photography-natural-textures-highly-r__66554'));
});






export default router;
