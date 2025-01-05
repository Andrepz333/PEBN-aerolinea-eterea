import { Router } from "express";
import { facturaController } from "../controllers/factura.controller.js";

const router = Router();

// Ruta para registrar un Cliente
router.post('/register', facturaController.register);


export default router;