import { Component, OnInit, Input } from '@angular/core';
import { ResultModel } from '../../Models/resultmodel';
import { ResultsServiceService } from '../../Services/results-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  @Input() results: ResultModel[];
  public text: string;
  public counter: number = 10;
  constructor(public resultservice: ResultsServiceService,
              public httpservice: HttpClient,) { }

  ngOnInit() {
    this.results = this.resultservice.resultsArray
  }

  /*
   * Searches in bing motor
   */
  public search(): void{
    //TO DO: Complete integration with backend
    this.httpservice.get('https://peaceful-woodland-53655.herokuapp.com/shmoogle/' + this.text).subscribe(
      response =>{
        this.results = response[0]
        console.log(response);
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
