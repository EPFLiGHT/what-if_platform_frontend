import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

// Definition of a Chart entity for the frontend
export class Chart {
  public y: Array<any> = [];
  public x: Array<any> = [];

  static readonly options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: 'index',
      position: 'nearest',
      callbacks: {
        labelColor: function (tooltipItem, chart) {
          return {
            backgroundColor:
              chart.data.datasets[tooltipItem.datasetIndex].borderColor,
          };
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
          },
          ticks: {
            maxTicksLimit: 30,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 10,
            stepSize: 0.25,
            max: 2,
          },
        },
      ],
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      },
    },
    legend: {
      display: true,
    },
  };

  static readonly colors: Array<any> = [
    {
      backgroundColor: 'transparent',
      // backgroundColor: hexToRgba(getStyle('--info'), 10),
      borderColor: getStyle('--primary'),
      pointHoverBackgroundColor: '#fff',
    },
    {
      backgroundColor: 'transparent',
      borderColor: getStyle('--success'),
      pointHoverBackgroundColor: '#fff',
    },
    {
      backgroundColor: hexToRgba(getStyle('--danger'), 10),
      borderColor: getStyle('--danger'),
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5],
    },
    {
      backgroundColor: 'transparent',
      borderColor: getStyle('--dark'),
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1
    },
  ];
  static readonly legend: boolean = true;
  static readonly type: string = 'line';
}
