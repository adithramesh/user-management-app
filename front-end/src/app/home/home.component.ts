import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { selectUser } from '../store/auth/reducer';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../app.state';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavBarComponent, FormsModule], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
router= inject(Router)
store = inject(Store)
profilePic: string | null = null;

user$=this.store.select(selectUser)
  username!: string;
  email: any= '';


constructor(private http: HttpClient) {}

onProfilePicUpload(event: Event): void {
  const fileInput = event.target as HTMLInputElement;
  if (fileInput.files && fileInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = () => {
      this.profilePic = reader.result as string;
    };
    reader.readAsDataURL(fileInput.files[0]);
  }
}

// Update Username
onUsernameChange(newUsername: string): void {
  const token = localStorage.getItem('token')
  if(token){
    this.user$
    .pipe(
      map((user) => ({ ...user, username: newUsername } as User)), 
      switchMap((updatedUser: User) =>
        this.http.put(
          'http://localhost:3000/update-user',
          updatedUser,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token here
            },
          }
        )
      )
    )
    .subscribe({
      next: (response) => console.log('Username updated successfully:', response),
      error: (error) => console.error('Failed to update user:', error),
    });
  }else {
    console.error('No token found!');
  }
  
}


// Update Email
onUseremailChange(newEmail: string): void {
  const token = localStorage.getItem('token')
 this.user$.pipe(
  map((user)=>({...user,email:newEmail})),
  switchMap((updatedUser)=>this.http.put('http://localhost:3000/update-user', updatedUser, {headers:{Authorization: `Bearer ${token}`}}))
 )
//  .subscribe();
.subscribe({
  next: (response) => console.log('Username updated successfully:', response),
  error: (error) => console.error('Failed to update user:', error),
});
}

}
