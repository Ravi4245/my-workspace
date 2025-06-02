import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Optional: Create an interface for Course to add type safety
interface Course {
  courseId: number;
  courseName: string;
  description: string;
  teacherId: number;
}

// Optional: Interface for Student Profile (basic)
interface StudentProfile {
  studentId: number;
  fullName: string;
  email: string;
  status: string;
  // add other properties if needed
}

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
})
export class StudentDashboardComponent implements OnInit {
  studentId: number = 0;
  studentName: string = '';
  studentProfile?: StudentProfile;

  enrolledCourses: Course[] = [];
  approvedAssignments: any[] = [];
  announcements: any[] = [];

  activeSection: 'assignments' | 'grades' | 'courses' | 'announcements' = 'assignments';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const idFromStorage = localStorage.getItem('studentId');
    if (idFromStorage) {
      this.studentId = parseInt(idFromStorage, 10);
      this.loadStudentProfile();
      this.loadCourses();
      this.loadAssignments();
      this.loadAnnouncements();
    } else {
      console.error('Student ID not found in localStorage');
      // Maybe redirect to login page here if needed
    }
  }

  setActiveSection(section: 'assignments' | 'grades' | 'courses' | 'announcements') {
    this.activeSection = section;
  }

  loadStudentProfile() {
    this.http.get<StudentProfile>(`https://localhost:7071/api/Student/${this.studentId}`).subscribe({
      next: (res) => {
        this.studentProfile = res;
        this.studentName = res.fullName;
      },
      error: (err) => {
        console.error('Error fetching student profile', err);
      },
    });
  }

  loadCourses() {
    this.http.get<Course[]>(`https://localhost:7071/api/Course/student/${this.studentId}`).subscribe({
      next: (res) => {
        this.enrolledCourses = res;
      },
      error: (err) => {
        console.error('Error fetching enrolled courses', err);
      },
    });
  }

  loadAssignments() {
    this.http.get<any[]>(`https://localhost:7071/api/Assignment/byStudent/${this.studentId}`).subscribe({
      next: (res) => {
        this.approvedAssignments = res;
      },
      error: (err) => {
        console.error('Error fetching assignments', err);
      },
    });
  }

  loadAnnouncements() {
    this.http.get<any[]>(`https://localhost:7071/api/Announcement/latest`).subscribe({
      next: (res) => {
        this.announcements = res;
      },
      error: (err) => {
        console.error('Error fetching announcements', err);
      },
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}
