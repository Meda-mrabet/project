import { AdvicesDetailsComponent } from './advices-details/advices-details.component';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService/auth.service';
import { CommandeServiceService } from "../../services/commandeService/commande-service.service";
import { User } from "../../models/user/user.module";
import { UserService } from "../../services/userService/user.service";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { TraitementService } from 'src/app/services/Traitement/traitement.service';
import { SpecialiteService } from 'src/app/services/specialites/specialite.service';
import { Specialite } from 'src/app/models/specialite/specialite.module';
import { Commande } from 'src/app/models/commande/commande.module';
import { PraticientService } from 'src/app/services/particientServ/particient.service';
import { Traitement } from 'src/app/models/traitement/traitement.module';
import datetimeDifference from 'datetime-difference';
import { FeedBackComponent } from '../feed-back/feed-back.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
export interface AllElement{
  No:number;
  nom:any;
  prenom:any;
  tel:any;
  problem:any;
  address:any;
  details:any;
  raiting:any
  badge: string;

  
}
@Component({
  selector: 'app-advices',
  templateUrl: './advices.component.html',
  styleUrls: ['./advices.component.css']
})
export class AdvicesComponent implements OnInit {
  public commandes: Commande[] = [];
  public specialities: Specialite[] = []
  public users: User[] = [];
  public traitements: Traitement[] = [];
  public hourstempsRest:any[]=[]
  public minutetempsRest:any[]=[]

  displayedColumns: string[] = ['No', 'nom', 'prenom', 'tel','problem','address','details','raiting'];
  dataSource:any
  ls: any ;
  ELEMENT_DATA: any[]=[]


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  len: any;




  constructor(private _liveAnnouncer: LiveAnnouncer,public dialog: MatDialog,config: NgbModalConfig, private authService: AuthService, private router: Router, private userService: UserService,

    private commandeService: CommandeServiceService, private modal: NgbModal, public traitementService: TraitementService, public specialiteService: SpecialiteService, public praticienService: PraticientService ) {
      config.backdrop = 'static';

      config.keyboard = false;


  }

  
  async ngOnInit() {


    await this.getAllCommandes();

  await this.UpdateEtat()


  }
  async UpdateEtat(){
    this.traitementService.updateEtat();
    this.traitementService.updateEtatContinue();


  }

dateNow:any=new Date();
dateSeconds=(this.dateNow.getTime()/86400000)
  async getAllCommandes() {

    this.commandeService.getCommandeAdvice().then(async (comm_: any) => {
      this.hourstempsRest=[]
      this.minutetempsRest=[]

      for (let i = 0; i < comm_.length; i++) {

        await this.traitementService.getAll(comm_[i].uid_cmd).then(async (trait_: any) => {

          for (let i = 0; i < trait_.length; i++) {
            this.getTraitementById(trait_[i].id_trait)
            this.getUserById(trait_[i].id_client)
            this.getCommandeById(trait_[i].id_cmd )
            console.log(trait_[i].etat?.[0].title)
            this.hourstempsRest .push(datetimeDifference(this.dateNow, trait_[i].rdv.date.toDate()).hours )
            this.minutetempsRest .push(datetimeDifference(this.dateNow, trait_[i].rdv.date.toDate()).minutes )
          }
        })

      }
    })
      .catch((err: any) => {
        console.log(err);
      })

  }


  detail(commande: any, traitement: any) {
    const modalRef = this.modal.open(AdvicesDetailsComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
    });
    modalRef.componentInstance.commandeInput = commande;
    modalRef.componentInstance.traitementInput = traitement;



  }


  async getUserById(id: string) {

    this.userService.getAllUsersByCmd(id).then((user_: any) => {

      this.users.push(user_);

    });
  }
  async getTraitementById(id: string) {


    this.traitementService.getTraitmentByID(id).then((traitement_: any) => {
      
      this.traitements.push(traitement_);




    });
  }
  async getCommandeById(id: string) {


    this.commandeService.getAllCommandeCold(id).then((commande_: any) => {
      this.ELEMENT_DATA=[]

      this.commandes.push(commande_);
      for(let i=0 ;i<this.traitements.length;i++){
        this.ls =this.commandes[i].etat?.length
        this.len=this.traitements[i].etat?.length,

        this.ELEMENT_DATA.push(
                    {
                      No:i+1,
                      nom:this.users[i]?.firstName,
                      prenom:this.users[i]?.lastName,
                      tel:this.users[i]?.phoneNumber,
                      problem:this.commandes[i].problem,
                      address:this.users[i].address?.city,
                      paiement:this.traitements[i].payed,
                      etat:this.commandes[i].etat?.[this.ls-1].title,
                      tempsRest: '  il rest  ' + (this.hourstempsRest[i]!=0 ? this.hourstempsRest[i] +' h ':'' ) + (this.minutetempsRest[i] !=0 ? this.minutetempsRest[i] +' min  ': ''),
                      details:'',
                      raiting:'',
                      badge: ((this.traitements[i].etat?.[this.len-1].title =='en attendre' ? 'badge-info' : (this.traitements[i].etat?.[this.len-1].title)=='terminer' ? 'badge-danger' : (this.traitements[i].etat?.[this.len-1].title)=='accepter' ? 'badge-success' : (this.traitements[i].etat?.[this.len-1].title)=='archiver' ? 'badge-warning' : (this.traitements[i].etat?.[this.len-1].title)=='en traitement' ? 'badge-warning' : 'badge-warning')),

                    }   )  
                           
      }
      console.log(this.ELEMENT_DATA)

       this.dataSource = new MatTableDataSource<AllElement>(this.ELEMENT_DATA)
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;



    });
  }


  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase()

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
  ;}

  async onUpdate(traite: any,commande:any) {

    await this.traitementService.lesArvchives()
    .then((r) => {
      this.router.navigate(['/archives']).then(() => {
      });
    })
  }

  async delete(traitmentId: any, commandeId: any) {
    this.commandeService.delete(traitmentId, commandeId).then(() =>
      window.location.reload()
    )
  }
  
  logout() {
    localStorage.setItem('isConnected', 'false');
    this.authService
      .logout()
      .then(() => this.router.navigate(['/login']))
      .then(() => {
        window.location.reload();
      })
      .catch((e) => console.log(e.message));
  }
  async feedBack(id_trait:any,id_praticien:any): Promise<void> {
    const dialogRef = this.dialog.open(FeedBackComponent,{
      width:'15%',
      height:'40%',
    })
    dialogRef.componentInstance.traitementIdInput = id_trait;
    dialogRef.componentInstance.praticienInput = id_praticien;
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log(`Dialog result: ${result}`);
    })
    dialogRef.disableClose = true;
  
   }

}

