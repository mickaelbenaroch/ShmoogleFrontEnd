import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResultModel } from '../../Models/resultmodel';
import { Router } from '@angular/router';
import { ResultsServiceService } from '../../Services/results-service.service';
import { GoogleAnalyticsEventsService } from '../../Services/analytics/analytic-sercice/analytic-sercice.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ErrorDialogBoxComponent } from '../error-dialog-box/error-dialog-box.component';

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
              public resultservice: ResultsServiceService,
              public analyticservice: GoogleAnalyticsEventsService,
              private dialog: MatDialog) { }

  public ngOnInit(): void {
  }
  //#endregion

  //#region  Public Methods
  public search(): void{
    this.analyticservice.emitEvent("ClickCategory", this.text , "ClickLabel", 1);
    this.httpservice.get('https://shmoogle.herokuapp.com/shmoogleShuffle/:' + this.text).subscribe(
      //this.httpservice.get('https://shmoogle.herokuapp.com/devRoute').subscribe(
    (response: ResultModel[]) =>{
        this.resultservice.resultsArray = response;
        console.log(response);
        this.navservice.navigateByUrl("results");
      },
      error =>{
        this.openDialog();
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
