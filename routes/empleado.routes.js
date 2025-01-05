import { Router } from "express";
import { EmpleadoController } from "../controllers/empleado.controller.js";

const router = Router();

// Ruta para registrar un Cliente
router.post('/register', EmpleadoController.register);


export default router;