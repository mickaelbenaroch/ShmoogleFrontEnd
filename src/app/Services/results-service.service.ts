import { Injectable } from '@angular/core';
import { ResultModel } from '../Models/resultmodel';

@Injectable()
export class ResultsServiceService {

  public resultsArray: ResultModel[];
  constructor() { }

}
