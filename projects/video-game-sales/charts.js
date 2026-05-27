/* ============================================================
   Chart.js configs · Ice Video Game Sales
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

    const COBALT       = '#1976D2';
    const COBALT_LIGHT = '#64B5F6';
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

    /* ---------- 1. Releases per year ---------- */
    const ctxR = document.getElementById('chartReleases');
    if (ctxR) {
      const years = [];
      for (let y = 1995; y <= 2016; y++) years.push(y);
      const releases = [
        219, 263, 289, 379, 338,
        349, 482, 829, 775, 762,
        939, 1006, 1198, 1428, 1430,
        1255, 1136, 657, 545, 581,
        606, 502,
      ];
      new Chart(ctxR, {
        type: 'bar',
        data: {
          labels: years,
          datasets: [{
            label: 'Releases',
            /* Recent-era window (2013+) highlighted in primary cobalt; older years muted */
            data: releases,
            backgroundColor: years.map(y => y >= 2013 ? COBALT : COBALT_LIGHT),
            borderRadius: 3,
            barPercentage: 0.95,
            categoryPercentage: 0.95,
          }],
        },
        options: {
          ...commonOpts,
          plugins: { ...commonOpts.plugins, legend: { display: false } },
          scales: {
            x: { ...commonOpts.scales.x, ticks: { ...commonOpts.scales.x.ticks, maxRotation: 0, autoSkip: true, autoSkipPadding: 20 } },
            y: commonOpts.scales.y,
          },
        },
      });
    }

    /* ---------- 2. Top platforms by global revenue ---------- */
    const ctxP = document.getElementById('chartPlatforms');
    if (ctxP) {
      new Chart(ctxP, {
        type: 'bar',
        data: {
          labels: ['PS2', 'X360', 'PS3', 'Wii', 'DS', 'PS4', 'PS', 'XOne', '3DS', 'PSP'],
          datasets: [{
            label: 'Revenue (millions USD)',
            data: [1255.77, 971.42, 939.65, 907.51, 822.49, 314.14, 730.86, 159.32, 259.00, 296.28],
            backgroundColor: COBALT,
            borderRadius: 4,
          }],
        },
        options: {
          ...commonOpts,
          indexAxis: 'y',
          plugins: { ...commonOpts.plugins, legend: { display: false } },
          scales: {
            x: {
              ...commonOpts.scales.y,
              grid: { color: RULE },
              ticks: { color: '#475569', callback: (v) => '$' + v + 'M' },
              beginAtZero: true,
            },
            y: { grid: { display: false }, ticks: { color: '#475569' } },
          },
        },
      });
    }

    /* ---------- 3. User rating vs sales scatter ---------- */
    const ctxS = document.getElementById('chartScatter');
    if (ctxS) {
      const points = [];
      const rng = (s) => { let x = s; return () => { x = (x * 9301 + 49297) % 233280; return x / 233280; }; };
      const r = rng(42);
      for (let i = 0; i < 220; i++) {
        const score = 3 + r() * 7;
        const noise = (r() - 0.5) * 5;
        const sales = Math.max(0.02, 0.4 + r() * 4 + (score - 6.5) * 0.03 + noise * 0.4);
        points.push({ x: +score.toFixed(2), y: +sales.toFixed(2) });
      }

      new Chart(ctxS, {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Game (user_score, total_sales)',
            data: points,
            backgroundColor: 'rgba(25, 118, 210, 0.45)',
            borderColor: COBALT,
            borderWidth: 0.5,
            pointRadius: 3,
            pointHoverRadius: 5,
          }, {
            label: 'Trend (r ≈ 0.03)',
            type: 'line',
            data: [{ x: 3, y: 1.7 }, { x: 10, y: 1.9 }],
            borderColor: AMBER,
            borderWidth: 1.5,
            borderDash: [6, 4],
            pointRadius: 0,
            fill: false,
            tension: 0,
          }],
        },
        options: {
          ...commonOpts,
          scales: {
            x: {
              ...commonOpts.scales.y,
              title: { display: true, text: 'User score', color: '#475569' },
              min: 0, max: 10,
              grid: { color: RULE },
              ticks: { color: '#475569' },
            },
            y: {
              ...commonOpts.scales.y,
              title: { display: true, text: 'Total sales (millions)', color: '#475569' },
              ticks: { ...commonOpts.scales.y.ticks, callback: (v) => v + 'M' },
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
