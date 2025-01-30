export interface User  {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    pass: string,
    role?: string
}

// Interface pour les données de l'utilisateur
export interface UserPayload {
    id: string;
    email: string;
    role?: string;
  }