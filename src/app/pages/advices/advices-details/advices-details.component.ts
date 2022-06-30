import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../../../services/userService/user.service";
import { NgbActiveModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { CommandeServiceService } from "../../../services/commandeService/commande-service.service";
import { FileUpload } from "../../../models/file-upload/file-upload.module";
import { TypeService } from 'src/app/services/typeof-service/type.service';
import { SpecialiteService } from 'src/app/services/specialites/specialite.service';
import { Specialite } from 'src/app/models/specialite/specialite.module';
import { TraitementService } from 'src/app/services/Traitement/traitement.service';
import { Traitement } from 'src/app/models/traitement/traitement.module';
import { PraticientService } from 'src/app/services/particientServ/particient.service';
import { Praticien } from 'src/app/models/praticient/praticient.module';
import { User } from 'src/app/models/user/user.module';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
// import { 
//   distanceTo 
// } from 'geolocation-utils'
// import { database } from 'firebase-functions/v1/firestore';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';
import { cpa } from 'geolocation-utils';
import { AppointementsService } from 'src/app/services/appointement/appointements.service';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
interface FoodNode {
  name: any;
  children?: FoodNode[];
}



/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

/**
 * @title Tree with flat nodes
 */

@Component({
  selector: 'app-advices-details',
  templateUrl: './advices-details.component.html',
  styleUrls: ['./advices-details.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class AdvicesDetailsComponent implements OnInit {
  minute:any
  hours:any
  
    private _transformer = (node: FoodNode, level: number) => {
      return {
        expandable: !!node.children && node.children.length > 0,
        name: node.name,
        level: level,
      };
    };
  
    treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level,
      node => node.expandable,
    );
  
    treeFlattener = new MatTreeFlattener(
      this._transformer,
      node => node.level,
      node => node.expandable,
      node => node.children,
    );
  
    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    @Input() commandeInput: any;
    @Input() traitementInput: any
  
  
    
    type: any;
    user: any;
    trait: any;
    public specialites: Specialite[] = [];
    public traitements: Traitement[] = [];
    //  member:any
    // userMedicalRecord:any=[];
    currentFileUpload?: FileUpload;
    public doctors: User[] = [];
    public doctor: User[] = [];
    public praticiens: Praticien[] = [];
    lon:any
    public commande: any = {
      uid_cmd: '',
      problem: '',
      specialite: '',
      serviceType: '',
      files: [
      ],
      created_date: '',
      description: '',
      etat: [
        {
          title: '',
          updateTime: ''
        }
      ]
    }
    model: any = {
      year: '',
      month: '',
      day: ''
    }
    traitement: any = {
      duration: '',
      id_cmd: '',
      id_praticien: '',
      price: '',
      // rdv: { [this.model.year]: {} }
      rdv: {
        time:'',
        hour: '',
        date: '',
        day: ''
      }
      ,
      uid_cmd: '',
      payed: true,
    };
    appointment:{
  
    }
    TREE_DATA: FoodNode[];
    images: any[] = [];
    audios: any[] = [];
    pdfFiles: any[] = [];
    timeRest:any
    constructor(private appointementService: AppointementsService,private router: Router, public activeModal: NgbActiveModal, private userService: UserService, private commandeService: CommandeServiceService, public typeServ: TypeService, private specialiteServ: SpecialiteService,
      public traitementService: TraitementService, private praticienService: PraticientService,config: NgbModalConfig) {
        config.backdrop = 'static';
        config.keyboard = false;
    }
    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
    dateExacte:any
    dateFavorable:any
  
    async ngOnInit(): Promise<void> {
  
  
      if (this.commandeInput, this.traitementInput) {
  
        await this.getUserById(this.commandeInput.uid_client);
        this.commande = this.commandeInput;
        this.traitement = this.traitementInput;
  
        this.dateExacte = new Date(this.traitement.rdv.date.toDate())
        this.dateFavorable = new Date(this.traitement.rdv.day)
        console.log(this.dateExacte
          )
  
        await this.getUserByid(this.traitementInput.id_trait);
  
        this.commande.serviceType = this.commande.serviceType;
      }
  
  
      this.commande?.files?.forEach(async (data: any) => {
        if (data.includes('pdf')) {
  
          this.pdfFiles.push(data)
  
        } else if (data.includes('jpg')) {
          this.images.push(data)
  
        } else if (data.includes('aac')) {
          this.audios.push(data)
  
        }
  
        this.TREE_DATA = [
  
          {
            name: 'Folders',
            children: [
              {
  
                name: 'Photos',
                children: [{ name: this.images }],
  
              },
              {
  
                name: 'audios',
                children: [{ name: this.audios }],
  
              },
              {
  
                name: 'Pdf Files',
                children: [{ name: this.pdfFiles }],
  
              },
  
            ],
          },
        ]
  
        this.dataSource.data = this.TREE_DATA;
  
  
      })
      await this.deleteRndv()
      await this.getAllSpecialite();
      await this.getAlltraitement();
      await this.getAllPraticien(this.commande.serviceType, this.commande.specialite);
  
    }
  
   
  
  
      async getAllType(): Promise<void> {
        this.typeServ.getAllTypes().then(async (data: any) => {
          this.type = data;
          data.foreach((data: any) => {
            if (data.uid_client != "")
              this.getUserById(data.uid_client)
  
          });
        }).catch((err: any) => {
          console.log(err);
        })
      }
  
      async deleteRndv(){
        
        var FullYear=  String(this.dateExacte.getFullYear())
        var Month   =  String(this.dateExacte.getMonth()+1).padStart(2, '0')
        var Day     =  String(this.dateExacte.getDate()).padStart(2, '0')
        var Hour    =  String(this.dateExacte.getHours()).padStart(2, '0')
        var Seconds =  String(this.dateExacte.getSeconds()).padStart(2, '0')
  
        var Hours = String(Hour + ':'+ Seconds)
  
        this.appointementService.updateRndv(this.traitement.id_praticien,FullYear,Month,Day,Hours)
      }
  
  
  
      async getAllSpecialite() {
        this.specialiteServ.getAllSpecial().then((data: any) => {
          this.specialites = data;
        }).catch((err) => {
          console.log(err);
        })
      }
  
  
  
      async getAllPraticien(serviceType: any, specialite: any) {
        this.praticiens = [];
        this.doctors = [];
  
        this.praticienService.getAllPraticien().then(async (data: any) => {
  
          this.praticiens = data;
  
          this.praticiens.forEach((data: any) => {
  
            if (data.serviceType?.find((e: any) => e === serviceType) && data.specialite?.includes(specialite)) {
              this.userService.getUserByID(data.uid).then((user_: any) => {
                this.doctors.push(user_);
                this.doctor = [];
  
                this.doctors.filter((data: any) => {
  
                  let lon1 = this.user.position.longitude;
                  let lat1 = this.user.position.latitude;
                  let lon2 = data.position.longitude;
                  let lat2 = data.position.latitude;
                  console.log(
                    lat1, lon1, lat2, lon2
                  );
                  const ship1 = {
                    location: { lon: lon1, lat: lat1 },
                    speed: 0,
                    heading: 200 // degrees
                  };
  
                  const ship2 = {
                    location: { lon: lon2, lat: lat2 },
                    speed: 5,
                    heading: 180 // degrees
                  };
                  const { time, distance } = cpa(ship1, ship2);
                   this.hours =  Math.floor(time/ (60*24))
                   this.minute = Math.floor( (time/ (60*24)-this.hours)*60)
  
                  console.log(this.hours, this.minute );
                  // this.membre = distanceTo({lat: data.address.latitude, lon:data.address.longitude}, {lat: this.user.address.latitude, lon: this.user.address.longitude}) 
                  // if (this.membre<5300000){
                  // this.membre = distanceTo({lat: data.address.latitude, lon:data.address.longitude}, {lat: this.user.address.latitude, lon: this.user.address.longitude}) 
                  this.doctor.push(data);
                  // console.log(data)
                  // }
                })
  
  
  
              });
  
            }
  
  
          });
  
        }).catch((err: any) => {
          console.log(err);
        })
  
      }
  
  
  
    async getAlltraitement() {
      this.traitementService.getAllTraitement().then((data: any) => {
        if (this.commande.specialite == "0") {
  
          this.traitements = data;
        }
      }).catch((err: any) => {
        console.log(err);
      })
  
    }
  
  
  
    async getUserById(id: string) {
      this.userService.getUserByID(id).then(user_ => {
        this.user = user_;
        console.log(this.user)
  
      });
    }
    async getUserByid(id: string) {
      this.userService.getUserByID(id).then(user_ => {
        this.trait = user_;
      });
    }
  
    async updateRdv(){
      var FullYear=  String(this.dateExacte.getFullYear())
      var Month   =  String(this.dateExacte.getMonth()+1).padStart(2, '0')
      var Day     =  String(this.dateExacte.getDate()).padStart(2, '0')
      var Hour    =  String(this.dateExacte.getHours()).padStart(2, '0')
      var Seconds =  String(this.dateExacte.getSeconds()).padStart(2, '0')
     
      var Hours = String(Hour + ':'+ Seconds)
      this.appointment={
        [FullYear]:{
          [Month]:{
            [Day]:{
              [Hours ]:{
                  id_traitement:this.traitement.id_trait,
              
              }
            }
          }
        }
        }
  
  
      this.appointementService.createAppointement(this.traitement.id_praticien,this.appointment)
    }
    async onUpdate() {
  
  
      this.traitement.rdv.time=(this.dateExacte.getTime())/86400000;
      this.traitement.rdv.date = this.dateExacte;
  
      if (this.currentFileUpload?.url) {
        this.user.photoURL = this.currentFileUpload?.url;
      }
      await this.updateRdv();
      await this.commandeService.update(this.commande.uid_cmd, this.commande);
      await this.traitementService.update(this.traitement.id_trait, this.traitement);
      if(this.traitement.id_praticien!=''){
        this.traitementService.UpdateMerge(this.traitement.id_trait).then( () => { console.log('done') } )
      }
    
      await this.userService.update(this.user.uid, this.user).then(() => {
        window.location.reload()
  
  
      });
  
      this.closeModal(),
        console.log("the details updated successfully");
    }
  
    // private getMedicalRecord(medicalRecordId: string) {
    //   this.userService.getMedicalRecord(medicalRecordId).then((res: any) => {
    //     this.userMedicalRecord=res[0];
    //   }).catch((err: any) => {
    //     console.log(err);
    //   })
  
    // }
  
    closeModal() {
       this.updateRdv();
       disableClose: true
  
      this.activeModal.close();
    }
  

}
