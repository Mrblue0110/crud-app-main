import { Component, OnInit, EventEmitter, Output, LOCALE_ID, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthServiceService } from '../auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { Firestore, query, collection, addDoc, doc, updateDoc, deleteDoc, collectionData, Timestamp, getDocs, where, documentId } from '@angular/fire/firestore';
import { PopupcopyComponent } from '../popupcopy/popupcopy.component';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';



/*OBJECT*/
interface LinkData {
  Email: string;
  EndDate: string;
  PlateId: Array<string>;
  PlateLabel: Array<string>;
  StartDate: string;
}
interface fireData {
  EndDate?: Date;
  PlateLabel?: Array<string>;
  StartDate?: Date;
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
  // standalone:true,
  //  imports:[MatTableModule,MatPaginatorModule]
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
  Uid: string = "";
  querySnapshot: any;
  fireList: fireData[] = [];
  displayedColumns: string[] = ["Cars", "Start Date", "End Date", "Action"];
  dataSource: any;
  genT: boolean = false;
  pageEvent: PageEvent | undefined;
  pageSize: number = 5;
  length: number = 0;

  constructor(public authService: AuthServiceService, private dialog: MatDialog, private firestore: Firestore, private router: Router) {

  }
  ngOnInit() {

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
            let thislink: LinkData = {
              Email: this.authService.emailStore,
              EndDate: formData.ldate._d,
              PlateId: this.CarId,
              PlateLabel: this.CarLabel,
              StartDate: formData.fdate._d
            }
            this.authService.linkdata = thislink
            console.log(this.authService.linkdata)
            const collectionInstance = collection(this.firestore, 'Links');
            this.authService.start();
            addDoc(collectionInstance, thislink,).then((docRef) => {
              const uid = docRef.id;
              this.Uid = uid
              this.authService.Linkuid = this.Uid;
              if (this.Uid) {
                this.getData();
                this.authService.stop();
              }
              this.popcopy(this.Uid);
            })

          }
        })
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
    console.log(this.authService.myData);
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
  isLoading() {
    return this.authService.isloading();
  }
  async getData() {
    const queryInstance = query(collection(this.firestore, 'Links'), where('Email', '==', this.authService.emailStore));
    this.querySnapshot = await getDocs(queryInstance);
    this.querySnapshot.forEach((document: any) => {
      const data = document.data() as fireData;
      if (data) {
        const mappedData = {
          StartDate: data.StartDate,
          EndDate: data.EndDate,
          PlateLabel: data.PlateLabel,
          DocumentId: document.id
        };
        this.fireList.push(mappedData);


        this.genT = true
      } else {
        this.genT = false
      }
    });
    this.initDataSource();
  }
  @ViewChild(MatPaginator)
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }
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
    if (this.fireList.length > 0) {
      this.dataSource = new MatTableDataSource<fireData>(this.fireList)
    }
  }
}
