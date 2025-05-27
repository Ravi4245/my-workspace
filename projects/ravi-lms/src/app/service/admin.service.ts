import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({ providedIn: 'root' })
export class AdminService {
  baseUrl = 'https://localhost:7071/api/Admin';

  constructor(private http: HttpClient) {}

  getPendingStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/students/pending`);
  }

  getPendingTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.baseUrl}/teachers/pending`);
  }

  getApprovedStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/students/approved`);
  }

  getApprovedTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.baseUrl}/teachers/approved`);
  }

  //  approveStudent(studentId: number) {
  // return this.http.put(`https://localhost:7058/api/Admin/approve/student/${studentId}`, {});
  // }

  approveStudent(id: number) {
  return this.http.post(`https://localhost:7071/api/Admin/approve/student?id=${id}`, {});
  }

   approveTeacher(teacherId: number) {
  return this.http.put(`https://localhost:7071/api/Admin/approve/teacher/${teacherId}`, {});
  }
}




