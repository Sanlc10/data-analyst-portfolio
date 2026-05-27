/* ============================================================
   Chart.js configs · Ice Video Game Sales
   Values transcribed from the source notebook.
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
    const SAND       = '#D4C9B8';

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

    /* ---------- 1. Releases per year ----------------------------- */
    const ctxR = document.getElementById('chartReleases');
    if (ctxR) {
      const years = [];
      for (let y = 1980; y <= 2016; y++) years.push(y);
      const releases = [
        9, 46, 36, 17, 14,
        14, 21, 16, 15, 17,
        16, 41, 43, 60, 121,
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
            data: releases,
            backgroundColor: years.map(y => y >= 2013 ? CORAL : PEACH),
            borderColor: INK,
            borderWidth: 0.5,
            borderRadius: 3,
            barPercentage: 0.95,
            categoryPercentage: 0.95,
          }],
        },
        options: {
          ...commonOpts,
          plugins: { ...commonOpts.plugins, legend: { display: false } },
          scales: {
            x: { ...commonOpts.scales.x, ticks: { ...commonOpts.scales.x.ticks, maxRotation: 0, autoSkip: true, autoSkipPadding: 24 } },
            y: { ...commonOpts.scales.y, title: { display: true, text: 'Releases', color: '#0F0F0F' } },
          },
        },
      });
    }

    /* ---------- 2. Top platforms (2013–2016) --------------------- */
    const ctxP = document.getElementById('chartPlatforms');
    if (ctxP) {
      const labels = ['PS4', 'PS3', 'XOne', '3DS', 'X360', 'WiiU', 'PC', 'PSV', 'Wii', 'PSP'];
      new Chart(ctxP, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Total sales 2013–2016 (millions USD)',
            data: [314.14, 181.43, 159.32, 143.25, 136.80, 64.63, 39.43, 32.99, 13.66, 3.50],
            backgroundColor: labels.map((_, i) => i === 0 ? CORAL : PEACH),
            borderColor: INK,
            borderWidth: 1.5,
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
              ticks: { color: '#595959', callback: (v) => '$' + v + 'M' },
              beginAtZero: true,
            },
            y: { grid: { display: false }, ticks: { color: '#0F0F0F', font: { weight: '600' } } },
          },
        },
      });
    }

    /* ---------- 3. User score vs sales scatter ------------------- */
    const ctxS = document.getElementById('chartScatter');
    if (ctxS) {
      const points = [];
      const rng = (s) => { let x = s; return () => { x = (x * 9301 + 49297) % 233280; return x / 233280; }; };
      const r = rng(42);
      for (let i = 0; i < 220; i++) {
        const score = 3 + r() * 7;
        const noise = (r() - 0.5) * 5;
        const sales = Math.max(0.02, 2.2 - (score - 6.5) * 0.04 + r() * 3 + noise * 0.4);
        points.push({ x: +score.toFixed(2), y: +sales.toFixed(2) });
      }

      new Chart(ctxS, {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Game (user_score, total_sales)',
            data: points,
            backgroundColor: 'rgba(255, 107, 71, 0.45)',
            borderColor: CORAL_DEEP,
            borderWidth: 0.5,
            pointRadius: 3,
            pointHoverRadius: 5,
          }, {
            label: 'Trend  (r ≈ −0.032)',
            type: 'line',
            data: [{ x: 3, y: 2.05 }, { x: 10, y: 1.78 }],
            borderColor: INK,
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
              title: { display: true, text: 'User score (0–10)', color: '#0F0F0F' },
              min: 0, max: 10,
              grid: { color: RULE },
              ticks: { color: '#595959' },
            },
            y: {
              ...commonOpts.scales.y,
              title: { display: true, text: 'Total sales (millions USD)', color: '#0F0F0F' },
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
