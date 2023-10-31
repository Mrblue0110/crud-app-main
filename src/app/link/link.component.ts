import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentSnapshot, Firestore,Timestamp,collection,doc,getDoc, getDocs, query, where } from '@angular/fire/firestore';
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
   docSnap:DocumentSnapshot 
   canSee:boolean=false
   Plates:string="";
   Labels:Array<String>=[];
   StartDate:Date
   EndDate:Date
   currentdate:Date=new Date;
   safeIframe:SafeUrl 
   linkEmail:string;
   querySnapshot:any
   baseUrl:string
   key:string;
   diff:any;
   iframe='BASEURL/pro/applications/locator/?key=KEY&objects=ID&map=roadmap'
  constructor(private route: ActivatedRoute,private firestore:Firestore,private router: Router,protected sanitizer: DomSanitizer){}
   async ngOnInit() {
      this.id= this.route.snapshot.params['id']
      this.docSnap=await getDoc(doc(this.firestore,'Links',this.id));
      this.Plateid =this.docSnap.data()?.['PlateId']
      this.Labels =this.docSnap.data()?.['PlateLabel']
      this.StartDate=this.docSnap.data()?.['StartDate'].toDate()
      this.EndDate=this.docSnap.data()?.['EndDate'].toDate()
      this.key=this.docSnap.data()?.['Key']
      this.linkEmail=this.docSnap.data()?.['Email']
     if(!this.docSnap.data()|| this.docSnap.data()?.['StartDate'].toDate() > this.currentdate || this.docSnap.data()?.['EndDate'].toDate() < this.currentdate){
        this.router.navigate(['/notfound',this.id])
     }else{this.canSee=true
      this.Plateid.forEach((str)=>{
         this.Plates+=str+','
      })
      this.Plates=this.Plates.slice(0,-1);
      const queryInstance = query(collection(this.firestore, 'UserKeys'), where('Email', '==',this.linkEmail));
      this.querySnapshot = await getDocs(queryInstance);
      this.querySnapshot.forEach((document: any) => {
          this.baseUrl=document.data()?.['BaseUrl']
      })
      this.iframe=this.iframe.replace('BASEURL',this.baseUrl);
      this.iframe=this.iframe.replace('ID',this.Plates);
      this.iframe=this.iframe.replace('KEY',this.key);
      this.safeIframe=this.sanitizer.bypassSecurityTrustResourceUrl(this.iframe);
       this.diff=this.EndDate.getTime()-this.currentdate.getTime()
       if(this.diff<86400000){
       this.delayAction(()=>{
         this.router.navigate(['/notfound',this.id])
       },this.diff)
     }}
    }
    delayAction(action: () => void, milliseconds: number): void {
      setTimeout(action, milliseconds); // Specify the delay in milliseconds
    }
}
