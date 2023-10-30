import { Component, Inject, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DOCUMENT } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-popupcopy',
  templateUrl: './popupcopy.component.html',
  styleUrls: ['./popupcopy.component.css']
})
export class PopupcopyComponent implements OnInit  {
  baseUrl: string =''
  LinkUid:string=""
  linkVal:string="link/"


  constructor(@Inject(MAT_DIALOG_DATA) public data:any,@Inject(DOCUMENT)private document:Document,private toastr: ToastrService,public authService: AuthServiceService, private refcopy: MatDialogRef<PopupcopyComponent>) { }
  ngOnInit(): void {
    this.baseUrl=this.document.location.href;
    this.baseUrl=this.baseUrl.slice(0,-7);
     this.baseUrl=this.baseUrl.concat(this.linkVal)
     this.LinkUid = this.data.link
    this.baseUrl = this.baseUrl.concat(this.LinkUid.toString())
  }

  close() {
    this.refcopy.close()
  }
  tostmes(){
    this.toastr.success("Link was copied succesfully","", {
      positionClass: "toast-bottom-center",
    });
  }
}
