import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router, Routes } from '@angular/router';
import { FullstackComponent } from '../../Courses/fullstack/fullstack.component';
import { UxComponent } from '../../Courses/ux/ux.component';
import { CyberSecurityComponent } from '../../Courses/cyber.security/cyber.security.component';
import { SqlServerComponent } from '../../Courses/sql.server/sql.server.component';
import { PhythonComponent } from '../../Courses/phython/phython.component';
import { AiComponent } from '../../Courses/ai/ai.component';
 
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
   
   constructor(private router: Router) {}

   currentIndex = 0;

get transformStyle() {
  return `translateX(0)`; // The track itself doesn’t move, cards are positioned absolutely
}

// Calculate each card’s 3D position relative to currentIndex
getCardTransform(i: number) {
  const offset = i - this.currentIndex;
  const absOffset = Math.abs(offset);

  if (offset === 0) {
    // Center card, big and front
    return `translateX(0) translateZ(150px) scale(1.1)`;
  } else if (offset === -1) {
    // Left side card, angled and smaller
    return `translateX(-150px) translateZ(0) rotateY(25deg) scale(0.8)`;
  } else if (offset === 1) {
    // Right side card, angled and smaller
    return `translateX(150px) translateZ(0) rotateY(-25deg) scale(0.8)`;
  } else if (offset === -2) {
    // Further left, smaller and faint
    return `translateX(-300px) translateZ(-100px) rotateY(25deg) scale(0.6)`;
  } else if (offset === 2) {
    // Further right, smaller and faint
    return `translateX(300px) translateZ(-100px) rotateY(-25deg) scale(0.6)`;
  } else {
    // Offscreen cards, hide or move far away
    return `translateX(${offset * 400}px) translateZ(-300px) scale(0.4) opacity(0)`;
  }
}

prev() {
  this.currentIndex = (this.currentIndex - 1 + this.bestCourses.length) % this.bestCourses.length;
}

next() {
  this.currentIndex = (this.currentIndex + 1) % this.bestCourses.length;
}

 
     bestTeachers = [
    { name: 'Sumit Waghmare', subject: 'Dot.net Developer', image: '/images/Sumit.jpg.jpg' },
    { name: 'Saiganesh Raja', subject: 'Dot.net Developer', image: '/images/Sai.jpg' },
    { name: 'Ravi Deshmukh', subject: 'Dot.net Developer', image: '/images/Ravi.jpg' },
    { name: 'Siddhesh Kadam', subject: 'Dot.net Developer', image: '/images/sidd.jpg.jpg' },
    { name: 'Harshad Shinde', subject: 'Dot.net Developer', image: '/images/Harsha1.jpg' },
  ];





bestCourses = [
  { name: 'Fullstack', image: '/images/bg-blur9.jpg', route: 'fullstack' },
  { name: 'UX designer', image: '/images/bg-blur7.jpg', route: 'ux' },
  { name: 'Cyber Security', image: '/images/bg-blur8.jpg', route: 'cyber.security' },
  { name: 'SQL Server', image: '/images/Sql.jpg', route: 'sql.server' },
  { name: 'Python', image: '/images/phython.jpg', route: 'phython' },
  { name: 'AI', image: '/images/Ai.jpg', route: 'ai' },
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

gotoCourse(route: string) {
  this.router.navigate([`/${route}`]);
}
}
