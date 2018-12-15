import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResultModel } from '../../Models/resultmodel';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  //#region Public Members
  @Input() numberResult: number = 3434;
  public text: string = "";
  public result: ResultModel[];
  //#endregion

  //#region Constructor + LideCycle Hooks
  constructor(public httpservice: HttpClient) { }
  //#endregion

  //#region  Public Methods
  public ngOnInit(): void {
  }
  //#endregion

  //#region  Private Methods
  //#endregion

  public search(): void{
    //TO DO: Complete integration with backend
    this.httpservice.get('https://peaceful-woodland-53655.herokuapp.com/shmoogle/' + this.text).subscribe(
      response =>{
        this.result = response[0];
        console.log(response);
      },
      error =>{
        console.log(error);
      })
    }

}
