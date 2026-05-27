/* ============================================================
   Chart.js configs · Megaline Customer Revenue
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

    /* ---------- 1. Call minutes distribution (binned) ---------- */
    const ctxM = document.getElementById('chartMinutes');
    if (ctxM) {
      const bins = ['0–100', '100–200', '200–300', '300–400', '400–500', '500–600', '600–700', '700–800', '800+'];
      new Chart(ctxM, {
        type: 'bar',
        data: {
          labels: bins,
          datasets: [
            { label: 'Surf',     data: [18, 32, 58, 86, 92, 64, 42, 22, 10], backgroundColor: COBALT_LIGHT, borderRadius: 3 },
            { label: 'Ultimate', data: [12, 24, 48, 78, 96, 72, 50, 28, 16], backgroundColor: COBALT,       borderRadius: 3 },
          ],
        },
        options: {
          ...commonOpts,
          scales: {
            x: { ...commonOpts.scales.x, title: { display: true, text: 'Monthly minutes', color: '#475569' } },
            y: { ...commonOpts.scales.y, title: { display: true, text: 'Users (n)',       color: '#475569' } },
          },
        },
      });
    }

    /* ---------- 2. Monthly revenue per plan ---------- */
    const ctxR = document.getElementById('chartRevenue');
    if (ctxR) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      new Chart(ctxR, {
        type: 'line',
        data: {
          labels: months,
          datasets: [
            {
              label: 'Surf',
              data: [42, 44, 46, 48, 49, 50, 51, 52, 53, 55, 57, 60],
              borderColor: COBALT_LIGHT,
              backgroundColor: 'rgba(100, 181, 246, 0.15)',
              tension: 0.35,
              fill: true,
              pointRadius: 3,
              pointBackgroundColor: COBALT_LIGHT,
              borderWidth: 2,
            },
            {
              label: 'Ultimate',
              data: [70, 71, 72, 72, 73, 74, 74, 75, 75, 76, 77, 78],
              borderColor: COBALT,
              backgroundColor: 'rgba(25, 118, 210, 0.15)',
              tension: 0.35,
              fill: true,
              pointRadius: 3,
              pointBackgroundColor: COBALT,
              borderWidth: 2,
            },
          ],
        },
        options: {
          ...commonOpts,
          scales: {
            x: commonOpts.scales.x,
            y: {
              ...commonOpts.scales.y,
              title: { display: true, text: 'Avg monthly revenue (USD)', color: '#475569' },
              ticks: { ...commonOpts.scales.y.ticks, callback: (v) => '$' + v },
            },
          },
        },
      });
    }

    /* ---------- 3. NY-NJ vs other regions ---------- */
    const ctxRg = document.getElementById('chartRegion');
    if (ctxRg) {
      new Chart(ctxRg, {
        type: 'bar',
        data: {
          labels: ['NY-NJ', 'Other regions'],
          datasets: [
            { label: 'Surf',     data: [49, 56], backgroundColor: COBALT_LIGHT, borderRadius: 4 },
            { label: 'Ultimate', data: [72, 76], backgroundColor: COBALT,       borderRadius: 4 },
          ],
        },
        options: {
          ...commonOpts,
          scales: {
            x: commonOpts.scales.x,
            y: {
              ...commonOpts.scales.y,
              title: { display: true, text: 'Avg revenue (USD)', color: '#475569' },
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
