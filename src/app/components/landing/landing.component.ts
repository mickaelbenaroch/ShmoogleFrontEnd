import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResultModel } from '../../Models/resultmodel';
import { Router } from '@angular/router';
import { ResultsServiceService } from '../../Services/results-service.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  //#region Public Members
  @Input() numberResult: number = 3434;
  public text: string = "";
  //#endregion

  //#region Constructor + LideCycle Hooks
  constructor(public httpservice: HttpClient,
              public navservice: Router,
              public resultservice: ResultsServiceService) { }
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
        this.resultservice.resultsArray = response[0]
        console.log(response);
        this.navservice.navigateByUrl("results");
      },
      error =>{
        console.log(error);
      })
    }

    /**
     * Checks if the button enter was pressed
     * @param e 
     */
    public CheckEnterKey(e){
      if(e.keyCode == 13){
        this.search();
      }else{
        return;
      }
    }
}
