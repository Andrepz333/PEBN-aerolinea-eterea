import { Router } from "express";
import { pagoController } from "../controllers/pago.controller.js";

const router = Router();

// Ruta para registrar un pago
router.post('/register', pagoController.register);


export default router;