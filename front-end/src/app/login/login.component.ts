import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../app.state';
import { login } from '../store/auth/actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  store=inject(Store)

  loginForm= new FormGroup({
    email:new FormControl('',[Validators.required, Validators.email]),
    password : new FormControl('',[Validators.required, Validators.minLength(6)])
  })

  submitReactiveLoginForm(){
    console.log(this.loginForm.value);
    const user = this.loginForm.value as User
    this.store.dispatch(login({user}))
  }

  logout(){
    
  }
}
