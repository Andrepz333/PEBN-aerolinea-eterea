import { Router } from "express";
import { UserController } from "../controllers/users.controller.js";
import { verifyToken, verifyAdmin } from "../middlewares/jwt.middlewares.js";


const router = Router();

router.post('/regUser', UserController.regUser);
router.post('/logUser', UserController.logUser);
router.get('/profile', verifyToken, UserController.profile); //rutas protegidas con token


router.get('/findAll', verifyToken, verifyAdmin, UserController.findAll) //rutas protegidas con token


export default router;