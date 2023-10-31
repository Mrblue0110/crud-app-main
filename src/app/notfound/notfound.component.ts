import { Component, OnInit } from '@angular/core';
import { DocumentSnapshot, Firestore, Timestamp, doc, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {
  id: string=''; 
  docSnap:DocumentSnapshot
  StartDate:Date
  EndDate:Date
  currentdate:Date=new Date;
  expLink:boolean=false;
  notacLink:boolean=false;
  noLink:boolean=false;
  diff:any
  constructor(private route: ActivatedRoute,private firestore:Firestore,private router: Router){}
  async ngOnInit() {
    this.id= this.route.snapshot.params['id']
      this.docSnap=await getDoc(doc(this.firestore,'Links',this.id));
      if(!this.docSnap.data()){
        this.noLink=true
      }else{
        this.StartDate=this.docSnap.data()?.['StartDate'].toDate()
        this.EndDate=this.docSnap.data()?.['EndDate'].toDate()
        if(this.docSnap.data()?.['StartDate'].toDate() > this.currentdate){
          this.notacLink=true
          this.diff=this.StartDate.getTime()-this.currentdate.getTime()
          if(this.diff<86400000){
          this.delayAction(()=>{
             this.router.navigate(['/link',this.id])
          },this.diff)}
        }
        else if(this.docSnap.data()?.['EndDate'].toDate() < this.currentdate){
          this.expLink=true
        }else{
          this.router.navigate(['/link',this.id])
        }
      }

  }
  delayAction(action: () => void, milliseconds: number): void {
    setTimeout(action, milliseconds); // Specify the delay in milliseconds
  }

}
