import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Course {
  courseId: number;
  courseName: string;
  description: string;
  teacherId: number;
}

interface Student {
  studentId: number;
  fullName: string;
  email: string;
}

interface Assignment {
  courseId: number | null;
  title: string;
  description: string;
  studentId: number | null;
}

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule]
})
export class TeacherDashboardComponent implements OnInit {

  teacherId: number = 0;

  // Data models
  courses: Course[] = [];
  students: Student[] = [];

  newCourse = {
    courseName: '',
    description: ''
  };

  newAssignment: Assignment = {
    courseId: null,
    title: '',
    description: '',
    studentId: null
  };

  activeSection: string = 'create-course';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const storedId = localStorage.getItem('teacherId');
    if (storedId) {
      this.teacherId = parseInt(storedId, 10);
      this.loadCourses();
      this.loadStudents();
    } else {
      alert('No teacher ID found. Please log in again.');
      this.router.navigate(['/home']);
    }
  }

  // Section Navigation (used by sidebar)
navigateTo(section: string): void {
  this.activeSection = section;
}

  // Load courses by teacher
  loadCourses(): void {
    this.http.get<Course[]>(`https://localhost:7071/api/Course/byTeacher/${this.teacherId}`)
      .subscribe({
        next: (data) => this.courses = data,
        error: (err) => {
          console.error('Error loading courses:', err);
          alert('Failed to load courses. Please try again.');
        }
      });
  }

  // Load all students
  loadStudents(): void {
    this.http.get<Student[]>('https://localhost:7071/api/Student/all')
      .subscribe({
        next: (data) => this.students = data,
        error: (err) => {
          console.error('Error loading students:', err);
          alert('Failed to load students.');
        }
      });
  }

  // Create a course
  createCourse(): void {
    const courseData = {
      courseName: this.newCourse.courseName,
      description: this.newCourse.description,
      teacherId: this.teacherId
    };

    this.http.post('https://localhost:7071/api/Course/add', courseData)
      .subscribe({
        next: () => {
          alert('Course created successfully!');
          this.newCourse = { courseName: '', description: '' };
          this.loadCourses();
        },
        error: (err) => {
          console.error('Error creating course:', err);
          alert('Course creation failed.');
        }
      });
  }

  // Create an assignment
  createAssignment(): void {
    if (!this.newAssignment.courseId || !this.newAssignment.studentId) {
      alert('Please select a course and a student.');
      return;
    }

    const assignmentData = {
      courseId: this.newAssignment.courseId,
      title: this.newAssignment.title,
      description: this.newAssignment.description,
      studentId: this.newAssignment.studentId
    };

    this.http.post('https://localhost:7071/api/Assignment/add', assignmentData)
      .subscribe({
        next: () => {
          alert('Assignment created successfully!');
          this.newAssignment = { courseId: null, title: '', description: '', studentId: null };
        },
        error: (err) => {
          console.error('Error adding assignment:', err);
          alert('Assignment creation failed.');
        }
      });
  }

  // Logout logic
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}
