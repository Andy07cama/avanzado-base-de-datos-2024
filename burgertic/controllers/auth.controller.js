import UsuariosService from "../services/usuarios.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import usuariosService from "../services/usuarios.service.js";

const register = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el body de la request tenga el campo usuario
            2. Verificar que el campo usuario tenga los campos nombre, apellido, email y password
            3. Verificar que no exista un usuario con el mismo email (utilizando el servicio de usuario)
            4. Devolver un mensaje de error si algo falló hasta el momento (status 400)
            5. Hashear la contraseña antes de guardarla en la base de datos
            6. Guardar el usuario en la base de datos (utilizando el servicio de usuario)
            7. Devolver un mensaje de éxito si todo salió bien (status 201)
            8. Devolver un mensaje de error si algo falló guardando al usuario (status 500)
        
    */
            const usuario = req.body;
            if (!usuario) {
                return res.status(400).json({ message: "No hay ningun usuario" });
            }
            if (!usuario.nombre || !usuario.apellido || !usuario.email || !usuario.password) {
                return res.status(400).json({ message: "Faltan campos por completar" });
            }
            try {
                const uMail = await usuariosService.getUsuarioByEmail(usuario.email);
                if (uMail) {
                    return res.status(400).json({ message: "Ya existe un usuario con este mail" });
                }
        
                const hashedPassword = await bcrypt.hash(usuario.password, 10);
                usuario.password = hashedPassword;
        
                const Nuevo = await usuariosService.createUsuario(usuario);
        
                return res.status(201).json({ message: "Se creo el usuario correctamente" });
        
            } catch (error) {
                console.error("Error al registrar usuario:", error);
                return res.status(500).json({ message: error.message });
            }
        };

const login = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el body de la request tenga el campo email y password
            2. Buscar un usuario con el email recibido
            3. Verificar que el usuario exista
            4. Verificar que la contraseña recibida sea correcta
            5. Devolver un mensaje de error si algo falló hasta el momento (status 400)
            6. Crear un token con el id del usuario y firmarlo con la clave secreta (utilizando la librería jsonwebtoken)
            7. Devolver un json con el usuario y el token (status 200)
            8. Devolver un mensaje de error si algo falló (status 500)
        
    */
            const { email,password } = req.body;
            if (!email||!password){
                return res.status(400).json({ message: "Campos sin completar" });
            }
            try{
                const usuario=await usuariosService.getUsuarioByEmail(email);
                if(!usuario){
                    return res.status(400).json({ message: "Con este mail no hay ningún usuario" });
                }
                const correcto=await bcrypt.compare(password,usuario.password);
                if(!correcto){
                    return res.status(400).json({message:"Contraseña incorrecta, vuelva a intentarlo"});
                }
                const token=jwt.sign({id:user.id},"Hola, como estas",{expiresIn:"1h"});
                return res.status(200).json({user, token})
            }catch(e){
                return res.status(500).json({message:error.message});
            } 
        };

export default { register, login };
