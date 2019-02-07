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
  success = false;
  replay = false;
  numbers: Object;

  constructor(private calculateService: CalculateService, private formBuilder: FormBuilder) 
  {
    this.messageForm = this.formBuilder.group({
      numOfPeople: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      numOfBulbs: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
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
      
      let people = this.messageForm.controls.numOfPeople.value;
      console.log(people);
      let bulbs = this.messageForm.controls.numOfBulbs.value;


      this.calculateService.calculateBulbs(people, bulbs)
      .subscribe
      (
        response=>
        {
          this.numbers = response;
          console.log(this.numbers);
          this.messageForm.disable();   
          this.replay = true;
          this.success = true;
          this.calculated = true;      
          
        }
      )
      
    }    
  }

  onCalculateAgain(){
    this.messageForm.enable();
    this.messageForm.reset();
    this.calculated = false; 
    this.success = false;
    this.replay = false;   
  }
}
