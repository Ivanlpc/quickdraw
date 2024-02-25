import { Component } from '@angular/core';
import { DrawingCanvasComponent } from './drawing-canvas/drawing-canvas.component';
import { FooterComponent } from './footer/footer.component';
import { PredictionComponent } from './prediction/prediction.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    DrawingCanvasComponent,
    FooterComponent,
    PredictionComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  predictions: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}
