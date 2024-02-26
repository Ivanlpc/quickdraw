import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-prediction',
  standalone: true,
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css'],
})
export class PredictionComponent implements OnInit {
  public predictions: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public chart: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.createChart();
    this.dataService.currentPredictions.subscribe({
      next: (newPreds) => {
        this.predictions = newPreds;
        this.chart.data.datasets[0].data = this.predictions;
        this.chart.update();
      },
    });
  }

  createChart() {
    this.chart = new Chart('Predictions', {
      type: 'doughnut',

      data: {
        labels: [
          'apple',
          'bird',
          'cat',
          'clock',
          'computer',
          'eyeglasses',
          'fish',
          'ice_cream',
          'moon',
          'tree',
        ],
        datasets: [
          {
            label: 'Prediction',
            data: this.predictions,
            backgroundColor: [
              'rgba(245, 39, 39, 0.8)',
              'rgba(254, 255, 131, 0.8)',
              'rgba(90, 90, 90, 0.8)',
              'rgba(255, 169, 99, 0.8)',
              'rgba(255, 127, 224, 0.8)',
              'rgba(127, 206, 255, 0.8)',
              'rgba(127, 168, 255, 0.8)',
              'rgba(80, 42, 42, 0.8)',
              'rgba(228, 228, 228, 0.8)',
              'rgba(135, 255, 129, 0.8)',
            ],
          },
        ],
      },
      options: {
        aspectRatio: 1.0,
      },
    });
  }
}
