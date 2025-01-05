import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        
        if (!token) {
            return res.status(401).json({ 
                ok: false, 
                message: 'Token no proporcionado' 
            });
        }

        // Verificamos que el token comience con "Bearer "
        if (!token.startsWith('Bearer ')) {
            return res.status(401).json({ 
                ok: false, 
                message: 'Formato de token inválido' 
            });
        }

        // Eliminamos "Bearer " y nos quedamos solo con el token
        token = token.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Guardamos la información decodificada en req
        req.email = decoded.email;
        req.role = decoded.role;
        
        next();
    } catch (error) {
        console.log('Error al verificar token:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                ok: false, 
                message: 'Token expirado' 
            });
        }
        return res.status(401).json({ 
            ok: false, 
            message: 'Token inválido' 
        });
    }
}


export const verifyAdmin = (req, res, next) => {
    if (req.role === 'superadmin' || req.role === 'editor') {
        return next()
    }
    return res.status(403).json({error: 'Only admin login!'})
}