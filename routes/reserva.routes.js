import { Router } from "express";
import { ReservaController } from "../controllers/reserva.controller.js";

const router = Router();

// Ruta para registrar una reserva
router.post('/register', ReservaController.register);


export default router;