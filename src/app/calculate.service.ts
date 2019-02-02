import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CalculateService {

  constructor(private http: HttpClient) { }
 
  calculateBulbs(numOfPeople:any, numOfBulbs:any) {
    const url = "http://localhost:52749/api/bulbs";
    return this.http.get(url + "/" + numOfPeople + "/" + numOfBulbs)
  }

}
