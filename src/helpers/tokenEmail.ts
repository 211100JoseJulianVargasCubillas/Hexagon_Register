import jwt, { JwtPayload } from 'jsonwebtoken';



export function generarToken(email:string) {
    const token = jwt.sign({ email }, 'secreto');
    return token;
}; 

export function verificateToken(token: string): string | null {
    try {
        const decoded = jwt.verify(token, 'secreto') as JwtPayload;
        if (decoded && typeof decoded.email === 'string') {
            return decoded.email;
        } else {
            return null;
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al verificar el token:', error.message);
        } else {
            console.error('Error al verificar el token:', error);
        }
        return null;
    }
}