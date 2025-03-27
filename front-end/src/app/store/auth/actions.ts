import { createAction, props } from "@ngrx/store";
import { initialAuthState, AuthState, User } from "../../app.state";

export const register =  createAction('[Auth] Register',props<{ user: User }>())
export const registerSuccess = createAction('[Auth] Register Success', props<{ message: string|null }>())
export const registerFailure = createAction('[Auth] Register Failure',props<{error:string}>())

export const login =  createAction('[Auth] Login', props<{ user: User }>())
export const loginSuccess = createAction('[Auth] Login Success', props<{message:string|null, user:User|null, token:string}>())
export const loginFailure = createAction('[Auth] Login Failure',props<{error:string}>())