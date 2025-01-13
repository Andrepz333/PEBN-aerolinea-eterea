import { Router } from "express";
import { pasajeroController } from "../controllers/pasajero.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/jwt.middlewares.js";

const router = Router();

// Ruta para registrar un Pasajero
router.post('/register', pasajeroController.registerPasajero);

// Ruta para mostrar los Pasajeros
router.get('/list', pasajeroController.listPasajero);

// Ruta para buscar los Pasajeros
router.get('/search', pasajeroController.searchPasajero);

// Ruta para eliminar un Pasajero
router.delete('/:numero_pasaporte', verifyToken, verifyAdmin, pasajeroController.deletePasajero);

// Ruta protegida para actualizar un Pasajero (PUT y PATCH)
router.put('/:numero_pasaporte', verifyToken, verifyAdmin, pasajeroController.updatePasajero);
router.patch('/:numero_pasaporte', verifyToken, verifyAdmin, pasajeroController.updatePasajero);

export default router;