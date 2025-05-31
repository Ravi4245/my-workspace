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
  styleUrls: ['./teacher-register.component.css']
})
export class TeacherRegisterComponent {
  
  teacherForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.teacherForm = this.fb.group({
      fullName: ['', [
    Validators.required,
    Validators.maxLength(100),
    Validators.pattern('^[a-zA-Z ]*$')  // ✅ Only alphabets and spaces
  ]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]]
    });
  }

        get fullName() {
      return this.teacherForm.get('fullName');
    }

    get email() {
      return this.teacherForm.get('email');
    }

    get password() {
      return this.teacherForm.get('password');
    }

    goHome() {
    this.router.navigate(['/home']);
   }

  onSubmit() {
    if (this.teacherForm.valid) {
      const teacherData = {
        fullName: this.fullName?.value,
        email: this.email?.value,
        password: this.password?.value,
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
            alert('Registration failed ❌. Email Id alerady register');
          }
        });
    }
  }
}
