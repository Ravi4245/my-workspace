import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { HomeComponent } from './app/components/home/home.component';
import { StudentRegisterComponent } from './app/Component/student-register/student-register.component';
import { TeacherRegisterComponent } from './app/Component/teacher-register/teacher-register.component';
import { LoginComponent } from './app/Component/login/login.component';
import { StudentDashboardComponent } from './app/Dashboard/student-dashboard/student-dashboard.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { TeacherDashboardComponent } from './app/Dashboard/teacher-dashboard/teacher-dashboard.component';
import { AdminDashboardComponent } from './app/Dashboard/admin-dashboard/admin-dashboard.component';
import { FullstackComponent } from './app/Courses/fullstack/fullstack.component';
import { UxComponent } from './app/Courses/ux/ux.component';
import { CyberSecurityComponent } from './app/Courses/cyber.security/cyber.security.component';
import { SqlServerComponent } from './app/Courses/sql.server/sql.server.component';
import { PhythonComponent } from './app/Courses/phython/phython.component';
import { AiComponent } from './app/Courses/ai/ai.component';




const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'student-register', component: StudentRegisterComponent},
  {path: 'teacher-register',component:TeacherRegisterComponent},
  {path: 'login' ,component:LoginComponent},
 { path: 'student-dashboard/:id', component: StudentDashboardComponent } ,
 { path: 'teacher-dashboard/:id', component: TeacherDashboardComponent },
 {path: 'admin-dashboard',component:AdminDashboardComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'fullstack', component: FullstackComponent },
    { path: 'ux', component: UxComponent },
    { path: 'cyber.security', component: CyberSecurityComponent },
    { path: 'sql.server', component: SqlServerComponent },
    { path: 'phython', component: PhythonComponent },
    { path: 'ai', component: AiComponent },

 
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(),
  ]
})
.catch(err => console.error(err));
