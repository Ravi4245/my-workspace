import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // fixed typo here
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  role: string = 'Student';
  errorMessage: string = '';
 successMessage:string='';

  constructor(private http: HttpClient, private router: Router) {}

    goHome() {
    this.router.navigate(['/home']);
   }

  login() {
    const loginData = {
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.http.post<any>('https://localhost:7071/api/Login', loginData).subscribe({
      next: (response) => {
        if (response.success) {
           window.alert('✅ Login Successful!');
          this.successMessage = 'Login successful!';
          this.errorMessage = 'lOgin Failed';

          localStorage.setItem('token', response.token);

          if (response.role === 'Student') {
            localStorage.setItem('studentId', response.id.toString());
            this.router.navigate(['/student-dashboard', response.id]);
          } else if (response.role === 'Teacher') {
            localStorage.setItem('teacherId', response.id.toString());
            this.router.navigate(['/teacher-dashboard', response.id]);
          } else if (response.role === 'Admin') {
            localStorage.setItem('adminId', response.id.toString());
            this.router.navigate(['/admin-dashboard']);
          }
        } else {
          this.errorMessage = response.message || 'Invalid login credentials.';
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Login failed. Please try again.';
      }
    });
  }
}
