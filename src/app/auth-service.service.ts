import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  constructor(private http:HttpClient) { }
  myData:any;
  loading:number=0;
  emailStore:string="";
  Linkuid:string="";
  linkdata:LinkData={
    Email:"",
    EndDate:"",
    PlateId:[],
    PlateLabel:[],
    StartDate:"",
  };
    

  login(data: any):Observable<any>{
    return this.http.post('https://api.navixy.com/v2/user/auth',data)
  }
  load(data:Object):Observable<any>{
    return this.http.post('https://api.navixy.com/v2/tracker/list',data)
  }
  start(){
    this.loading ++;
  }
  stop(){
    this.loading --;
  }
  isloading(){
    return this.loading > 0;
  }
}
