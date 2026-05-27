/* ============================================================
   Chart.js configs · Showz Marketing Performance
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof Chart === 'undefined') return;

  /* Global theme — applied to all charts on the page */
  Chart.defaults.font.family = "'Switzer', system-ui, sans-serif";
  Chart.defaults.font.size = 12;
  Chart.defaults.color = '#475569';

  const COBALT = '#1E3A5F';
  const COBALT_LIGHT = '#5A7CA1';
  const RULE = '#E8E4DC';
  const SAND = '#D4C9B8';

  const commonOpts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: { family: "'Switzer', sans-serif", size: 12, weight: '500' },
          color: '#475569',
          padding: 18,
          usePointStyle: true,
          pointStyle: 'rect',
        },
      },
      tooltip: {
        backgroundColor: '#FAF8F3',
        titleColor: '#171717',
        bodyColor: '#475569',
        borderColor: COBALT,
        borderWidth: 1,
        padding: 12,
        titleFont: { family: "'Fraunces', serif", weight: '500', size: 13 },
        bodyFont: { family: "'Switzer', sans-serif", size: 12 },
        boxPadding: 6,
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#475569' } },
      y: { grid: { color: RULE }, ticks: { color: '#475569' }, beginAtZero: true },
    },
  };

  /* ---------- 1. Engagement: DAU, WAU, MAU (2017 vs 2018) ---------- */
  const ctxEng = document.getElementById('chartEngagement');
  if (ctxEng) {
    new Chart(ctxEng, {
      type: 'bar',
      data: {
        labels: ['DAU', 'WAU', 'MAU'],
        datasets: [
          {
            label: '2017',
            data: [867, 5340, 21500],
            backgroundColor: COBALT_LIGHT,
            borderRadius: 4,
            barPercentage: 0.65,
          },
          {
            label: '2018',
            data: [949, 6092, 24956],
            backgroundColor: COBALT,
            borderRadius: 4,
            barPercentage: 0.65,
          },
        ],
      },
      options: {
        ...commonOpts,
        scales: {
          x: commonOpts.scales.x,
          y: {
            ...commonOpts.scales.y,
            ticks: { ...commonOpts.scales.y.ticks, callback: (v) => v.toLocaleString() },
          },
        },
      },
    });
  }

  /* ---------- 2. Revenue by marketing channel ---------- */
  const ctxRev = document.getElementById('chartRevenue');
  if (ctxRev) {
    new Chart(ctxRev, {
      type: 'bar',
      data: {
        labels: ['Channel 1', 'Channel 2', 'Channel 3', 'Channel 4', 'Channel 5', 'Channel 9', 'Channel 10'],
        datasets: [{
          label: 'Revenue (USD)',
          data: [785000, 642000, 478000, 312000, 198000, 142000, 88000],
          backgroundColor: [COBALT, COBALT, '#B45309', COBALT_LIGHT, COBALT_LIGHT, SAND, SAND],
          borderRadius: 4,
        }],
      },
      options: {
        ...commonOpts,
        indexAxis: 'y',
        plugins: {
          ...commonOpts.plugins,
          legend: { display: false },
        },
        scales: {
          x: {
            ...commonOpts.scales.y,
            grid: { color: RULE },
            ticks: { color: '#475569', callback: (v) => '$' + (v / 1000) + 'k' },
            beginAtZero: true,
          },
          y: { grid: { display: false }, ticks: { color: '#475569' } },
        },
      },
    });
  }

  /* ---------- 3. LTV vs CAC by source ---------- */
  const ctxLtv = document.getElementById('chartLtvCac');
  if (ctxLtv) {
    new Chart(ctxLtv, {
      type: 'bar',
      data: {
        labels: ['Channel 1', 'Channel 2', 'Channel 3', 'Channel 4', 'Channel 5'],
        datasets: [
          {
            label: 'LTV',
            data: [12.4, 11.8, 4.2, 8.6, 7.1],
            backgroundColor: COBALT,
            borderRadius: 4,
          },
          {
            label: 'CAC',
            data: [4.8, 5.2, 9.5, 5.9, 6.4],
            backgroundColor: '#B45309',
            borderRadius: 4,
          },
        ],
      },
      options: {
        ...commonOpts,
        scales: {
          x: commonOpts.scales.x,
          y: {
            ...commonOpts.scales.y,
            ticks: { ...commonOpts.scales.y.ticks, callback: (v) => '$' + v.toFixed(0) },
          },
        },
      },
    });
  }
});
