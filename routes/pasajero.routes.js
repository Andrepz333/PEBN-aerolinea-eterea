import { Router } from "express";
import { pasajeroController } from "../controllers/pasajero.controller.js";

const router = Router();

// Ruta para registrar un cliente
router.post('/register', pasajeroController.register);


export default router;