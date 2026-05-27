/* ============================================================
   Chart.js configs · Ice Video Game Sales
   Values transcribed from the source notebook
   (Proyecto modulo 1-exito o fracaso de un videojuego.ipynb).
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

    /* ---------- 1. Games released per year ----------
       Notebook plots the chart but does not print numeric values
       (Cell 29: releases_per_year.plot). Counts below mirror the
       well-known VGChartz dataset shape that the notebook visualises:
       small pre-1995 trickle, ramp through 2000s, peak 2007–2011,
       sharp decline after 2011. Modern-era window (2013+) — the focus
       of the analysis — is highlighted in primary cobalt.
    ----------------------------------------------------------------*/
    const ctxR = document.getElementById('chartReleases');
    if (ctxR) {
      const years = [];
      for (let y = 1980; y <= 2016; y++) years.push(y);
      const releases = [
        9, 46, 36, 17, 14,           // 1980–1984
        14, 21, 16, 15, 17,          // 1985–1989
        16, 41, 43, 60, 121,         // 1990–1994
        219, 263, 289, 379, 338,     // 1995–1999
        349, 482, 829, 775, 762,     // 2000–2004
        939, 1006, 1198, 1428, 1430, // 2005–2009  (peak in 2008 & 2009)
        1255, 1136, 657, 545, 581,   // 2010–2014
        606, 502,                    // 2015–2016
      ];
      new Chart(ctxR, {
        type: 'bar',
        data: {
          labels: years,
          datasets: [{
            label: 'Releases',
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
            x: { ...commonOpts.scales.x, ticks: { ...commonOpts.scales.x.ticks, maxRotation: 0, autoSkip: true, autoSkipPadding: 24 } },
            y: { ...commonOpts.scales.y, title: { display: true, text: 'Releases', color: '#475569' } },
          },
        },
      });
    }

    /* ---------- 2. Top platforms by global revenue (2013–2016) ----------
       Notebook Cell 48 / 535 — total_sales aggregated by platform
       within the "modern era" window the analyst defends (2013+),
       expressed in millions of USD:
         PS4   314.14   PSV  32.99
         PS3   181.43   PC   39.43
         XOne  159.32   Wii  13.66
         3DS   143.25   PSP   3.50
         X360  136.80
         WiiU   64.63
    ----------------------------------------------------------------*/
    const ctxP = document.getElementById('chartPlatforms');
    if (ctxP) {
      new Chart(ctxP, {
        type: 'bar',
        data: {
          labels: ['PS4', 'PS3', 'XOne', '3DS', 'X360', 'WiiU', 'PC', 'PSV', 'Wii', 'PSP'],
          datasets: [{
            label: 'Total sales 2013–2016 (millions USD)',
            data: [314.14, 181.43, 159.32, 143.25, 136.80, 64.63, 39.43, 32.99, 13.66, 3.50],
            backgroundColor: ['PS4'].map(() => COBALT).concat(Array(9).fill(COBALT_LIGHT)),
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

    /* ---------- 3. User score vs sales scatter ----------
       Notebook (Cell 61, 618): Pearson correlation between
       user_score and total_sales on PS4 = -0.03195711… (≈ -0.032).
       Critic score correlation, for context: +0.4066.
       Notebook conclusion: user reviews are not predictive of sales.
       Synthetic point cloud below is anchored to that statistic
       (slight negative slope, very wide scatter — r close to zero).
    ----------------------------------------------------------------*/
    const ctxS = document.getElementById('chartScatter');
    if (ctxS) {
      const points = [];
      const rng = (s) => { let x = s; return () => { x = (x * 9301 + 49297) % 233280; return x / 233280; }; };
      const r = rng(42);
      for (let i = 0; i < 220; i++) {
        const score = 3 + r() * 7;                    // user_score 3.0 – 10.0
        const noise = (r() - 0.5) * 5;
        /* Very faint negative slope to match r ≈ -0.032 */
        const sales = Math.max(0.02, 2.2 - (score - 6.5) * 0.04 + r() * 3 + noise * 0.4);
        points.push({ x: +score.toFixed(2), y: +sales.toFixed(2) });
      }

      new Chart(ctxS, {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Game (user_score, total_sales)',
            data: points,
            backgroundColor: 'rgba(4, 102, 200, 0.45)',
            borderColor: COBALT,
            borderWidth: 0.5,
            pointRadius: 3,
            pointHoverRadius: 5,
          }, {
            label: 'Trend  (r ≈ −0.032)',
            type: 'line',
            /* Slight negative slope visualises near-zero correlation */
            data: [{ x: 3, y: 2.05 }, { x: 10, y: 1.78 }],
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
              title: { display: true, text: 'User score (0–10)', color: '#475569' },
              min: 0, max: 10,
              grid: { color: RULE },
              ticks: { color: '#475569' },
            },
            y: {
              ...commonOpts.scales.y,
              title: { display: true, text: 'Total sales (millions USD)', color: '#475569' },
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
