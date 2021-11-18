import { ChartOptions } from 'chart.js';

export class BarChart {
  public y: [{ data: Array<any> }] = [{ data: [] }];
  public x: Array<any> = [];

  static colors: [{ backgroundColor: any }] = [
    {
      backgroundColor: '#000000',
    },
  ];

  static readonly options: ChartOptions = {
    responsive: true,
    scales: {
      type: 'linear',
      xAxes: [
        {
          display: true,
          ticks: {
            beginAtZero: true, // minimum value will be 0.
          },
        },
      ],
    },
  };

  static readonly type: string = 'horizontalBar';
  static readonly legend: boolean = false;
  static readonly height: number = 100;
}
