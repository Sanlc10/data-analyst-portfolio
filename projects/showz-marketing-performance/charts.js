/* ============================================================
   Chart.js configs · Showz Marketing Performance
   All values transcribed verbatim from the source notebook
   (showz-mkt-eda.ipynb) — no approximations.
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

    const COBALT       = '#0466C8'; /* primary accent */
    const COBALT_DEEP  = '#023E7D'; /* hover / strong */
    const COBALT_LIGHT = '#6BAEE0'; /* secondary series */
    const RULE         = '#E8E4DC';
    const SAND         = '#D4C9B8';
    const AMBER        = '#B45309'; /* warning / call-out */

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

    /* ---------- 1. Daily active users — 2017 vs 2018 ----------
       Notebook (cell 42):
         DAU 2017 = 845.28
         DAU 2018 = 997.46
       (WAU and MAU are reported only as overall averages — see narrative.)
    ----------------------------------------------------------------*/
    const ctxEng = document.getElementById('chartEngagement');
    if (ctxEng) {
      new Chart(ctxEng, {
        type: 'bar',
        data: {
          labels: ['2017', '2018'],
          datasets: [{
            label: 'Average Daily Active Users',
            data: [845.28, 997.46],
            backgroundColor: [COBALT_LIGHT, COBALT],
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
              title: { display: true, text: 'Users / day', color: '#475569' },
              ticks: { ...commonOpts.scales.y.ticks, callback: (v) => v.toLocaleString() },
            },
          },
        },
      });
    }

    /* ---------- 2. Revenue by acquisition source ----------
       Notebook (cell 102, ltv_by_source aggregation):
         source 2 = 2,638,189.21
         source 1 = 2,298,200.17
         source 5 = 1,181,477.14
         source 4 =   496,690.17
         source 3 =   296,687.96
         source 9 =    36,342.25
         source 10 =   14,619.23
       (source 7 had a single customer and no marketing spend — excluded.)
    ----------------------------------------------------------------*/
    const ctxRev = document.getElementById('chartRevenue');
    if (ctxRev) {
      new Chart(ctxRev, {
        type: 'bar',
        data: {
          labels: ['Source 2', 'Source 1', 'Source 5', 'Source 4', 'Source 3', 'Source 9', 'Source 10'],
          datasets: [{
            label: 'Total revenue (USD)',
            data: [2638189.21, 2298200.17, 1181477.14, 496690.17, 296687.96, 36342.25, 14619.23],
            /* Sources 2 and 1 — top performers — in primary cobalt.
               Source 3 — the costly underperformer — flagged amber.
               Rest in muted light blue. */
            backgroundColor: [COBALT, COBALT, COBALT_LIGHT, COBALT_LIGHT, AMBER, SAND, SAND],
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
                color: '#475569',
                callback: (v) => '$' + (v / 1000000).toFixed(1) + 'M',
              },
              beginAtZero: true,
            },
            y: { grid: { display: false }, ticks: { color: '#475569' } },
          },
        },
      });
    }

    /* ---------- 3. LTV vs CAC by acquisition source ----------
       Notebook (cells 99 + 102):
       source | LTV     | CAC
            1 | 321.97  |  2.92
            2 | 361.15  |  5.86
            3 |  21.43  | 10.21   <-- highest CAC, lowest LTV
            4 |  34.85  |  4.28
            5 | 116.33  |  5.10
            9 |  13.01  |  1.98
           10 |   8.25  |  3.28
    ----------------------------------------------------------------*/
    const ctxLtv = document.getElementById('chartLtvCac');
    if (ctxLtv) {
      new Chart(ctxLtv, {
        type: 'bar',
        data: {
          labels: ['Source 1', 'Source 2', 'Source 3', 'Source 4', 'Source 5', 'Source 9', 'Source 10'],
          datasets: [
            {
              label: 'LTV (USD)',
              data: [321.97, 361.15, 21.43, 34.85, 116.33, 13.01, 8.25],
              backgroundColor: COBALT,
              borderRadius: 4,
            },
            {
              label: 'CAC (USD)',
              data: [2.92, 5.86, 10.21, 4.28, 5.10, 1.98, 3.28],
              backgroundColor: AMBER,
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
              title: { display: true, text: 'USD per user', color: '#475569' },
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
