import { Component,Inject, OnInit ,} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({

  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit{
  yes:boolean=true
  no:boolean=false
  fdate: Date=new Date();
  ldate: Date=new Date();

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private ref:MatDialogRef<PopupComponent>){
  }
  ngOnInit(): void {
    this.fdate=this.data.startDate
    this.ldate=this.data.endDate
  }
  
  Yespopup(){
    this.ref.close(this.yes);
  }
  Nopopup(){
    this.ref.close(this.no);
  }
}
