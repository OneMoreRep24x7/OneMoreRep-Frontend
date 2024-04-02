import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserdashboardComponent } from './components/userdashboard/userdashboard.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TrainerdashboardComponent } from './components/trainerdashboard/trainerdashboard.component';
import { HeaderComponent } from './shared/header/header.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthEffects } from './store/auth/auth.effects';
import { AuthInterceptorService } from './interceptor/auth-interceptor.service';
import { authReducer } from './store/auth/auth.reducer';
import { MenuComponent } from './shared/menu/menu.component';
import { AuthLinksComponent } from './shared/auth-links/auth-links.component';
import { SocialLinksComponent } from './shared/social-links/social-links.component';
import { PhoneComponent } from './shared/phone/phone.component';
import { EmailComponent } from './shared/email/email.component';
import { ButtonComponent } from './shared/button/button.component';
import { FooterComponent } from './shared/footer/footer.component';
import { OtpComponent } from './components/otp/otp.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AdminMenuComponent } from './shared/admin-menu/admin-menu.component';
import { TrainerRegisterComponent } from './components/trainer-register/trainer-register.component';
import { commonReducer } from './store/common/common.reducer';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { GoogleLoginComponent } from './components/google-login/google-login.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { TrainerprofileComponent } from './components/trainerprofile/trainerprofile.component';
import { CarouselModule } from './shared/carousel/carousel.module';
import { AdduserprofileComponent } from './components/adduserprofile/adduserprofile.component';





@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserdashboardComponent,
    TrainerdashboardComponent,
    HeaderComponent,
    MenuComponent,
    AuthLinksComponent,
    SocialLinksComponent,
    PhoneComponent,
    EmailComponent,
    ButtonComponent,
    FooterComponent,
    OtpComponent,
    LoadingSpinnerComponent,
    AdminMenuComponent,
    TrainerRegisterComponent,
    AdmindashboardComponent,
    GoogleLoginComponent,
    UserprofileComponent,
    TrainerprofileComponent,
    AdduserprofileComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    StoreModule.forRoot({auth:authReducer,common:commonReducer}),
    EffectsModule.forRoot([AuthEffects]),
    // StoreRouterConnectingModule.forRoot(),
    // StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
    CarouselModule
  ],
  providers: [
    provideAnimationsAsync(), // Fix typo here
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true} // Make sure useClass is correctly spelled
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
