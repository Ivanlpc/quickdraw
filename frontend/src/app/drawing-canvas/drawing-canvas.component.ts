import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-drawing-canvas',
  standalone: true,
  templateUrl: './drawing-canvas.component.html',
  styleUrls: ['./drawing-canvas.component.css'],
})
export class DrawingCanvasComponent implements AfterViewInit {
  @ViewChild('drawingCanvas') myCanvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private model!: tf.LayersModel;
  drawing = false;

  constructor(private dataService: DataService) {}

  ngAfterViewInit(): void {
    if (!this.myCanvas) {
      console.error('Canvas element is not defined');
      return;
    }
    const context = this.myCanvas.nativeElement.getContext('2d');
    if (!context) {
      throw new Error('Failed to get the canvas context');
    }
    this.ctx = context;
    this.initializeCanvas();
    tf.loadLayersModel('/assets/model/model.json').then((model) => {
      this.model = model;
    });
  }
  initializeCanvas() {
    const canvas = document.getElementById(
      'drawingCanvas',
    )! as HTMLCanvasElement;

    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  getScale() {
    const rect = this.myCanvas.nativeElement.getBoundingClientRect();
    return {
      xScale: this.myCanvas.nativeElement.width / rect.width,
      yScale: this.myCanvas.nativeElement.height / rect.height,
    };
  }

  adjustCoordinatesTouch(event: TouchEvent) {
    const rect = this.myCanvas.nativeElement.getBoundingClientRect();
    const scale = this.getScale();
    return {
      x: (event.touches[0].clientX - rect.left) * scale.xScale,
      y: (event.touches[0].clientY - rect.top) * scale.yScale,
    };
  }
  adjustCoordinates(event: MouseEvent) {
    const rect = this.myCanvas.nativeElement.getBoundingClientRect();
    const scale = this.getScale();
    return {
      x: (event.clientX - rect.left) * scale.xScale,
      y: (event.clientY - rect.top) * scale.yScale,
    };
  }

  startDrawingTouch(event: TouchEvent) {
    event.preventDefault();
    this.drawing = true;
    this.ctx.beginPath();
    const { x, y } = this.adjustCoordinatesTouch(event);
    this.ctx.moveTo(x, y);
  }

  startDrawing(event: MouseEvent) {
    this.drawing = true;
    this.ctx.beginPath();
    const { x, y } = this.adjustCoordinates(event);
    this.ctx.moveTo(x, y);
  }

  drawTouch(event: TouchEvent) {
    event.preventDefault();
    if (!this.drawing) return;
    const { x, y } = this.adjustCoordinatesTouch(event);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }

  draw(event: MouseEvent) {
    if (!this.drawing) return;
    const { x, y } = this.adjustCoordinates(event);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }

  stopDrawing() {
    if (!this.drawing) return;
    this.drawing = false;
    this.ctx.closePath();
    this.processImage().then((predictions) => {
      if (predictions !== null) {
        this.sendPredictions(predictions);
      }
    });
  }

  clearCanvas() {
    this.initializeCanvas();
    this.sendPredictions([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }

  canvasToImage() {
    const image = new Image();
    image.src = this.myCanvas.nativeElement.toDataURL('image/png');
    return image;
  }

  async processImage() {
    if (this.model !== null) {
      let imgTensor = tf.browser.fromPixels(this.myCanvas.nativeElement, 1);
      imgTensor = tf.image.resizeBilinear(imgTensor, [256, 256]);
      imgTensor = imgTensor.div(255);
      imgTensor = imgTensor.expandDims(0);
      imgTensor.print();

      const prediction = this.model.predict(imgTensor) as tf.Tensor;
      const predictionArray = await prediction.data();
      const predictionArrayJs = Array.from(predictionArray);
      return predictionArrayJs.map((value) => {
        value = Math.round(value * 100);
        return value;
      });
    }
    return null;
  }

  sendPredictions(predictions: number[]) {
    this.dataService.updatePredictions(predictions);
  }
}
