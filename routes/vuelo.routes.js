import { Router } from "express";
import { vueloController } from "../controllers/vuelo.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/jwt.middlewares.js";

const router = Router();

// Ruta para registrar un Vuelo
router.post('/register', vueloController.registerVuelo);

// Ruta para mostrar los Vuelos
router.get('/list', vueloController.listVuelo);

// Ruta para buscar los Vuelos
router.get('/search', vueloController.searchVuelo);

// Ruta para eliminar un Vuelo
router.delete('/:codigo_vuelo', verifyToken, verifyAdmin, vueloController.deleteVuelo);

// Ruta protegida para actualizar un Vuelo (PUT y PATCH)
router.put('/:codigo_vuelo', verifyToken, verifyAdmin, vueloController.updateVuelo);
router.patch('/:codigo_vuelo', verifyToken, verifyAdmin, vueloController.updateVuelo);

export default router;