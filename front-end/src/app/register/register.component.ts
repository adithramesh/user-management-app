import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs';
import { selectIsSubmitting, selectMessage, selectToken, selectUser } from '../store/auth/reducer';
import { User } from '../app.state';
import { register } from '../store/auth/actions';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,  ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isSubmitting$!: Observable<boolean>;
  message$!: Observable<string | null>;
  token$!: Observable<string | null>;
  user$!: Observable<User | null>; 

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Use the selectors to get the observables
    this.isSubmitting$ = this.store.select(selectIsSubmitting);
    this.message$ = this.store.select(selectMessage);
    this.token$ = this.store.select(selectToken);
    this.user$ = this.store.select(selectUser);
  }


  registerForm= new FormGroup({
    username: new FormControl('',[Validators.required, Validators.minLength(4)]), 
    email: new FormControl('',[Validators.required, Validators.email]),
    password : new FormControl('',[Validators.required, Validators.minLength(6)])
  })

  submitReactiveregisterForm(){
    const user = this.registerForm.value as User;
    console.log("user: ", user);
    this.store.dispatch(register({user}))
  }

 
}
