import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
/*OBJECTS*/

interface Object {
  list: Array<undefined>;
  success: boolean;
}
interface LinkData{
  Email:string;
  EndDate:string;
  PlateId:Array<string>;
  PlateLabel:Array<string>;
  StartDate:string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient,private firestore:Firestore) { }
  myData:any;
  loading:number=0;
  emailStore:string="";
  Linkuid:string="";
  key:string=""
  linkdata:LinkData={
    Email:"",
    EndDate:"",
    PlateId:[],
    PlateLabel:[],
    StartDate:"",
  };
  siteUrl:string='BASEURL/api-v2/user/session/weblocator/read'
  siteUrlcreate:string='BASEURL/api-v2/user/session/weblocator/create'
  site:string;

  login(data: any):Observable<any>{
    return this.http.post('https://api.navixy.com/v2/user/auth',data)
  }
  load(data:Object):Observable<any>{
    return this.http.post('https://api.navixy.com/v2/tracker/list',data)
  }
  getKey(data:any):Observable<any>{
    return this.http.post(this.siteUrl,data)
    
  }
  createKey(data:any):Observable<any>{
    this.siteUrlcreate=this.siteUrlcreate.replace('BASEURL',this.site);
    return this.http.post(this.siteUrlcreate,data)
    
  }
  async setlink(site:string){
    this.siteUrl=this.siteUrl.replace('BASEURL',site);
    this.site=site
  }
}
