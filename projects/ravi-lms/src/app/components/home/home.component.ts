import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
 
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
   
   constructor(private router: Router) {}

   

     bestTeachers = [
    { name: 'Sumit Waghmare', subject: 'Dot.net Developer', image: '/images/Sumit.jpg.jpg' },
    { name: 'Saiganesh Raja', subject: 'Dot.net Developer', image: '/images/Sai.jpg' },
    { name: 'Ravi Deshmukh', subject: 'Dot.net Developer', image: '/images/Ravi.jpg' },
    { name: 'Siddhesh Kadam', subject: 'Dot.net Developer', image: '/images/sidd.jpg.jpg' },
    { name: 'Harshad Shinde', subject: 'Dot.net Developer', image: '/images/Harsha1.jpg' },
  ];

  bestCourses = [
  { name: 'Fullstack', image: '/images/bg-blur9.jpg' },
  { name: 'UX designer',  image: '/images/bg-blur7.jpg' },
  { name: 'Cyber Security',  image: '/images/bg-blur8.jpg' },
  { name: 'SQl Server', image: '/images/Sql.jpg' },
  { name: 'Phython',  image: '/images/phython.jpg' },
  { name: 'AI',  image: '/images/Ai.jpg' },
];

  goToStudentRegister() {
    this.router.navigate(['/student-register']);
  }

  goToTeacherRegister() {
    this.router.navigate(['/teacher-register']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
