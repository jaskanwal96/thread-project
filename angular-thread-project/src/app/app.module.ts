import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InternalInterceptor } from './http-interceptor';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  
import { ToastrModule } from 'ngx-toastr';
import { CreateThreadComponent } from './create-thread/create-thread.component';
import { TagInputModule } from 'ngx-chips';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ThreadListComponent,
    RegisterComponent,
    CreateThreadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TagInputModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InternalInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
