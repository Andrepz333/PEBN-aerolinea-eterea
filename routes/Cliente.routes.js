import express from 'express';
import { ClientController } from '../controllers/Cliente.controller.js';
import { verifyToken, verifyAdmin } from '../middlewares/jwt.middlewares.js'; // Asegúrate de importar estos middlewares

const router = express.Router();

// http://localhost:3000/api/v1/clientes/register
router.post('/register', ClientController.registerCliente);

// http://localhost:3000/api/v1/clientes/list
router.get('/list', ClientController.listCliente);

// http://localhost:3000/api/v1/clientes/search
router.get('/search', ClientController.searchCliente);

// http://localhost:3000/api/v1/clientes/deleteClients/:cliente_id
router.delete('/:cliente_id', verifyToken, verifyAdmin, ClientController.deleteCliente);

// http://localhost:3000/api/v1/clientes/update/:cliente_id
router.put('/update/:cliente_id', verifyToken, verifyAdmin, ClientController.updateClient);

export default router;
