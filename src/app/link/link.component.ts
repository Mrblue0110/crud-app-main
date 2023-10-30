import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentSnapshot, Firestore,Timestamp,doc,getDoc } from '@angular/fire/firestore';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit{
   id: string=''; 
   collPath:string='Links';
   Plateid:Array<String>=[];
   docSnap:DocumentSnapshot | undefined
   canSee:boolean=false
   Plates:string=""
   Labels:Array<String>=[];
   StartDate:Date|undefined
   EndDate:Date|undefined
   currentdate:Date=new Date;
   safeIframe:SafeUrl | undefined
   key:string=""
   iframe='//live.bngtracking.ro/pro/applications/locator/?key=KEYgoseHere&objects=IDgoseHere&map=roadmap'
  constructor(private route: ActivatedRoute,private firestore:Firestore,private router: Router,protected sanitizer: DomSanitizer){}
   async ngOnInit() {
      this.id= this.route.snapshot.params['id']
      this.docSnap=await getDoc(doc(this.firestore,'Links',this.id));
      this.Plateid =this.docSnap.data()?.['PlateId']
      this.Labels =this.docSnap.data()?.['PlateLabel']
      this.StartDate=this.docSnap.data()?.['StartDate'].toDate()
      this.EndDate=this.docSnap.data()?.['EndDate'].toDate()
      this.key=this.docSnap.data()?.['Key']
     if(!this.docSnap.data()|| this.docSnap.data()?.['StartDate'].toDate() > this.currentdate || this.docSnap.data()?.['EndDate'].toDate() < this.currentdate){
        this.router.navigate(['/notfound',this.id])
     }else{this.canSee=true
      this.Plateid.forEach((str)=>{
         this.Plates+=str+','
      })
      this.Plates=this.Plates.slice(0,-1);
      this.iframe=this.iframe.replace('IDgoseHere',this.Plates);
      this.iframe=this.iframe.replace('KEYgoseHere',this.key);
      this.safeIframe=this.sanitizer.bypassSecurityTrustResourceUrl(this.iframe);
      console.log(this.safeIframe)
      console.log(this.iframe)
     }
    }

}
