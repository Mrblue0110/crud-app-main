import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'crud-app';
  const : boolean = true ;
  // temp:string='/link/'
  // temp2:string='348dNwOCGC6idzN0Jera'
  constructor(private router: Router ,private authService: AuthServiceService){}
  ngOnInit(): void {
    // this.temp = this.temp.concat(this.temp2.toString())
    //           this.router.navigate([this.temp])
    //  this.router.navigate([this.temp])
  }
 

  Active(){
    this.const = false;
  }


}
