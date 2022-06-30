import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService/auth.service';
import { UserService } from '../../services/userService/user.service';
import { User } from "../../models/user/user.module";
import { Roles } from '../../models/user/role.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

// import { emailVerified } from '@angular/fire/compat/auth-guard';
export interface AllElement {
  No: number;
  Nom: any;
  Prenom: any;
  Email: any;

  Role: any;
  Delete: any;
  badge: string;
  Edite:any;
}

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  
  public roles: Roles;
  public users: User[] = [];
  utilisateur = {
    uid: '',
    email: '',
    firstName: '',
    lastName: '',

    photoURL: '',
    emailVerified: true,
    roles: {
      user: true,
      client: false,
      admin: false,
      doc: false,
      nurse: false
    },
    address: {
      city: '',
      latitude: 0,
      longitude: 0
    },
    ville: '',
    codePostal: '',
    pays: '',
    position: {
      longitude: -11.22,
      latitude: 12.99
    },

  };
  displayedColumns: string[] = ['No', 'Nom', 'Prenom', 'Email', 'Role', 'Delete','Edite'];
  dataSource: any
  ls: any;

  ELEMENT_DATA: any[] = []

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer, public authService: AuthService, private router: Router,
    private userService: UserService) {
    //,private modal: NgbModal

  }

  async ngOnInit() {
    await this.getAll();
  }



  async getAll() {

    this.userService.getAllUsers().then((data: any) => {
      // @ts-ignore
      this.users = data;
      console.log(this.users)

      this.ELEMENT_DATA = []  

      data.forEach((data: any, i = 0) => {
        console.log(data)
        this.ELEMENT_DATA.push({
          No: i + 1,
          Nom: data.lastName,
          Prenom: data.firstName,
          Email: data.email,

          Role: (((data.roles?.admin) ? 'Admin' : (data.roles?.doc) ? 'Doctor' : (data.roles?.nurse) ? 'Nurse' : (data.roles?.client) ? 'Client' : (data.roles?.user) ? 'User' : '')),
          Delete: '',
          badge: (((data.roles?.admin) ? 'badge-danger' : (data.roles?.doc) ? 'badge-success' : (data.roles?.nurse) ? 'badge-info' : (data.roles?.client) ? 'badge-warning' : (data.roles?.user) ? 'badge-secondary' : '')),
          Edite:''
        })
        this.dataSource = new MatTableDataSource<AllElement>(this.ELEMENT_DATA)
      })
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }).catch((err) => {
      console.log(err);
    })
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
    ;
  }

  save() {
    if (this.utilisateur.uid!) {
      this.userService.update(this.utilisateur.uid,
        this.utilisateur).then(() => this.getAll());
      console.log("update old users");
    } else {
      try {
        this.create(this.utilisateur);
      } catch (e) {
        console.log(e);
      }
    }
    //cleaning
    this.cleanUser();
  }

  edit(u: any) {
    this.cleanUser();
    this.utilisateur = {
      ...u
    };

    console.log(this.utilisateur);
  }


  create(user: User): any {
    let data = { email: user.email!, password: "defaultpassword" };
    this.authService
      .register(data)
      .then((result) => {
        const tmpUser: User = this.authService.SetUserData(result.user);
        user.uid = tmpUser.uid;
        this.userService.creat(user).then(() => this.getAll());

      })

  }


  //show user data in update form
 
  cleanUser() {
    //cleaning
    this.utilisateur = {
      uid: '',
      email: '',
      firstName: '',
      lastName: '',

      photoURL: '',
      emailVerified: true,
      roles: {
        user: true,
        client: false,
        admin: false,
        doc: false,
        nurse: false
      },
      address: {
        city: '',
        latitude: 0,
        longitude: 0
      },
      pays: '',
      codePostal: '',
      ville: '',
      position: {
        longitude: -11.22,
        latitude: 12.99
      },
    }

  }


  delete(uid: any) {
    this.userService.delete(uid).then(() => {
      window.location.reload()


    });
  }



}
