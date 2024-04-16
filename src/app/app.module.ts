import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthEffects } from './store/auth/auth.effects';
import { AuthInterceptorService } from './interceptor/auth-interceptor.service';
import { authReducer } from './store/auth/auth.reducer';
import { OtpComponent } from './pages/auth/otp/otp.component';
import { commonReducer } from './store/common/common.reducer';
import { GoogleLoginComponent } from './pages/auth/google-login/google-login.component';
import { CarouselModule } from './shared/carousel/carousel.module';
import { SharedModule } from './shared/shared.module';










@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    OtpComponent,
    GoogleLoginComponent,  
   
   
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
       
      timeOut: 5000, // Example timeout
      preventDuplicates: true,
      progressBar: true
    }), // ToastrModule added
    StoreModule.forRoot({auth:authReducer,common:commonReducer}),
    EffectsModule.forRoot([AuthEffects]),
    CarouselModule,
    SharedModule,
    
  ],
  providers: [
    provideAnimationsAsync(), // Fix typo here
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true} // Make sure useClass is correctly spelled
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
