import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { AuthLinksComponent } from './auth-links/auth-links.component';
import { SocialLinksComponent } from './social-links/social-links.component';
import { PhoneComponent } from './phone/phone.component';
import { EmailComponent } from './email/email.component';
import { ButtonComponent } from './button/button.component';
import { FooterComponent } from './footer/footer.component';
import { PaginationComponent } from './pagination/pagination.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { CarouselComponent } from './carousel/carousel.component';


@NgModule({
  
  declarations: [
    HeaderComponent,
    MenuComponent,
    AuthLinksComponent,
    SocialLinksComponent,
    PhoneComponent,
    EmailComponent,
    ButtonComponent,
    FooterComponent,
    PaginationComponent,
    LoadingSpinnerComponent,
    AdminMenuComponent,
   
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],exports:[  HeaderComponent,
    MenuComponent,
    AuthLinksComponent,
    SocialLinksComponent,
    PhoneComponent,
    EmailComponent,
    ButtonComponent,
    FooterComponent,
    PaginationComponent,
    LoadingSpinnerComponent,
   AdminMenuComponent,
  ]
})
export class SharedModule { }
