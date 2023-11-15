import { Component, OnInit,EventEmitter,Output} from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { Firestore,
  collection, getDocs,
  query, where } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { PopsinerComponent } from '../popsiner/popsiner.component';
/*OBJECTS*/

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() swap = new EventEmitter();

  formGroup!: FormGroup;
  post: any;
  wrong:boolean=false;
  masage:string="Somthing went wrong try again"
  querySnapshot:any;
  site:string
  constructor(private authService: AuthServiceService,private router: Router,private firestore: Firestore,private dialog: MatDialog){
    
  }
  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.formGroup =new FormGroup({
      login: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required])
    });
    }

    onSubmit(post: any) {
      if(this.formGroup.invalid){
        this.wrong=true
        this.masage="Enter a valid email";
      }
      if(this.formGroup.valid){
        this.wrong=false
        this.dialog.open(PopsinerComponent,{
          disableClose: true,
        })
        this.authService.login(post).subscribe({
          next: async result => {
            if(result.success){
              const queryInstance = query(collection(this.firestore, 'UserKeys'), where('Email', '==',this.formGroup.value.login));
               this.querySnapshot = await getDocs(queryInstance);
                this.querySnapshot.forEach((document: any) => {
                this.site=document.data()?.['BaseUrl']
                 })
              this.authService.setlink(this.site)
              this.authService.getKey(result).subscribe({
                next: rez=>{
               this.authService.key=rez.value;},
               error:(er)=>{
              this.authService.createKey(result).subscribe({
                next:createRez=>{
                this.authService.key=createRez.value;
              console.log('creation succesful')},
                error:(er)=>{
                    console.log(er)
                }
              })
               }
              }) 
              this.authService.load(result).subscribe(data=>{
                if(data){
                this.authService.myData = data ;
                this.authService.emailStore=this.formGroup.value.login;
                this.dialog.closeAll();
               this.router.navigate(['/creator'])
              }
              })
            }
          },
          error: (er) => {
            this.wrong=true
            this.masage="The email or password is wrong";
            this.formGroup.value.login=[];
            this.formGroup.value.password=[];
            this.dialog.closeAll();
          }
        });
        }
      }

    }
    
  


