import { Component, OnInit,EventEmitter,Output} from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

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
  constructor(private authService: AuthServiceService,private router: Router){
    
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
        this.authService.start();
        this.authService.login(post).subscribe({
          next: result => {
            if(result.success){
              console.log(result)
              this.authService.load(result).subscribe(data=>{
                if(data){
                console.log(data)
                
                this.authService.myData = data ;
                this.authService.emailStore=this.formGroup.value.login;
                this.authService.stop();
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
            this.authService.stop();
          }
        });
        }
      }

      isLoading() {
        return this.authService.isloading();
      }

    }
    
  


