import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from "../models/user.model.js";

const allowedRoles = ['superadmin', 'editor', 'viewer']; // Lista de roles permitidos

// http://localhost:3000/api/v1/users/regUser
const regUser = async (req, res) => {
    try {
        console.log(req.body); //
        const { email, password, role } = req.body;
        if (!email || !password || !role || !allowedRoles.includes(role)) {
            return res.status(400).json({ ok: false, message: "Faltan campos o role inválido!" });
        }
        const user = await UserModel.findOneByEmail(email);
        if (user) {
            return res.status(400).json({ ok: true, message: "El usuario ya existe" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await UserModel.createUser({ email, password: hashedPassword, role });

        const token = jwt.sign({ email: newUser.email, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' });

        return res.status(201).json({ ok: true, message: newUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "Error al crear usuario" });
    }
}

// http://localhost:3000/api/v1/users/logUser
const logUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Campos requeridos!!" });
        }

        const user = await UserModel.findOneByEmail(email);
        if (!user) {
            return res.status(400).json({ error: "Usuario no existe!!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Contraseña incorrecta!!" });
        }

        const token = jwt.sign({ email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' });

        return res.json({ ok: true, message: { token, role: user.role } });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "Error al iniciar sesión" });
    }
}

// http://localhost:3000/api/v1/users/profile

const profile = async (req, res) => {
    try {

         // Verificamos que req.email existe
         if (!req.email) {
            return res.status(401).json({ 
                ok: false, 
                message: 'No se encontró información del usuario en el token' 
            });
        }

        
        const user = await UserModel.findOneByEmail(req.email)
        return res.json({
                ok: true,
                message: user
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ 
                                ok: false,
                                message: 'Error server' 
        });
    }
}

// http://localhost:3000/api/v1/users/findAll
const findAll = async (req, res) => {
    try {
        const users = await UserModel.showUser();

        if (!users || users.length === 0) {
            return res.status(404).json({
                ok: false,
                message: 'No se encontraron usuarios'
            });
        }

        return res.json({
            ok: true,
            message: users
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Error server'
        });
    }
}

export const UserController = {
    regUser,
    logUser,
    profile,
    findAll
}


