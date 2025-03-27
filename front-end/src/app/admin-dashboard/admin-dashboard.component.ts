import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NavBarComponent, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  users: Array<{ _id: string; username: string; email: string }> = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.http.get('http://localhost:3000/users').subscribe(
      (response: any) => {
        this.users = response;
      },
      (error) => {
        console.error('Failed to fetch users:', error);
        alert('Failed to fetch users.');
      }
    );
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http.delete(`http://localhost:3000/users/${userId}`).subscribe(
        (response) => {
          console.log('User deleted successfully', response);
          this.users = this.users.filter((user) => user._id !== userId);
        },
        (error) => {
          console.error('Failed to delete user:', error);
          alert('Failed to delete user.');
        }
      );
    }
  }

}
