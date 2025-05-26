import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule]
})
export class StudentDashboardComponent implements OnInit {
  studentId: number = 0;
  studentName: string = '';
  studentProfile: any;
  enrolledCourses: any[] = [];
  approvedAssignments: any[] = [];

  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    // Get student ID from localStorage (set during login)
    const idFromStorage = localStorage.getItem('studentId');
    if (idFromStorage) {
      this.studentId = parseInt(idFromStorage, 10);
      this.loadStudentProfile();
      this.loadCourses();
      this.loadAssignments();
    } else {
      console.error('Student ID not found in localStorage');
    }
  }

  loadStudentProfile() {
    this.http.get<any>(`https://localhost:7071/api/Student/${this.studentId}`)
      .subscribe({
        next: (res) => {
          this.studentProfile = res;
          this.studentName = res.fullName;
        },
        error: (err) => {
          console.error('Error fetching student profile', err);
        }
      });
  }

  loadCourses() {
    this.http.get<any[]>(`https://localhost:7071/api/Course/student/${this.studentId}`)
      .subscribe({
        next: (res) => {
          this.enrolledCourses = res;
        },
        error: (err) => {
          console.error('Error fetching enrolled courses', err);
        }
      });
  }

  loadAssignments() {
    this.http.get<any[]>(`https://localhost:7071/api/Assignment/byStudent/${this.studentId}`)
      .subscribe({
        next: (res) => {
          this.approvedAssignments = res;
        },
        error: (err) => {
          console.error('Error fetching assignments', err);
        }
      });
  }

  logout() {
  localStorage.clear(); // or remove specific items
  // Redirect to login page or home
    this.router.navigate(['/home']);
}

}


    // if (this.studentId) {
    //   this.http
    //     .get<any[]>(`https://localhost:7058/api/Assignment/byStudent/${this.studentId}`)
    //     .subscribe({
    //       next: (res) => {
    //         this.approvedAssignments = res;
    //       },
    //       error: (err) => {
    //         console.error('Error fetching assignments', err);
    //       },
    //     });
    // } else {
    //   console.error('Student ID not found in localStorage.');
    // }
  


