import { Router } from "express";
import { ClientController } from "../controllers/Cliente.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/jwt.middlewares.js";

const router = Router();

// Ruta para registrar un cliente
router.post('/register', ClientController.registerCliente);

// Ruta para mostrar los clientes
router.get('/list', ClientController.listCliente);

// Ruta para buscar los clientes
router.get('/search', ClientController.searchCliente);

// Ruta para eliminar un cliente
router.delete('/:cliente_id', verifyToken, verifyAdmin, ClientController.deleteCliente);

// Ruta protegida para actualizar un cliente (PUT y PATCH)
router.put('/:cliente_id', verifyToken, verifyAdmin, ClientController.updateClient);
router.patch('/:cliente_id', verifyToken, verifyAdmin, ClientController.updateClient);

export default router;