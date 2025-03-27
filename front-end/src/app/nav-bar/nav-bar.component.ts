import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../store/auth/reducer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  userName!: string;
  router=inject(Router)
  store = inject(Store)

  user$=this.store.select(selectUser)
  constructor() { }

 
  logout(){
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']); 
    console.log('User logged out successfully'); 
  }
}
