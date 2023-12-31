import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms'
import { AuthServiceService } from '../auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { Firestore, query, collection,
  addDoc, doc, deleteDoc,Timestamp,
  getDocs, where, orderBy} from '@angular/fire/firestore';
import { PopupcopyComponent } from '../popupcopy/popupcopy.component';
import { Router } from '@angular/router';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { PopsinerComponent } from '../popsiner/popsiner.component';
import { DatePipe } from '@angular/common';





/*OBJECT*/
interface LinkData {
  Email: string;
  EndDate: string;
  PlateId: Array<string>;
  PlateLabel: Array<string>;
  StartDate: string;
  CreatedDate:Timestamp;
  Key:string;
}
interface fireData {
  EndDate:string;
  PlateLabel?: Array<string>;
  StartDate:string;
  CreatedDate?:Timestamp;
  DocumentId?: string;

}
interface mapData {
  EndDate: Timestamp;
  PlateLabel?: Array<string>;
  StartDate: Timestamp;
  CreatedDate?:Timestamp;
  DocumentId?: string;
}
interface Plates {
  id: string;
  label: string;
}
@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css'],
})
export class SelectorComponent implements OnInit {
  selectForm!: FormGroup;
  ready: boolean = false;
  plates: Plates[] = [];
  formData: any;
  masage: string = "Compleate all fields";
  alert: boolean = false;
  mindate: Date = new Date(1900, 1, 1);
  valed: boolean = true;
  cars: Plates[] = [];
  CarId: Array<string> = [];
  CarLabel: Array<string> = [];
  currentdate: Date = new Date;
  createDate: Timestamp ;
  Uid: string = "";
  querySnapshot: any;
  fireList: fireData[] = [];
  paginato: any;
  displayedColumns: string[] = ["Cars", "Start Date", "End Date","Action"];
  dataSource: any;
  mobile:boolean=true;
  constructor(public authService: AuthServiceService,
              private dialog: MatDialog,
              private firestore: Firestore, 
              private toastr: ToastrService,
              private router: Router,
              private datepipe:DatePipe) {}
  ngOnInit() {
    if (window.screen.width <= 700) { // 768px portrait
      this.mobile = false;
      this.displayedColumns=["Data","Action"]
    }
    this.initForm();
    if (!this.authService.myData) {
      this.router.navigate([''])
    } else {
      
      this.getData();
      this.initPlates();
    }

  }
  initForm() {
    this.selectForm = new FormGroup({
      sel: new FormControl(''),
      fdate: new FormControl(''),
      ldate: new FormControl(''),
    });
  }
  onSubmit(formData) {
    if (formData.sel != "") {
      if (formData.fdate && formData.ldate) {
        if(formData.fdate>formData.ldate){
          this.alert = true
          this.masage = "End date can't be before start date"
        }else{
        this.alert = false
        var mypopup = this.dialog.open(PopupComponent, {
          width: '400px',
          data: {
            startDate: formData.fdate._d,
            endDate: formData.ldate._d
          }
        });
        mypopup.afterClosed().subscribe(value => {
          this.ready = value
          if (this.ready) {
            this.CarId = [];
            this.CarLabel = [];
            this.selectForm.value.sel.forEach(element => {
              let car: Plates = {
                id: element.id,
                label: element.label
              }
              this.CarId.push(car.id);
              this.CarLabel.push(car.label);
            });
            this.createDate=Timestamp.now();
            let thislink: LinkData = {
              Email: this.authService.emailStore,
              EndDate: formData.ldate._d,
              PlateId: this.CarId,
              PlateLabel: this.CarLabel,
              StartDate: formData.fdate._d,
              CreatedDate: this.createDate,
              Key:this.authService.key
            }
            this.authService.linkdata = thislink
            const collectionInstance = collection(this.firestore, 'Links');
            this.dialog.open(PopsinerComponent,{
              disableClose: true,
            })
            addDoc(collectionInstance, thislink,).then((docRef) => {
              this.Uid = docRef.id;
              this.authService.Linkuid = this.Uid;
              if (this.Uid) {
                this.getData();
                this.dialog.closeAll();
              }
              this.popcopy(this.Uid);
            })

          }
        })
      }
    }
      else {
        this.alert = true
        this.masage = "Enter a start and end date"
      }
    }
    else {
      this.alert = true
      if (formData.fdate && formData.ldate) {
        this.masage = "Select a plate"
      }
    }
  }
  initPlates() {
    this.authService.myData.list.forEach(Element => {
      let plate: Plates = {
        id: Element.id,
        label: Element.label
      }
      this.plates.push(plate);
    });
  }
  hideEnd() {
    if (this.selectForm.value.fdate._d) {
      this.valed = false
    }
    this.mindate = this.selectForm.value.fdate._d
  }
  async getData() {
    const queryInstance = query(collection(this.firestore, 'Links'), where('Email', '==', this.authService.emailStore),orderBy("CreatedDate","desc"));
    this.querySnapshot = await getDocs(queryInstance);
    this.fireList = [];
    this.querySnapshot.forEach((document: any) => {
      const data = document.data() as mapData;
      if (data) {
    const startDate=this.datepipe.transform(data.StartDate.toDate(),'d.MMM.yy h:mm a');  
    const endDate=this.datepipe.transform(data.EndDate.toDate(),'d.MMM.yy h:mm a');  
    const trimPlate:Array<string>=[]
    data.PlateLabel?.forEach((elm)=>{
      elm=elm.trim().replace(/\s/g,'')
      trimPlate.push(elm)
    })
        const mappedData = {
          StartDate: startDate||'',
          EndDate: endDate||'',
          PlateLabel:trimPlate,
          DocumentId: document.id,
          CreatedDate: data.CreatedDate
        };
        this.fireList.push(mappedData);
      } 
    });
    this.initDataSource();
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (window.screen.width <= 700) { // 768px portrait
      this.mobile = false;
      this.displayedColumns=["Data","Action"]
    }else{
      this.displayedColumns= ["Cars", "Start Date", "End Date","Action"];
      this.mobile=true;
    }

  }
  
  @ViewChild(MatPaginator)
  set paginator(value: MatPaginator) {
    if(value!=undefined){
      //  this.dataSource.paginator = value;
       this.paginato=value
    }}

  popcopy(uid: string) {
    this.dialog.open(PopupcopyComponent, {
      width: '420px',
      height: '250px',
      data: {
        link: uid
      }
    })
  }
  initDataSource() {

      this.dataSource = new MatTableDataSource<fireData>()
    this.dataSource.data = this.fireList;
    this.dataSource.paginator=this.paginato;
    
  }
  async deleteLink(id:string){
     const docInstance = doc(this.firestore,'Links',id);
     await deleteDoc(docInstance).then(()=>{
      this.toastr.success("Link was deleted succesfully","", {
        timeOut:1000,
        positionClass: "toast-bottom-center",
      });
      this.getData();
    })

  }
  applyFilter(filterValue:string){
    this.dataSource.filter=filterValue.trim().toLocaleLowerCase()
  }
}
