import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FeedBack } from 'src/app/models/feed-back/feed-back.module';
import { FeedBackService } from 'src/app/services/feedBack/feed-back.service';

@Component({
  selector: 'app-feed-back',
  templateUrl: './feed-back.component.html',
  styleUrls: ['./feed-back.component.css']
})
export class FeedBackComponent  {
  feedback:any
  @Input() traitementIdInput:any
  @Input() praticienInput:any
  id_trait:any
  id_praticien:any
  feedBack :any = {

    id_feedBack :this.angularFireStore.createId(),
    id_traitement:'',
    id_praticien:'',
    rating:1,
    avis_patient:'',
    avis_praticien:'',
    creat_at:new Date(),


  }
  constructor(private fb: FormBuilder,private angularFireStore:AngularFirestore,private feedBackService:FeedBackService){
    this.rating3 = 0;
    this.form = this.fb.group({
      rating: ['', Validators.required],
      avis_patient: [''],
      avis_praticien: ['']

    })
  }
   
  async ngOnInit(): Promise<void> {

  this.getFeedBckbYiD()
  }


  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: any;

   

  public form: FormGroup;
  rating3: number;


async save(){
  if (this.traitementIdInput && this.traitementIdInput) {

    this.feedBack.id_traitement = this.traitementIdInput
    this.feedBack.id_praticien = this.praticienInput
    console.log(this.traitementIdInput,this.praticienInput )
  }
  this.feedBack.rating =this.form.value.rating
  this.feedBack.avis_patient =this.form.value.avis_patient
  this.feedBack.avis_praticien =this.form.value.avis_praticien

  console.log(this.traitementIdInput,this.form.value.rating)

  this.feedBackService.creat(this.feedBack).then(()=>{
    console.log('success')
  })
}

getFeedBckbYiD(){
  
this.feedBackService.getfeedBackByID(this.traitementIdInput).then((data)=>{
  if(data!=[]){

    this.feedback = data
    console.log(this.feedBack)

  }
})



}

}
