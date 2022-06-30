import { Component, OnInit } from '@angular/core';
import { CommandeServiceService } from "src/app/services/commandeService/commande-service.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SpecialiteService } from 'src/app/services/specialites/specialite.service';
import { Specialite } from 'src/app/models/specialite/specialite.module';
import { FormBuilder, FormControl} from '@angular/forms';
import { AuthService } from 'src/app/services/authService/auth.service';
import { User } from 'src/app/models/user/user.module';

import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userService/user.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TraitementService } from 'src/app/services/Traitement/traitement.service';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MatDateFormats, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
const moment = _rollupMoment || _moment;
import { PraticientService } from 'src/app/services/particientServ/particient.service';
import { threadId } from 'worker_threads';
import { AppointementsService } from 'src/app/services/appointement/appointements.service';
import { Praticien } from 'src/app/models/praticient/praticient.module';

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/

export const MY_FORMATS: MatDateFormats = {
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

@Component({
  selector: 'app-popup-create',
  templateUrl: './popup-create.component.html',
  styleUrls: ['./popup-create.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class PopupCreateComponent implements OnInit {
  date = new FormControl(moment());


  events: string[] = [];
  sexe: string;
  gender: string[] = ['Femme', 'Homme'];
  public medecin: User;
  public doctors: User[] = [];
  public doctor: User[] = [];
  public praticiens: Praticien[] = [];
  praticien: any;
  horaires: [{ '99:99': { 'reserved': true, 'taken': true } }]


  utilisateur = {
    uid: this.angularFireStore.createId(),
    firstName: '',
    lastName: '',

    email: '',
    phoneNumber: '',
    address: {
      city: '',
      latitude: 0.443,
      longitude: 0.333,
    },
    birthday:'',
    photoURL: '',
    sexe:'',
    roles: {
      user:true,
      client:true
    },
    position :{
      longitude:-5.6,
      latitude:35.5,

    }
  };

  commande: any = {
    categorie: '',
    // etat:[{ title: '' , updateTime: ''}],
    problem: '',
    serviceType: '',
    createTime: new Date(),


    specialite: '',
    description: '',
    files: [],
    uid_client: this.utilisateur.uid,


    uid_cmd: this.angularFireStore.createId(),
    etat: [{
      title: 'accepter',
      updateTime: new Date(),
    },
    {
     title:'en cours',
     updateTime:new Date(), 
    }  
  
  ]
  };

  traitement: any = {
    
    duration: '',
    id_cmd: this.commande.uid_cmd,
    id_praticien: '',
    id_trait: this.angularFireStore.createId(),
    payed: false,
    price: '',
    rdv: {
      // year: '',
      // month: '',
       day: '',
      // heure: ''
      hour:'',
      date:''
    },
    id_client:this.utilisateur.uid,
    etat:
    [{
      title: 'en attendre',
      updateTime: new Date(),
    },
    {
      title:'accepter',
      updateTime:new Date(),
    }

  

  ]
    ,
    begins_at: new Date(),
    ends_at: null,
  }

  appointment={
 
  }

  public hour: any
  submitted = false;
  time :any

  public specialites: Specialite[] = [];
  houres: string[];
  tmp: any
  data: any = [];
  heures: any = []
  trueHoures:any[]
  clock: any;
  message: string;
  timee:any
  constructor(public db: AngularFirestore,  private appointementService: AppointementsService, private formBuilder: FormBuilder, private traitementService: TraitementService, private commandeService: CommandeServiceService, private userService: UserService, private angularFireStore: AngularFirestore, public activeModal: NgbActiveModal, private specialiteServ: SpecialiteService, public authService: AuthService, private router: Router, private praticienService: PraticientService) { }
     async ngOnInit(): Promise<void> {
    await this.getAllSpecialite();
  }

  dateForm: any = this.formBuilder.group({
    dateOfRdv: '',

  });

  onclick(time:any){
  console.log(time)
  }

  async saveCommande(): Promise<void> {

    this.commandeService.createCommande(this.commande).then(() => {
      this.userService.createClient(this.utilisateur)
    }).then(() => {
      this.traitementService.createTraitement(this.traitement)
      this.appointementService.createAppointement(this.traitement.id_praticien,this.appointment)
      .then(() => {
        this.submitted = true;
      }
      )
     })
    .then(() => {
    console.log('Created new item successfully!'
    );
    this.submitted = true;
  }
  ).then(() => 
  window.location.reload()
  )
    
    this.saveAppointment(this.dateForm.value);

    this.dateForm.reset();


  }
  

  async newCommande(): Promise<void> {
    this.submitted = false;

  }

  cleanUser() {
    //cleaning
    this.utilisateur = {
      uid: '',
      firstName: '',
      lastName:"",
      email: '',
      phoneNumber: '',
      address: {
        city: '',
        latitude: 0.443,
        longitude: 0.333,
      },
      birthday:'',
      photoURL: '',
      sexe:'',
      roles: {
        user:true,
        client:true
      },
      position :{
        longitude:0.99,
        latitude:12,
  
      }
    }
    this.commande = {
      categorie: '',
      etat: [{ title: '', updateTime: '' }],
      problem: '',
      serviceType: '',
      files: [],

      specialite: '',
      description: '',

      id_spe: '',
      uid_client: '',

      id_traitement: '',

      uid_cmd: '',

    };
    this.traitement = {
      duration: '',
      id_cmd: '',
      id_praticien: '',
      id_trait: '',
      payed: false,
      price: '',
      rdv: {
        hour:'',
      //   year :  '',
      // month:  '',
       day:   '',
      date:'',
      time:''
    },
      etat:
      {
        name: '',
      }
      ,

    }
  }
  

  closeModal() {
    this.activeModal.close();
  }

  async getAllPraticien(serviceType: any, specialite: any) {
    this.praticiens = [];
    this.doctors = [];

    this.praticienService.getAllPraticien().then(async (data: any) => {

      this.praticiens = data;

      this.praticiens.forEach((data: any) => {

        // @ts-ignore
        if (data.serviceType?.find(e => e === serviceType) && data.specialite?.includes(specialite)) {
          this.userService.getUserByID(data.uid).then(user_ => {
            // console.log(user_)
            // @ts-ignore
            this.doctors.push(user_);
            this.doctor = [];

            this.doctors.filter(async (data: any) => {

              this.doctor.push(data);
              await this.saveHours(this.traitement.id_praticien ,this.hour)

              // }

            })



          });

        }


      });

    }).catch((err: any) => {
      console.log(err);
    })

  }



  async getAllSpecialite() {

    this.specialiteServ.getAllSpecial().then((data) => {
      // console.log(data)
      // @ts-ignore
      this.specialites = data;
    }).catch((err) => {
      console.log(err);
    })
  }

  

  saveAppointment(variable: any) {
    console.log(JSON.stringify(variable));
  }

  async saveHours(id: string,date:any) {
    // let dateOfRdv: Moment = this.dateForm.get('dateOfRdv').value;
      // console.log(dateOfRdv.toObject())
      console.log(this.date.value._d)
     var FullYear=  String(date.getFullYear())
     var Month   =  String(date.getMonth()+1).padStart(2, '0')
     var Day     =  String(date.getDate()).padStart(2, '0')
     var Hour   =  String(date.getHours()).padStart(2, '0')
     var Seconds =  String(date.getSeconds()).padStart(2, '0')
    var Hours = String(Hour + ':'+ Seconds)
    
    let dateRdvSeconds:any
    dateRdvSeconds=(date.getTime())/86400000;
      this.utilisateur.birthday=this.date.value._d
    this.traitement.rdv = {
      // year: String(dateOfRdv.toObject().years),
      // month: String(dateOfRdv.toObject().months + 1).padStart(2, '0'),
      //  day: String(dateOfRdv.toObject().date).padStart(2, '0'),
      hour:'',
      day:'',
      date: date,
      time: dateRdvSeconds ,
    }

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
    // this.appointementService.getappointmentByID(id).then((data: any) => {
    //   this.tmp = data[String(dateOfRdv.toObject().years)][String(dateOfRdv.toObject().months + 1).padStart(2, '0')][String(dateOfRdv.toObject().date).padStart(2, '0')]
    //  this.clock = this.tmp[hour].reserved

        // console.log(this.clock)


  //     if (id) {
  //       this.appointementService.clicReserver(id,  { 'hour.reserved' :'true' } )
  //       .then(() => {
  //         this.message = 'The status was updated successfully!';
  //       })
  //       .catch(err => console.log(err));
  //     }
  //   //  console.log(this.tmp)
  //     this.houres = Object.keys(this.tmp)
  //  //   console.log(this.houres)
  //     this.data = []
  //     this.heures = []
  //     this.trueHoures=[]
  //     this.houres.forEach((hour: any) => {
  //       this.data = this.tmp[hour]
  //       if (this.data.reserved != true && this.data.taken != true ) {
  //         this.heures.push(hour)
  //         return this.heures
  //       }else{
  //         this.trueHoures.push(hour)
  //       }
  //     }



  //     )



  //   }).catch((err) => {
  //     console.log(err);
  //   })
  }

 

}
