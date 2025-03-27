export interface User {
    username:string;
    email:string;
    password:string;
    role:string|null;
}

export interface AuthState{
    isSubmitting:boolean;
    message:string | null;
    token:string ;
    user:User | null;
}

export const initialAuthState : AuthState = {
    isSubmitting:false,
    message:null,
    token:'',
    user:null
}

export interface JwtPayload {
    role: string;
  }