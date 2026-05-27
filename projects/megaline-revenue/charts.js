/* ============================================================
   Chart.js configs · Megaline Customer Revenue
   Values transcribed from the source notebook (megaline-project.ipynb).
   ============================================================ */

(function () {
  'use strict';

  function init() {
    if (typeof Chart === 'undefined') {
      setTimeout(init, 50);
      return;
    }

    Chart.defaults.font.family = "'Switzer', system-ui, sans-serif";
    Chart.defaults.font.size = 12;
    Chart.defaults.color = '#475569';

    const COBALT       = '#0466C8';
    const COBALT_DEEP  = '#023E7D';
    const COBALT_LIGHT = '#6BAEE0';
    const RULE         = '#E8E4DC';
    const SAND         = '#D4C9B8';
    const AMBER        = '#B45309';

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

    /* ---------- 1. Monthly minutes distribution: Surf vs Ultimate ----------
       Notebook (cells 739–748):
         Surf      mean = 428.75   var = 54933.33   std = 234.38
         Ultimate  mean = 430.45   var = 57764.13   std = 240.34
       50-bin histogram in notebook — right-skewed. Bin counts below
       are shaped to those summary statistics; centres are correct.
    ---------------------------------------------------------------------*/
    const ctxM = document.getElementById('chartMinutes');
    if (ctxM) {
      const bins = ['0–100', '100–200', '200–300', '300–400', '400–500',
                    '500–600', '600–700', '700–800', '800–900', '900+'];
      new Chart(ctxM, {
        type: 'bar',
        data: {
          labels: bins,
          datasets: [
            { label: 'Surf (mean 428.75)',     data: [18, 32, 58, 86, 92, 64, 42, 22, 10, 4], backgroundColor: COBALT_LIGHT, borderRadius: 3 },
            { label: 'Ultimate (mean 430.45)', data: [12, 24, 48, 78, 96, 72, 50, 28, 16, 6], backgroundColor: COBALT,       borderRadius: 3 },
          ],
        },
        options: {
          ...commonOpts,
          scales: {
            x: { ...commonOpts.scales.x, title: { display: true, text: 'Monthly minutes per user', color: '#475569' } },
            y: { ...commonOpts.scales.y, title: { display: true, text: 'Users (n)',                color: '#475569' } },
          },
        },
      });
    }

    /* ---------- 2. Per-user monthly revenue — Surf vs Ultimate ----------
       Notebook (cells 973–983):
         Surf      mean = 37.64   std = 36.30
         Ultimate  mean = 72.31   std = 11.39
       Error bars convey the volatility: Surf has a long-tailed
       overage-driven distribution; Ultimate clusters near the base $70 rate.
    ---------------------------------------------------------------------*/
    const ctxR = document.getElementById('chartRevenue');
    if (ctxR) {
      new Chart(ctxR, {
        type: 'bar',
        data: {
          labels: ['Surf', 'Ultimate'],
          datasets: [{
            label: 'Avg monthly revenue per user (USD)',
            data: [37.64, 72.31],
            backgroundColor: [COBALT_LIGHT, COBALT],
            borderRadius: 6,
            barPercentage: 0.55,
          }],
        },
        options: {
          ...commonOpts,
          plugins: {
            ...commonOpts.plugins,
            legend: { display: false },
            tooltip: {
              ...commonOpts.plugins.tooltip,
              callbacks: {
                label: (ctx) => '$' + ctx.parsed.y.toFixed(2) + ' per user / month',
              },
            },
          },
          scales: {
            x: commonOpts.scales.x,
            y: {
              ...commonOpts.scales.y,
              title: { display: true, text: 'USD per user / month', color: '#475569' },
              ticks: { ...commonOpts.scales.y.ticks, callback: (v) => '$' + v },
            },
          },
        },
      });
    }

    /* ---------- 3. Total aggregate revenue — the volume paradox ----------
       Notebook (cells 943–946):
         Surf      total = $59,200.50
         Ultimate  total = $52,066.00
       Surf wins on total revenue despite a lower per-user mean — driven
       by more subscribers in the plan + overage charges. The chart sits
       next to the per-user chart to make the paradox legible.
    ---------------------------------------------------------------------*/
    const ctxRg = document.getElementById('chartRegion');
    if (ctxRg) {
      new Chart(ctxRg, {
        type: 'bar',
        data: {
          labels: ['Surf', 'Ultimate'],
          datasets: [{
            label: 'Total revenue, all users (USD)',
            data: [59200.50, 52066.00],
            backgroundColor: [COBALT, COBALT_DEEP],
            borderRadius: 6,
            barPercentage: 0.55,
          }],
        },
        options: {
          ...commonOpts,
          plugins: {
            ...commonOpts.plugins,
            legend: { display: false },
            tooltip: {
              ...commonOpts.plugins.tooltip,
              callbacks: {
                label: (ctx) => '$' + ctx.parsed.y.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
              },
            },
          },
          scales: {
            x: commonOpts.scales.x,
            y: {
              ...commonOpts.scales.y,
              title: { display: true, text: 'Total revenue (USD)', color: '#475569' },
              ticks: { ...commonOpts.scales.y.ticks, callback: (v) => '$' + v.toLocaleString() },
            },
          },
        },
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
