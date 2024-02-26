import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial predictions of all zeros', (done) => {
    service.currentPredictions.subscribe((predictions) => {
      expect(predictions.length).toBe(10);
      expect(predictions.every((val) => val === 0)).toBeTrue();
      done();
    });
  });

  it('should update predictions correctly', (done) => {
    const newPredictions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    service.updatePredictions(newPredictions);
    service.currentPredictions.subscribe((predictions) => {
      expect(predictions).toEqual(newPredictions);
      done();
    });
  });
});
