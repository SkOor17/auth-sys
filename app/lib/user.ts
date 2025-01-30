import { UserPayload } from "./dico";
import jwt from 'jsonwebtoken';
import { jwtVerify } from 'jose';

const GLOBAL_URL = "http://localhost:3000";

const SECRET_KEY = process.env.JWT_SECRET || 'default_secret_key';
const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET || 'default_refresh_secret_key';

export function generateAccessToken(user: UserPayload): string {
    return jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      }, 
      SECRET_KEY, 
      { 
        expiresIn: '15m' 
      }
    );
}

// Fonction pour générer un refresh token
export function generateRefreshToken(user: UserPayload): string {
    return jwt.sign(
      { 
        userId: user.id 
      }, 
      REFRESH_SECRET_KEY, 
      { 
        expiresIn: '7d' 
      }
    );
}

// Fonction pour vérifier un token
export function verifyToken(token: string, isRefresh: boolean = false): jwt.JwtPayload | null {
    try {
      const secretKey = isRefresh ? REFRESH_SECRET_KEY : SECRET_KEY;
      return jwt.verify(token, secretKey) as jwt.JwtPayload;
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
}

export async function signup(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    confirmPass: string
) {

    try {
        const response = await fetch(`${GLOBAL_URL}/api/auth/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "firstname": firstname,
                "lastname": lastname,
                "email": email,
                "pass": password,
                "confirmPass": confirmPass
            })
        });

        // Vérifier si la réponse est correcte (statut 200)
        if (response.ok) {
            const data = await response.json();
            console.log("Réponse de l'API : ", data);
        } else {
            console.error("Erreur lors de la requête: ", response.statusText);
        }
    } catch (error) {
        console.error("Erreur dans la requête : ", error);
    }
}


export async function login(
    email: string,
    password: string
) {

    try {
        const response = await fetch(`${GLOBAL_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
            })
        });

        // Vérifier si la réponse est correcte (statut 200)
        if (response.ok) {
            const data = await response.json();
            console.log("Réponse de l'API : ", data);
            return data
        } else {
            console.error("Erreur lors de la requête: ", response.statusText);
        }
    } catch (error) {
        console.error("Erreur dans la requête : ", error);
    }
}

export async function isAdmin(token: string): Promise<boolean> {
    const key = new TextEncoder().encode(SECRET_KEY)
    const { payload } = await jwtVerify(token, key);
    return payload.role === 'admin'
}

export function getCookie(name: string) {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find(c => c.startsWith(`${name}=`));
    return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
  }