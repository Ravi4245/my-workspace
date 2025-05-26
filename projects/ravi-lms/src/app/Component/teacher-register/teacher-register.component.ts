import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-teacher-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule,RouterModule],
  templateUrl: './teacher-register.component.html',
  styleUrl: './teacher-register.component.css'
})
export class TeacherRegisterComponent {
  
  teacherForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.teacherForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

    goHome() {
    this.router.navigate(['/home']);
   }

  onSubmit() {
    if (this.teacherForm.valid) {
      const teacherData = {
        ...this.teacherForm.value,
        status: 'Pending' // default
      };

      this.http.post('https://localhost:7071/api/Teacher/register', teacherData)
        .subscribe({
          next: res => {
            alert('Teacher registered successfully ✅. Waiting for admin approval ⏳');
            this.teacherForm.reset(); // ✅ Clear form
            this.router.navigate(['/']); // ✅ Go to home
          },
          error: err => {
            console.error(err);
            alert('Registration failed.');
          }
        });
    }
  }
}
