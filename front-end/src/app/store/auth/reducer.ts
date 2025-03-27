import { createFeature, createReducer, on} from '@ngrx/store'
import * as AuthActions from './actions'
import { initialAuthState } from '../../app.state'

const authFeature = createFeature({
    name:'auth',
    reducer: createReducer(
        initialAuthState,
        on(AuthActions.register, (state)=>({...state, isSubmitting:true, error:null})),
        on(AuthActions.registerSuccess,(state,response)=>({...state, isSubmitting:false, message:response.message, error:null})),
        on(AuthActions.registerFailure, (state,response)=>({...state, error:response.error})),

        on(AuthActions.login, (state)=>({...state, isSubmitting:true})),
        on(AuthActions.loginSuccess,(state,response)=>({...state, isSubmitting:false, message:response.message,user:response.user, token:response.token})),
        on(AuthActions.loginFailure, (state,response)=>({...state, error:response.error}))

    )
    
})

export const {name:authFeaturKey, reducer:authReducer,selectIsSubmitting,selectMessage,selectToken,selectUser} = authFeature