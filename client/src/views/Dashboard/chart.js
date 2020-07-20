import palette from 'theme/palette';

export const data1 = {
  labels: [
    'Circunscripción #1',
    'Circunscripción #2',
    'Circunscripción #3',
    'Circunscripción #4',
    'Circunscripción #5',
    'Circunscripción #6',
    'Circunscripción #7',
    'Circunscripción #8',
    'Circunscripción #9',
    'Circunscripción #10'
  ],
  datasets: [
    {
      label: 'Días',
      backgroundColor: palette.primary.main,
      data: [5, 10, 21, 24, 31, 40, 51, 53, 70, 90]
    }
  ]
};

export const data2 = {
  labels: [
    'Circunscripción #1',
    'Circunscripción #2',
    'Circunscripción #3',
    'Circunscripción #4',
    'Circunscripción #5',
    'Circunscripción #6',
    'Circunscripción #7',
    'Circunscripción #8',
    'Circunscripción #9',
    'Circunscripción #10'
  ],
  datasets: [
    {
      label: 'Unidades',
      backgroundColor: palette.primary.main,
      data: [500, 419, 400, 390, 386, 350, 290, 280, 230, 100]
    }
  ]
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  legend: { display: false },
  cornerRadius: 20,
  tooltips: {
    enabled: true,
    mode: 'index',
    intersect: false,
    borderWidth: 1,
    borderColor: palette.divider,
    backgroundColor: palette.white,
    titleFontColor: palette.text.primary,
    bodyFontColor: palette.text.secondary,
    footerFontColor: palette.text.secondary
  },
  layout: { padding: 0 },
  scales: {
    xAxes: [
      {
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
        ticks: {
          fontColor: palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: palette.divider
        }
      }
    ]
  }
};
