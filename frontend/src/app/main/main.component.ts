import { Component } from '@angular/core';
import { PredictionComponent } from './prediction/prediction.component';
import { DrawingCanvasComponent } from './drawing-canvas/drawing-canvas.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [PredictionComponent, DrawingCanvasComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {}
