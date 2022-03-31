'use strict';
// 圖片
// 周星星：https://randomuser.me/api/portraits/men/3.jpg
// 王進：https://randomuser.me/api/portraits/men/19.jpg
// 唐伯虎：https://randomuser.me/api/portraits/men/4.jpg
// 光頭王：https://randomuser.me/api/portraits/men/5.jpg
(async function getData() {
  try {
    const res = await axios.get(
      'https://hexschool.github.io/escape-vote/vote.json'
    );
    const vote = [
      {
        name: '周星星',
        sum: 0,
      },
      {
        name: '王進',
        sum: 0,
      },
      {
        name: '唐伯虎',
        sum: 0,
      },
      {
        name: '光頭王',
        sum: 0,
      },
    ];

    res.data.forEach((item) => {
      vote.forEach((value) => {
        value.sum += item[value.name];
      });
    });
    chart(vote);
  } catch (err) {
    console.log(err);
  }
})();

function chart(vote) {
  const images = [
    'https://randomuser.me/api/portraits/men/3.jpg',
    'https://randomuser.me/api/portraits/men/19.jpg',
    'https://randomuser.me/api/portraits/men/4.jpg',
    'https://randomuser.me/api/portraits/men/5.jpg',
  ];
  new Chart(document.getElementById('myChart'), {
    type: 'bar',
    plugins: [
      {
        afterDraw: (chart) => {
          const ctx = chart.chart.ctx;
          const xAxis = chart.scales['x-axis-0'];
          const yAxis = chart.scales['y-axis-0'];
          xAxis.ticks.forEach((value, index) => {
            const x = xAxis.getPixelForTick(index);
            const image = new Image();
            (image.src = images[index]),
              ctx.drawImage(image, x - 65, yAxis.bottom + 20);
          });
        },
      },
    ],

    data: {
      labels: [vote[0].name, vote[1].name, vote[2].name, vote[3].name],
      datasets: [
        {
          label: '大港市議員競選投票結果',
          data: [vote[0].sum, vote[1].sum, vote[2].sum, vote[3].sum],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      legend: {
        display: true,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              padding: 140,
            },
          },
        ],
      },
    },
  });
}
