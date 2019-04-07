import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { RegisterComponent } from './register/register.component';
import { CreateThreadComponent } from './create-thread/create-thread.component';
 
const routes: Routes = [
  { path: '', component: ThreadListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LoginComponent },
  { path: 'thread/new', component: CreateThreadComponent },
  { path: '*', redirectTo: '/' }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}