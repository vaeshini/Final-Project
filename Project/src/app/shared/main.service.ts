import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from './user';
import { subservice } from './subservice';
import { subscriptionplan } from './subscriptionplan';
import { user1 } from './user1';
import { payment } from './payment';
import { admin } from './admin';
import { JwtHelperService } from '@auth0/angular-jwt';
import { admin1 } from './admin1';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  helper=new JwtHelperService();
  userData:user1=new user1();

  adminData:admin1=new admin1();

  subServices:any[]=[];

  subTier:any[]=[];

  tierDet:any;

  pay:payment=new payment();

  updateTier:subscriptionplan=new subscriptionplan();

  token:any;
  setToken(){
    this.token=this.getToken();
  }
  decodeToken(){
    const decodeToken=this.helper.decodeToken(this.token);
    this.userData.userId=decodeToken.primarysid;
    this.userData.firstName=decodeToken.unique_name;
    this.userData.lastName=decodeToken.family_name;
    this.userData.phoneNumber=decodeToken.certserialnumber;
    this.userData.email=decodeToken.email;

    }

  adtoken:any;
  setAdminToken(){
    this.adtoken=this.getAdminToken();
  }
  decodeAdminToken(){
    const decodeToken=this.helper.decodeToken(this.adtoken);
    this.adminData.adminId=decodeToken.primarysid;
    this.adminData.firstName=decodeToken.unique_name;
    this.adminData.lastName=decodeToken.family_name;
    this.adminData.userName=decodeToken.nameid;

    }


 

  adminPath="https://localhost:7164/api/Admin"
  userPath="https://localhost:7164/api/Users";
  servicePath="https://localhost:7164/api/ProductServices";
  subServicePath="https://localhost:7164/api/SubProductServices";
  userSubscriptionPath="https://localhost:7164/api/UserSubscriptions"
  subscriptionPath="https://localhost:7164/api/SubscriptionTiers";
  constructor(private http:HttpClient) { }

  //admin
  deleteUserSubscriptionDetails(){
    return this.http.get(this.adminPath+'/DeleteUserSubDet')
    }

    getAdminrById(id:number){
      return this.http.get(this.adminPath+'/'+id);
    }

    updateAdmin(adminData:admin1){
      return this.http.put(this.adminPath,adminData);
    }
  
  //users

  getUserById(id:number){
    return this.http.get<user1>(this.userPath+'/'+id);
  }

  getAllUsers(){
    return this.http.get(this.userPath);
  }

  addUser(user:user1){
    return this.http.post(this.userPath,user);
  }

  deleteUser(id:number){
    return this.http.delete(this.userPath+'?id='+id);
  }

  getSubDetails(id:number){
    return this.http.get(this.userPath+'/UserSubDet?id='+id)
  }

  updateUser(data:user1){
    return this.http.put(this.userPath,data);
  }

  //service
  addService(formData:any){
    return this.http.post(this.servicePath,formData);
  }

  getService(){
    return this.http.get(this.servicePath);
  }


  deleteService(id:number){
    return this.http.delete(this.servicePath+'?id='+id);
  }
  //subservice
  getSubSeviceRemaining(){
    return this.http.get(this.subscriptionPath+'/Subscription');
  }
  addSubService(formData:subservice){
    return this.http.post(this.subServicePath,formData);
  }
  addImage(formData:FormData){
    return this.http.post(this.subServicePath+'/AddImg',formData)
  }
  getSubSerDet(){
    return this.http.get(this.subServicePath+'/SubServDet');
  }
  deleteSubService(id:number){
    return this.http.delete(this.subServicePath+'?id='+id);
  }
  getServiceById(id:number){
    return this.http.get(this.subServicePath+'/ById?id='+id);
  }
  //subscription
  addSubscription(data:subscriptionplan){
    return this.http.post(this.subscriptionPath,data);
  }

  getSubscriptionTier(){
    return this.http.get(this.subscriptionPath+'/SubDetails');
  }
  getSubscriptionTierbyId(id:number){
    return this.http.get(this.subscriptionPath+'/'+id);
  }
  updateSubscriptionTier(){
    return this.http.put(this.subscriptionPath,this.updateTier);
  }

  getPlanById(id:number){
    return this.http.get(this.subscriptionPath+'/ById?id='+id);
  }

  getTierById(id:number){
    return this.http.get(this.subscriptionPath+'/'+id);
  }

  //UserSubscription
  getReport(){
    return this.http.get(this.userSubscriptionPath+'/Report');
  }

  payment(){
    this.pay.userId=this.userData.userId;
    this.pay.subscriptionTierId=this.tierDet.subscriptionTierId;
    this.pay.duration=this.tierDet.duration;
    return this.http.post(this.userSubscriptionPath,this.pay);

  }

  //userauth
  authenticate(data:user){
    return this.http.post(this.userPath+'/authenticate',data);
  }
  authenticateadmin(data:admin){
    return this.http.post(this.adminPath+'/authenticate',data);
  }

  //Tokens
  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }
  signout(){
    localStorage.clear();
  }
  //admin token
  storeAdminToken(tokenValue:string){
    localStorage.setItem('admintoken',tokenValue);
  }

  getAdminToken(){
    return localStorage.getItem('admintoken');
  }

  isAdminLoggedIn():boolean{
    return !!localStorage.getItem('admintoken');
  }
  adminSignout(){
    localStorage.clear();
  }

  //Total
  getTotalUsers(){
    return this.http.get(this.userPath+'/Count');
  }
  getTotalServices(){
    return this.http.get(this.servicePath+'/Count');
  }
  getTotalSubServices(){
    return this.http.get(this.subServicePath+'/Count');
  }
  getTotalUserSubscriptions(){
    return this.http.get(this.userSubscriptionPath+'/Count');
  }
  getTotalSubscription(){
    return this.http.get(this.userSubscriptionPath+'/Sub');
  }
  getTotalUserNotSubscribed(){
    return this.http.get(this.userSubscriptionPath+'/Notsub');
  }
}
