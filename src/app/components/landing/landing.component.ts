import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResultModel } from '../../Models/resultmodel';
import { Router } from '@angular/router';
import { ResultsServiceService } from '../../Services/results-service.service';
import { GoogleAnalyticsEventsService } from '../../Services/analytics/analytic-sercice/analytic-sercice.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ErrorDialogBoxComponent } from '../error-dialog-box/error-dialog-box.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { $ } from 'protractor';
import { PlatformLocation } from '@angular/common';
import { EmailModel } from '../../Models/EmailModel';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, OnDestroy{

  //#region Public Members
  @Input() numberResult: number = 3434;
  public text: string = "";
  public email: string = "";
  public error: boolean;
  public afterMail: boolean;
  public EmailModel: EmailModel = new EmailModel();
  public loader: boolean = false;
  //#endregion

  //#region Constructor + LideCycle Hooks
  constructor(public httpservice: HttpClient,
              public navservice: Router,
              public resultservice: ResultsServiceService,
              public analyticservice: GoogleAnalyticsEventsService,
              private dialog: MatDialog,
              private spinerservice: Ng4LoadingSpinnerService,
              private location: PlatformLocation) { 
                location.onPopState(() => {

                  console.log('pressed back!');
          
              });
              }

  public ngOnInit(): void {
    //var storage = localStorage.getItem('search');
    //if(storage !== undefined && storage !== null && storage !== ""){
    //    this.text = storage;
    //    this.search();
    //}
    setTimeout(()=>{
      var element =  document.getElementById("footer");
      if(element !== null){
        element.style.visibility = "visible";
        element.classList.add("animated");
        element.classList.add("bounceInUp");
      }
    },3000)
  }

  public ngOnDestroy(): void {
   //localStorage.clear();
  }

  //#endregion 

  //#region  Public Methods
  public search(): void{
    localStorage.setItem('search', this.text);
    this.loader = true;
    this.analyticservice.emitEvent("ClickCategory", this.text , "ClickLabel", 1);
    this.httpservice.get('https://bingsearchapiv1.azurewebsites.net/shmoogleShuffle/:' + this.text).subscribe(
      //this.httpservice.get('https://shmoogle.herokuapp.com/devRoute').subscribe(
    (response: ResultModel[]) =>{
        this.loader = false;
        this.resultservice.resultsArray = response;
        console.log(response);
        this.resultservice.text = this.text;
        //this.resultservice.landing = false;
        this.navservice.navigateByUrl("results");
      },
      error =>{
        this.loader = false;
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

    /**
     * Closes error dialog box
     */
    public CloseDialogError():void{
      this.dialog.closeAll();
    }

    /**
     * Send the email
     */
    public Send():void{
      if(this.validateEmail(this.email)){
        this.loader = true;
        var request = {
          "email": this.email
        }
        this.EmailModel.email = this.email;
        //send to backend
        this.httpservice.post("https://bingsearchapiv1.azurewebsites.net/shmoogleAddUser", request).subscribe((res)=>{
          console.log("email " + this.EmailModel);
          this.afterMail = true;
          this.loader = false;
          setTimeout(() => {
            var elem = document.getElementById("footer");
            elem.style.display = "none";
          },4000)
        },
        err =>{
          this.loader = false;
          this.openDialog();
          console.log(err);
        })
      }else{
        this.error = true;
      }
    }

    /**
     * Close email box
     */
    public CloseEmail():void{
      document.getElementById("footer").style.display = "none";
    }

    /**
     * Disable error on mail input
     * @param email 
     */
    public DisableError():void{
      if(this.error)
        this.error = false;
    }

    /**
     * Opens About us page
     * @param email 
     */
    public MoveToAboutUS(): void{
      //this.resultservice.aboutUs = true;
      this.navservice.navigateByUrl("aboutus");
    }
  //#endregion

  //#region Private Methods
  public validateEmail(email): boolean {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
  //#endregion

}
