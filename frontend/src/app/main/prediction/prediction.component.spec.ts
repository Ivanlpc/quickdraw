import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PredictionComponent } from './prediction.component';
import { DataService } from '../../data.service';
import { of } from 'rxjs';

jest.mock('chart.js/auto', () => ({
  Chart: jest.fn().mockImplementation(() => ({
    data: { datasets: [{ data: [] }] },
    update: jest.fn(),
  })),
}));

class MockDataService {
  currentPredictions = of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
}

describe('PredictionComponent', () => {
  let component: PredictionComponent;
  let fixture: ComponentFixture<PredictionComponent>;
  let mockDataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PredictionComponent],
      providers: [{ provide: DataService, useClass: MockDataService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionComponent);
    component = fixture.componentInstance;
    mockDataService = TestBed.inject(DataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize chart on ngOnInit', () => {
    expect(component.chart).toBeDefined();
    expect(component.chart.update).toHaveBeenCalledTimes(0);
  });

  it('should update chart data when predictions change', (done) => {
    mockDataService.currentPredictions.subscribe(() => {
      fixture.detectChanges();
      expect(component.predictions).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      expect(component.chart.data.datasets[0].data).toEqual([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      ]);
      expect(component.chart.update).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
