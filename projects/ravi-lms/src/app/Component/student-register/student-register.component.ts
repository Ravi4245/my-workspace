import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule,RouterModule],
  templateUrl: './student-register.component.html',
  styleUrl: './student-register.component.css'
})
export class StudentRegisterComponent {
  studentForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.studentForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


     goHome() {
    this.router.navigate(['/home']);
   }


  onSubmit() {
    if (this.studentForm.valid) {
      const studentData = {
        fullName: this.studentForm.value.fullName,
        email: this.studentForm.value.email,
        password: this.studentForm.value.password,
        status: 'Pending' // Default status
      };

     

      this.http.post('https://localhost:7071/api/Student/register', studentData)
        .subscribe({
          next: () => {
            alert('Registration successful ✅. Waiting for admin approval ⏳.');
            this.router.navigate(['/']);
          },
          error: err => {
            console.error(err);
            alert('Registration failed.');
          }
        });
    }
  }
}
