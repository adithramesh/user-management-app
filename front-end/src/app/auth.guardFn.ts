import { Store } from "@ngrx/store"
import { inject } from "@angular/core"
import { Observable } from "rxjs"
import { selectToken } from "./store/auth/reducer"
import { Router } from "@angular/router"
import { jwtDecode } from 'jwt-decode';
import { User } from "./app.state"

export function authGuard():boolean{

const router = inject(Router)
const token = localStorage.getItem('token');
  if(token)  {
    return true
  }
  else{
    router.navigate(['/login'])
    return false
  }

}


export function dontGoBack():boolean{

  const token = localStorage.getItem('token');
    if(token)  {
      return false
    }
    else{
      return true
    }
    
  }
