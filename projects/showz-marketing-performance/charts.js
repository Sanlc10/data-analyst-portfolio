/* ============================================================
   Chart.js configs · Showz Marketing Performance
   Values transcribed verbatim from showz-mkt-eda.ipynb.
   Palette: coral / peach / mint / ink (no cobalt).
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

    const CORAL      = '#FF6B47'; /* primary series */
    const CORAL_DEEP = '#E94F2A'; /* deeper accent */
    const PEACH      = '#FFCBA8'; /* secondary series */
    const PEACH_DEEP = '#FFB082';
    const MINT       = '#A0DEB6'; /* positive emphasis */
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

    /* ---------- 1. DAU 2017 vs 2018 ---------------------------------
       Notebook (cell 42): DAU 2017 = 845.28 · DAU 2018 = 997.46
    --------------------------------------------------------------*/
    const ctxEng = document.getElementById('chartEngagement');
    if (ctxEng) {
      new Chart(ctxEng, {
        type: 'bar',
        data: {
          labels: ['2017', '2018'],
          datasets: [{
            label: 'Average Daily Active Users',
            data: [845.28, 997.46],
            backgroundColor: [PEACH, CORAL],
            borderColor: INK,
            borderWidth: 1.5,
            borderRadius: 6,
            barPercentage: 0.55,
          }],
        },
        options: {
          ...commonOpts,
          plugins: { ...commonOpts.plugins, legend: { display: false } },
          scales: {
            x: commonOpts.scales.x,
            y: {
              ...commonOpts.scales.y,
              title: { display: true, text: 'Users / day', color: '#0F0F0F' },
              ticks: { ...commonOpts.scales.y.ticks, callback: (v) => v.toLocaleString() },
            },
          },
        },
      });
    }

    /* ---------- 2. Revenue by source --------------------------------
       Notebook (cell 102, ltv_by_source).
    --------------------------------------------------------------*/
    const ctxRev = document.getElementById('chartRevenue');
    if (ctxRev) {
      new Chart(ctxRev, {
        type: 'bar',
        data: {
          labels: ['Source 2', 'Source 1', 'Source 5', 'Source 4', 'Source 3', 'Source 9', 'Source 10'],
          datasets: [{
            label: 'Total revenue (USD)',
            data: [2638189.21, 2298200.17, 1181477.14, 496690.17, 296687.96, 36342.25, 14619.23],
            /* Sources 2 and 1 — top performers — coral.
               Source 3 — costly underperformer — deep coral call-out.
               Rest in peach/sand. */
            backgroundColor: [CORAL, CORAL, PEACH, PEACH, CORAL_DEEP, SAND, SAND],
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
              ticks: {
                color: '#595959',
                callback: (v) => '$' + (v / 1000000).toFixed(1) + 'M',
              },
              beginAtZero: true,
            },
            y: { grid: { display: false }, ticks: { color: '#0F0F0F', font: { weight: '600' } } },
          },
        },
      });
    }

    /* ---------- 3. LTV vs CAC by source -----------------------------
       Notebook (cells 99 + 102).
    --------------------------------------------------------------*/
    const ctxLtv = document.getElementById('chartLtvCac');
    if (ctxLtv) {
      new Chart(ctxLtv, {
        type: 'bar',
        data: {
          labels: ['Source 1', 'Source 2', 'Source 3', 'Source 4', 'Source 5', 'Source 9', 'Source 10'],
          datasets: [
            { label: 'LTV (USD)', data: [321.97, 361.15, 21.43, 34.85, 116.33, 13.01, 8.25], backgroundColor: MINT,       borderColor: INK, borderWidth: 1.5, borderRadius: 4 },
            { label: 'CAC (USD)', data: [2.92, 5.86, 10.21, 4.28, 5.10, 1.98, 3.28],          backgroundColor: CORAL_DEEP, borderColor: INK, borderWidth: 1.5, borderRadius: 4 },
          ],
        },
        options: {
          ...commonOpts,
          scales: {
            x: commonOpts.scales.x,
            y: {
              ...commonOpts.scales.y,
              title: { display: true, text: 'USD per user', color: '#0F0F0F' },
              ticks: { ...commonOpts.scales.y.ticks, callback: (v) => '$' + v },
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
