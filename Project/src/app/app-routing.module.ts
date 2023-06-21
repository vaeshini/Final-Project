import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { MainComponent } from './admin/main/main.component';
import { UsersComponent } from './admin/users/users.component';
import { ServicesComponent } from './admin/services/services.component';
import { ReportComponent } from './admin/report/report.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { SubscriptionComponent } from './admin/subscription/subscription.component';
import { AddServiceComponent } from './admin/add-service/add-service.component';
import { AuthGuard } from './guards/auth.guard';
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
import { AdminauthGuard } from './guards/adminauth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'admin', redirectTo: 'admin/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'web-page', component: WebPageComponent,canActivate:[AuthGuard] },
  { path: 'buy-plan', component: BuyPlanComponent,canActivate:[AuthGuard] },
  { path: 'payment', component: PaymentComponent,canActivate:[AuthGuard] },
  { path: 'sub-category', component: SubCategoryComponent,canActivate:[AuthGuard] },
  { path: 'user-profile', component: UserProfileComponent,canActivate:[AuthGuard] },
  {path:'ad-login',component:AdminloginComponent},
  {
    path: 'admin', component: AdminComponent,canActivate:[AdminauthGuard],
    children: [
      { path: 'dashboard', component: MainComponent },
      { path: 'user', component: UsersComponent },
      { path: 'service', component: ServicesComponent },
      { path: 'sub-service', component: SubServiesComponent },
      { path: 'report', component: ReportComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'subscription', component: SubscriptionComponent },
      { path:'add-ser', component:AddServiceComponent },
      {path:'add-sub-ser',component:AddSubSerComponent},
      {path:'add-subscription',component:AddSubscriptiontierComponent},
      {path:'edit-tier',component:EditSubscritpiontierComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
