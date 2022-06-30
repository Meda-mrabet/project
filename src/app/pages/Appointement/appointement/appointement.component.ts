import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { AppointementsService } from 'src/app/services/appointement/appointements.service';
import { Appointment } from 'src/app/models/appointement/appointement.module';
import { TraitementService } from 'src/app/services/Traitement/traitement.service';
import { Commande } from 'src/app/models/commande/commande.module';
import { User } from 'src/app/models/user/user.module';
import { Traitement } from 'src/app/models/traitement/traitement.module';
import { UserService } from 'src/app/services/userService/user.service';
import { CommandeServiceService } from 'src/app/services/commandeService/commande-service.service';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },

};

@Component({
  selector: 'app-appointement',
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './appointement.component.html',
  styleUrls: ['./appointement.component.css']
})
export class AppointementComponent  {
  selected: Date | null;
  public commandes: Commande[] = [];
  public users: User[] = [];
  public traitements: Traitement[] = [];
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  ELEMENT_DATA: any[]=[]

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[]=[] ;

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private appointementService:AppointementsService,private traitementService:TraitementService,private userService: UserService,

    private commandeService: CommandeServiceService,) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

async  ngOnInit(){
  this.getAllCommandes()
  }
  async getAllCommandes() {

  


    await this.traitementService.getAllTrait().then(async (trait_: any) => {

        for (let i = 0; i < trait_.length; i++) {
          this.getTraitementById(trait_[i].id_trait)
          this.getUserById(trait_[i].id_praticien)
          this.getCommandeById(trait_[i].id_cmd)

         
        }

      })

    
    .catch((err: any) => {
      console.log(err);
    })

}

async getUserById(id: string) {
this.users=[]
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
  this.commandes=[]

  this.commandeService.getAllCommandeCold(id).then((commande_: any) => {
    this.ELEMENT_DATA=[]
    this.commandes.push(commande_);

     for(let i=0 ;i<this.traitements.length;i++){

  let date=(new Date (this.traitements[i].rdv?.date?.toDate()))
      this.ELEMENT_DATA.push(
                  {
                    start: addHours(startOfDay(date), date.getHours()),
                    title: `Rendez-vous avec le Doctor  ` + this.users[i].lastName +' '+ this.users[i].firstName  ,
                    color: colors.yellow,
                    actions: this.actions,
                  }   )  
                         
    }
    this.events=this.ELEMENT_DATA

     
    });

  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
