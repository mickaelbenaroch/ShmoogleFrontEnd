import { Component, OnInit, Input } from '@angular/core';
import { ResultModel } from '../../Models/resultmodel';
import { ResultsServiceService } from '../../Services/results-service.service';
import { HttpClient } from '@angular/common/http';
import { GoogleAnalyticsEventsService } from '../../Services/analytics/analytic-sercice/analytic-sercice.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  @Input() results: ResultModel[];
  public text: string;
  public counter: number = 0;
  constructor(public resultservice: ResultsServiceService,
              public httpservice: HttpClient,
              public analyticservice: GoogleAnalyticsEventsService,
              public navservice: Router) { }

  ngOnInit() {
    this.results = this.resultservice.resultsArray;
    if(this.resultservice.resultsArray !== undefined)
      this.counter = this.resultservice.resultsArray.length;
  }

  /*
   * Searches in bing motor
   */
  public search(): void{
    //appInsights.trackEvent("Added Item to Shopping Cart")
    this.analyticservice.emitEvent("ClickCategory", this.text, "ClickLabel", 1);
    this.httpservice.get('https://shmoogle.herokuapp.com/shmoogleShuffle/:'+ this.text).subscribe(
    //this.httpservice.get('https://shmoogle.herokuapp.com/devRoute').subscribe( 
    (response: ResultModel[]) =>{
        this.results = response;
        this.results[0].id
        console.log(response);
        this.counter = response.length;
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

    /**
     * Navigates to home page
     */
    public returnHome():void{
      this.navservice.navigateByUrl("/");
    }
  

}
