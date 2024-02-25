import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private predictionsSource = new BehaviorSubject([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  currentPredictions = this.predictionsSource.asObservable();

  constructor() {}

  updatePredictions(newPreds: number[]) {
    this.predictionsSource.next(newPreds);
  }
}
