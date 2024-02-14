import { User } from "../../domain/Entity/user";
import { UserInterface } from "../../domain/Port/userInterface";
import { query } from "../../../database/mysql";
import { verificateToken } from "../../../helpers/tokenEmail";
import { compare } from "../../../helpers/ashs";
import { tokenSigIn } from "../../../helpers/token";

export class UserMysqlRepository  implements UserInterface{
    async createUser(user: User): Promise<any> {
        try {
            const { contact, credential, status } = user;
            
            // Insertar los datos del usuario en la base de datos
            const sql = "INSERT INTO users (uuid, name, lastName, cellphone, email, password, activationToken, verifiedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            const params = [
                user.uuid,
                contact.name,
                contact.lastName,
                contact.cellphone,
                credential.email,
                credential.password,
                status.activationToken,
                status.verifiedAt
            ];

            await query(sql, params);

            return user;
        } catch (error) {
            console.error("Error al registrar usuario en MySQL:", error);
            throw new Error("Error al registrar usuario en MySQL");
        }
    }

    async verificateUser(token: string): Promise<string | any> {
        try {
            // Verificar el token
            const verifiToken = verificateToken(token);
    
            if (verifiToken) {
                // Si el token es válido, buscar el usuario por el token en la base de datos
                const sql = "UPDATE user SET verifiedAt = NOW() WHERE activationToken = ?";
                const params = [token];
                const result = await query(sql, params);
    
                // Verificar si el resultado es un array y tiene al menos un elemento
                if (Array.isArray(result) && result.length > 0) {
                    // Verificar si el primer elemento del array es un objeto y tiene la propiedad 'affectedRows'
                    const firstResult = result[0];
                    if (typeof firstResult === 'object' && 'affectedRows' in firstResult) {
                        const affectedRows = firstResult['affectedRows'];
    
                        // Verificar si 'affectedRows' es un número y es mayor que 0
                        if (typeof affectedRows === 'number' && affectedRows > 0) {
                            // Si se encontró y actualizó el usuario, retornar un mensaje de confirmación
                            return "Usuario confirmado correctamente.";
                        }
                    }
                }
            }
            // El token no es válido o el usuario no se encontró, retornar un mensaje de error
            return "No se pudo confirmar el usuario.";
        } catch (error) {
            console.error("Error al verificar usuario en MySQL:", error);
            throw new Error("Error al verificar usuario en MySQL");
        }
    }

    async loginUser(email: string, password: string): Promise<{ token: string, user: User }|string | null> {
        try {
            // Primero, obtener el usuario por email.
            const [users]: any = await query('SELECT * FROM user WHERE email = ? LIMIT 1', [email]);
          
            if (!users || users.length === 0) {
                return null;
            }
    
            const user = users[0];
            console.log(user)
    
            // Verificar si la contraseña proporcionada coincide con la almacenada en la base de datos.
            const passwordMatches = await compare(password, user.password);
          
            if (!passwordMatches) {
                return 'Unauthorized';
            }
            console.log("pasooo")
            // Verificar si el usuario ha sido verificado.
            if (!user.verifiedAt) {
                console.log("anal")
                return 'El usuario aún no ha verificado su cuenta';
            }
            console.log("pasooooooo")
            
    
            // Aquí podrías generar y devolver un token JWT si estás usando autenticación basada en tokens.
            // Por ahora, simplemente devolvemos un mensaje de éxito.
            const token: string = tokenSigIn(user.uuid, user.email);
            console.log("pasooo")

            return {token, user};

        } catch (error) {
            console.error('Error durante el inicio de sesión:', error);
            throw error;
        }
    }
    async logoutUser(uuid: string, token: string): Promise<any> {
        try {
            // Primero, verificamos si el usuario ya ha cerrado sesión
            const [blacklist]: any = await query('SELECT * FROM blacklist WHERE uuid = ? AND token = ?', [uuid, token]);
            if (blacklist && blacklist.length > 0) {
                // Si el usuario ya está en la lista negra, no hacemos nada más
                return { message: 'El usuario ya ha cerrado sesión, inicie sesion nuevamente' };
            }
    
            // Si el usuario no está en la lista negra, lo agregamos
            await query('INSERT INTO blacklist (uuid, token) VALUES (?, ?)', [uuid, token]);
    
            return { message: 'El usuario ha cerrado sesión exitosamente' };
        } catch (error) {
            console.error('Error al cerrar sesión del usuario:', error);
            throw error;
        }
    }
    
}