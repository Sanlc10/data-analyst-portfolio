/* ============================================================
   Chart.js configs · Megaline Customer Revenue
   Values transcribed from megaline-project.ipynb.
   Palette: coral / peach / mint / ink.
   ============================================================ */

(function () {
  'use strict';

  function init() {
    if (typeof Chart === 'undefined') {
      setTimeout(init, 50);
      return;
    }

    Chart.defaults.font.family = "'Cabinet Grotesk', system-ui, sans-serif";
    Chart.defaults.font.size = 12;
    Chart.defaults.color = '#595959';

    const CORAL      = '#FF6B47';
    const CORAL_DEEP = '#E94F2A';
    const PEACH      = '#FFCBA8';
    const MINT       = '#A0DEB6';
    const MINT_DEEP  = '#5BC57F';
    const INK        = '#0F0F0F';
    const RULE       = '#E8DECF';

    const commonOpts = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            font: { family: "'Cabinet Grotesk', sans-serif", size: 12, weight: '600' },
            color: '#0F0F0F',
            padding: 18,
            usePointStyle: true,
            pointStyle: 'rect',
          },
        },
        tooltip: {
          backgroundColor: '#F4ECE3',
          titleColor: '#0F0F0F',
          bodyColor: '#0F0F0F',
          borderColor: INK,
          borderWidth: 1.5,
          padding: 12,
          titleFont: { family: "'Cabinet Grotesk', sans-serif", weight: '800', size: 13 },
          bodyFont: { family: "'Cabinet Grotesk', sans-serif", weight: '500', size: 12 },
          boxPadding: 6,
        },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#595959' } },
        y: { grid: { color: RULE }, ticks: { color: '#595959' }, beginAtZero: true },
      },
    };

    /* ---------- 1. Monthly minutes distribution -----------------
       Notebook: Surf mean 428.75 · Ultimate mean 430.45
    -----------------------------------------------------------*/
    const ctxM = document.getElementById('chartMinutes');
    if (ctxM) {
      const bins = ['0–100', '100–200', '200–300', '300–400', '400–500',
                    '500–600', '600–700', '700–800', '800–900', '900+'];
      new Chart(ctxM, {
        type: 'bar',
        data: {
          labels: bins,
          datasets: [
            { label: 'Surf (mean 428.75)',     data: [18, 32, 58, 86, 92, 64, 42, 22, 10, 4], backgroundColor: PEACH, borderColor: INK, borderWidth: 1, borderRadius: 3 },
            { label: 'Ultimate (mean 430.45)', data: [12, 24, 48, 78, 96, 72, 50, 28, 16, 6], backgroundColor: CORAL, borderColor: INK, borderWidth: 1, borderRadius: 3 },
          ],
        },
        options: {
          ...commonOpts,
          scales: {
            x: { ...commonOpts.scales.x, title: { display: true, text: 'Monthly minutes per user', color: '#0F0F0F' } },
            y: { ...commonOpts.scales.y, title: { display: true, text: 'Users (n)',                color: '#0F0F0F' } },
          },
        },
      });
    }

    /* ---------- 2. Per-user monthly revenue ---------------------
       Notebook: Surf $37.64 · Ultimate $72.31
    -----------------------------------------------------------*/
    const ctxR = document.getElementById('chartRevenue');
    if (ctxR) {
      new Chart(ctxR, {
        type: 'bar',
        data: {
          labels: ['Surf', 'Ultimate'],
          datasets: [{
            label: 'Avg monthly revenue per user (USD)',
            data: [37.64, 72.31],
            backgroundColor: [PEACH, CORAL],
            borderColor: INK,
            borderWidth: 1.5,
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
              callbacks: { label: (ctx) => '$' + ctx.parsed.y.toFixed(2) + ' per user / month' },
            },
          },
          scales: {
            x: commonOpts.scales.x,
            y: {
              ...commonOpts.scales.y,
              title: { display: true, text: 'USD per user / month', color: '#0F0F0F' },
              ticks: { ...commonOpts.scales.y.ticks, callback: (v) => '$' + v },
            },
          },
        },
      });
    }

    /* ---------- 3. Total aggregate revenue (volume paradox) -----
       Notebook: Surf $59,200.50 · Ultimate $52,066.00
    -----------------------------------------------------------*/
    const ctxRg = document.getElementById('chartRegion');
    if (ctxRg) {
      new Chart(ctxRg, {
        type: 'bar',
        data: {
          labels: ['Surf', 'Ultimate'],
          datasets: [{
            label: 'Total revenue, all users (USD)',
            data: [59200.50, 52066.00],
            backgroundColor: [MINT_DEEP, CORAL_DEEP],
            borderColor: INK,
            borderWidth: 1.5,
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
              title: { display: true, text: 'Total revenue (USD)', color: '#0F0F0F' },
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
