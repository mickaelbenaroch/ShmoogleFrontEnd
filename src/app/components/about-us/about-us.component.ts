import { Component, OnInit } from '@angular/core';
import { ResultsServiceService } from '../../Services/results-service.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor(private resultservice: ResultsServiceService) { }

  ngOnInit() {
  }

  /**
   * Goes back
   */
  public GoBack():void{
    this.resultservice.aboutUs = false;
  }
}
