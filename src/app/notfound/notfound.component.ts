import { Component, OnInit } from '@angular/core';
import { DocumentSnapshot, Firestore, doc, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {
  id: string=''; 
  docSnap:DocumentSnapshot | undefined
  StartDate:Date|undefined
  EndDate:Date|undefined
  currentdate:Date=new Date;
  expLink:boolean=false;
  notacLink:boolean=false;
  noLink:boolean=false;
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
        }
        else if(this.docSnap.data()?.['EndDate'].toDate() < this.currentdate){
          this.expLink=true
        }else{
          this.router.navigate(['/link',this.id])
        }
      }

  }

}
