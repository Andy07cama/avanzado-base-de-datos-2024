import jwt from "jsonwebtoken";
import UsuariosService from "../services/usuarios.service.js";

export const verifyToken = async (req, res, next) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar si hay un token en los headers de autorización
            2. Verificar que el token esté en el formato correcto (Bearer <token>)
            3. Verificar que el token sea válido (utilizando la librería jsonwebtoken)
            4. Verificar que tenga un id de usuario al decodificarlo
    
        Recordar también que si sucede cualquier error en este proceso, deben devolver un error 401 (Unauthorized)
    */
        try {
            const authHeader = req.headers['authorization'];
            if (!authHeader || !authHeader.split("Bearer ")) {
                return res.status(401).json({ message: "Falta token o está mal formado" });
            }
            const token = authHeader.split(" ")[1];
            const veryfi = jwt.verify(token, "Hola, como estas");
            if (!veryfi.id) {
                return res.status(401).json({ message: "Falta el id de usuario, token invalido" });
            }
            req.userId = veryfi.id;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Token inválido o expirado" });
        }
};

export const verifyAdmin = async (req, res, next) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el id de usuario en la request es un administrador (utilizando el servicio de usuarios)
            2. Si no lo es, devolver un error 403 (Forbidden)
    
    */
            try{
                const usuario = await UsuariosService.getUsuarioById(req.userId);
                if(!usuario || usuario.admin === false){
                    return res.status(403).json({error: 'No tenes el permiso para hacer esta acción'})
                }
            } catch (error){
                return res.status(403).json({error: 'No tenes el permiso para hacer esta acción'})
            }
            next();
};
