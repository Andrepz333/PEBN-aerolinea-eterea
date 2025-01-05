import { Router } from "express";
import { aeropuertoController } from "../controllers/aeropuerto.controller.js";

const router = Router();

// Ruta para registrar un aeropuerto
router.post('/register', aeropuertoController.register);


export default router;