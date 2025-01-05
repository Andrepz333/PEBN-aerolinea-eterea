import { Router } from "express";
import { vueloController } from "../controllers/vuelo.controller.js";

const router = Router();

// Ruta para registrar un vuelo
router.post('/register', vueloController.register);


export default router;