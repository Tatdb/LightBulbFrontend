import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalculateService } from 'src/app/calculate.service';

@Component({
  selector: 'app-userinterface',
  templateUrl: './userinterface.component.html',
  styleUrls: ['./userinterface.component.css']
})
export class UserinterfaceComponent implements OnInit {
  messageForm: FormGroup;
  calculated = false;
  replay = false;
  bulbNumbers: Object;

  constructor(private calculateService: CalculateService, private formBuilder: FormBuilder) 
  {
    this.messageForm = this.formBuilder.group({
      numOfPeople: ['', Validators.required],
      numOfBulbs: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    this.calculated = true;
    if (this.messageForm.invalid){
      return;
    }

    if (this.messageForm.valid){
      
      //let form = JSON.stringify(this.messageForm.value);
      let people = this.messageForm.controls.numOfPeople.value;
      console.log(people);
      let bulbs = this.messageForm.controls.numOfBulbs.value;


      this.calculateService.calculateBulbs(people, bulbs)
      .subscribe
      (
        response=>
        {
          this.bulbNumbers = response;
          console.log(this.bulbNumbers);
          this.messageForm.disable();   
          this.replay = true;      
          
        }
      )
      
    }    
  }

  onCalculateAgain(){
    this.messageForm.enable();
    this.calculated = false; 
    this.replay = false;   
  }
}
