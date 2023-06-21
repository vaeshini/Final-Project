import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './admin/header/header.component';
import { SideNavComponent } from './admin/side-nav/side-nav.component';
import { MainComponent } from './admin/main/main.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { ReportComponent } from './admin/report/report.component';
import { ServicesComponent } from './admin/services/services.component';
import { UsersComponent } from './admin/users/users.component';
import { SubscriptionComponent } from './admin/subscription/subscription.component';
import { AddServiceComponent } from './admin/add-service/add-service.component';
import { AddSubSerComponent } from './admin/add-sub-ser/add-sub-ser.component';
import { AddSubscriptiontierComponent } from './admin/add-subscriptiontier/add-subscriptiontier.component';
import { EditSubscritpiontierComponent } from './admin/edit-subscritpiontier/edit-subscritpiontier.component';
import { SubServiesComponent } from './admin/sub-servies/sub-servies.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { WebPageComponent } from './web-page/web-page.component';
import { BuyPlanComponent } from './buy-plan/buy-plan.component';
import { PaymentComponent } from './payment/payment.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    HeaderComponent,
    SideNavComponent,
    MainComponent,
    ProfileComponent,
    ReportComponent,
    ServicesComponent,
    UsersComponent,
    SubscriptionComponent,
    AddServiceComponent,
    AddSubSerComponent,
    AddSubscriptiontierComponent,
    EditSubscritpiontierComponent,
    SubServiesComponent,
    SignUpComponent,
    WebPageComponent,
    BuyPlanComponent,
    PaymentComponent,
    SubCategoryComponent,
    UserProfileComponent,
    AdminloginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
