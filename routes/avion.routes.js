import { Router } from "express";
import { avionController } from "../controllers/avion.controller.js";

const router = Router();

// Ruta para registrar un Cliente
router.post('/register', avionController.register);


export default router;