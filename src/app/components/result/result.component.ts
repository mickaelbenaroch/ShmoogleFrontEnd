import { Component, OnInit, Input } from '@angular/core';
import { ResultModel } from '../../Models/resultmodel';
import { ResultsServiceService } from '../../Services/results-service.service';
import { HttpClient } from '@angular/common/http';
import { GoogleAnalyticsEventsService } from '../../Services/analytics/analytic-sercice/analytic-sercice.component';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ErrorDialogBoxComponent } from '../error-dialog-box/error-dialog-box.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  //#region Public Members
  @Input() results: ResultModel[];
  @Input() text: string;
  public counter: number = 0;
  //#endregion

  //#region Constructor & Lifecycle Hooks
  constructor(public resultservice: ResultsServiceService,
              public httpservice: HttpClient,
              public analyticservice: GoogleAnalyticsEventsService,
              public navservice: Router,
              private dialog: MatDialog,
              private spinerservice: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    // var storage = sessionStorage.getItem('search');
    // if(storage !== undefined && storage !== null && storage !== ""){
    //     this.text = storage;
    //     this.search();
    // }
    this.results = this.resultservice.resultsArray;
    if(this.resultservice.resultsArray !== undefined)
      this.counter = this.resultservice.resultsArray.length;

  }
  //#endregion

  //#region Public Members
  /*
   * Searches in bing motor
   */
  public search(): void{
    sessionStorage.setItem('search', this.text);
    this.spinerservice.show();
    this.analyticservice.emitEvent("ClickCategory", this.text, "ClickLabel", 1);
    this.httpservice.get('https://bingsearchapiv1.azurewebsites.net/shmoogleShuffle/:'+ this.text).subscribe(
    (response: ResultModel[]) =>{
      this.spinerservice.hide();
        this.results = response;
        this.results[0].id
        console.log(response);
        this.counter = response.length;
      },
      error =>{
        this.spinerservice.hide();
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

    /**
     * Navigates to home page
     */
    public returnHome():void{
      this.resultservice.landing = true;
    }

     /**
     * Opens the error dialog box
     */
    public openDialog(): void{
    
      const dialogConfig = new MatDialogConfig();
      dialogConfig.height = "500px";
      dialogConfig.width = "500px";
      dialogConfig.panelClass = "dialog";
      this.dialog.open(ErrorDialogBoxComponent, dialogConfig);
    }
    //#endregion
  

}
