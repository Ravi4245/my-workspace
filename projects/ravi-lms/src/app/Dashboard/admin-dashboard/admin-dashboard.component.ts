import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export interface Student {
  studentId: number;
  fullName: string;
  email: string;
}

export interface Teacher {
  teacherId: number;
  fullName: string;
  email: string;
}

interface Counts {
  pendingStudents: number;
  approvedStudents: number;
  pendingTeachers: number;
  approvedTeachers: number;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class AdminDashboardComponent implements OnInit {
  pendingStudents: Student[] = [];
  pendingTeachers: Teacher[] = [];
  counts: Counts = {
    pendingStudents: 0,
    approvedStudents: 0,
    pendingTeachers: 0,
    approvedTeachers: 0
  };

  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    this.loadPendingLists();
    this.loadCounts();
  }
   
  
  logout() {
  localStorage.clear(); // or remove specific items
  // Redirect to login page or home
    this.router.navigate(['/home']);
}

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No JWT token found. Please login.');
      // Optionally redirect to login page
      throw new Error('No JWT token found. Please login.');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  loadPendingLists(): void {
    try {
      const headers = this.getAuthHeaders();

      this.http.get<Student[]>('https://localhost:7071/api/Admin/students/pending', { headers })
        .subscribe({
          next: (students) => this.pendingStudents = students,
          error: (err) => alert("Error loading students: " + err.message)
        });

      this.http.get<Teacher[]>('https://localhost:7071/api/Admin/teachers/pending', { headers })
        .subscribe({
          next: (teachers) => this.pendingTeachers = teachers,
          error: (err) => alert("Error loading teachers: " + err.message)
        });
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }

  loadCounts(): void {
    try {
      const headers = this.getAuthHeaders();

      this.http.get<Counts>('https://localhost:7071/api/Admin/counts', { headers })
        .subscribe({
          next: (data) => this.counts = data,
          error: (err) => alert("Error loading counts: " + err.message)
        });
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }

  approveStudent(studentId: number): void {
    try {
      const headers = this.getAuthHeaders();

      this.http.put(`https://localhost:7071/api/Admin/approve/student/${studentId}`, {}, { headers })
        .subscribe({
          next: () => {
            alert('Student approved successfully');
            this.loadPendingLists();
            this.loadCounts();
          },
          error: () => alert('Failed to approve student')
        });
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }

      deleteStudent(studentId: number): void {
      if (!confirm('Are you sure you want to delete this student?')) {
        return;
      }

      try {
        const headers = this.getAuthHeaders();

        this.http.delete(`https://localhost:7071/api/Admin/student/${studentId}`, { headers })
          .subscribe({
            next: () => {
              alert('Student deleted successfully');
              this.loadPendingLists();
              this.loadCounts();
            },
            error: () => alert('Failed to delete student')
          });
      } catch (error: unknown) {
        if (error instanceof Error) {
          alert(error.message);
        }
      }
    }

    deleteTeacher(teacherId: number): void {
      if (!confirm('Are you sure you want to delete this teacher?')) {
        return;
      }

      try {
        const headers = this.getAuthHeaders();

        this.http.delete(`https://localhost:7071/api/Admin/teacher/${teacherId}`, { headers })
          .subscribe({
            next: () => {
              alert('Teacher deleted successfully');
              this.loadPendingLists();
              this.loadCounts();
            },
            error: () => alert('Failed to delete teacher')
          });
      } catch (error: unknown) {
        if (error instanceof Error) {
          alert(error.message);
        }
      }
    }


  approveTeacher(teacherId: number): void {
    try {
      const headers = this.getAuthHeaders();

      this.http.put(`https://localhost:7071/api/Admin/approve/teacher/${teacherId}`, {}, { headers })
        .subscribe({
          next: () => {
            alert('Teacher approved successfully');
            this.loadPendingLists();
            this.loadCounts();
          },
          error: () => alert('Failed to approve teacher')
        });
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }
}
