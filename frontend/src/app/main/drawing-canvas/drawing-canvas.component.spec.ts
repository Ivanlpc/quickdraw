import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrawingCanvasComponent } from './drawing-canvas.component';
import { DataService } from '../../data.service';
import * as tf from '@tensorflow/tfjs';

// Mock de TensorFlow.js
jest.mock('@tensorflow/tfjs', () => ({
  loadLayersModel: jest.fn().mockResolvedValue({
    predict: jest.fn().mockReturnValue({
      data: jest
        .fn()
        .mockResolvedValue([0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]),
      dispose: jest.fn(),
    }),
  }),
  browser: {
    fromPixels: jest.fn().mockReturnValue({
      div: jest.fn().mockReturnThis(),
      expandDims: jest.fn().mockReturnThis(),
      resizeBilinear: jest.fn().mockReturnThis(),
    }),
  },
}));

// Mock del DataService
class MockDataService {
  updatePredictions = jest.fn();
}

describe('DrawingCanvasComponent', () => {
  let component: DrawingCanvasComponent;
  let fixture: ComponentFixture<DrawingCanvasComponent>;
  let mockDataService: MockDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DrawingCanvasComponent],
      providers: [{ provide: DataService, useClass: MockDataService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingCanvasComponent);
    component = fixture.componentInstance;
    mockDataService = TestBed.inject(DataService) as unknown as MockDataService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize canvas and load model', (done) => {
    setTimeout(() => {
      expect(component.myCanvas).toBeDefined();
      expect(tf.loadLayersModel).toHaveBeenCalled();
      done();
    }, 500);
  });

  it('should process image and send predictions', async () => {
    component.model = await tf.loadLayersModel('/assets/model/model.json');
    await component.processImage();
    expect(mockDataService.updatePredictions).toHaveBeenCalled();
  });
});
