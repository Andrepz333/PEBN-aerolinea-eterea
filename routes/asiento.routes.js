import { Router } from "express";
import { asientoController } from "../controllers/asiento.controller.js";

const router = Router();

// Ruta para registrar un asiento
router.post('/register', asientoController.register);


export default router;