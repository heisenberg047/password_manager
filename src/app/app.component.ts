import { Component } from '@angular/core';
import { FormControl , FormBuilder , FormGroup  } from '@angular/forms';
import { PassServiceService } from './pass-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'password_manager';
  f1:any//formGroup declaration
  f2:any
  f3:any

  constructor(private fb: FormBuilder ,
    private service:PassServiceService) { }

  ngOnInit(): void {//main
    this.createForm()
  }

  createForm(){
    this.f1=this.fb.group({
      domainName:[''],
      password:[''],
   }),
   this.f2=this.fb.group({
    domainName:[''],
    password:[''],
  }),
  this.f3=this.fb.group({
    dName:[''],
  });
  }
//savedetails:

async saveDetails(){//after clicking on submit button,this func would b called.
  if(this.f1.valid){
    console.log("SAVE Success")
    console.log('inside component') //our ref

    let param1={ //objection creation form f1[saveDeatils]
    domainName:this. f1.get('domainName').value ,
    password:this.f1.get('password').value,
  };
    console.log(param1);
    let result=await this.service.saveDetails(param1)
    console.log(result)
  } }
async updateDetails(){
  if(this.f2.valid){
    console.log("SAVE Success")
    console.log('inside update component') //our ref

    let param2={ //objection creation form f1[saveDeatils]
    domainName:this.f2.get('domainName').value ,
    password:this.f2.get('password').value,
  };
    console.log(param2);
    let result=await this.service.updateDetails(param2)
    console.log(result)
  }
}
async delDetails(){
  if(this.f3.valid){
    console.log("SAVE Success")
    console.log('inside update component') //our ref

    let param3={ //objection creation form f1[saveDeatils]
    dName:this.f3.get('dName').value 
  };
    console.log(param3);
    let result=await this.service.delDetails(param3)
    console.log(result)
  }
}


}
