// llm플레이션 — 연도별 SOTA 단일 차트
// 2023 GPT-4 / 2024 GPT-4o / 2025 GPT-5 (모두 1차·준1차 검증값, 무도구)
// 성능 GPQA Diamond: 38.8 → 49.9 → 85.7  |  가격 블렌디드: 37.5 → 7.5 → 3.4

const COL = {
  down: "#34d399", up: "#60a5fa", gold: "#fbbf24",
  muted: "#8593b5", grid: "rgba(35, 45, 74, 0.55)", text: "#eef2fb",
};

Chart.defaults.color = COL.muted;
Chart.defaults.font.family = "Inter, sans-serif";
Chart.defaults.font.size = 14;
if (window["chartjs-plugin-annotation"]) Chart.register(window["chartjs-plugin-annotation"]);

const grad = (chart, from, to) => {
  const { ctx, chartArea } = chart;
  if (!chartArea) return from;
  const g = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
  g.addColorStop(0, from); g.addColorStop(1, to);
  return g;
};
const tip = (extra = {}) => ({
  backgroundColor: "#161d30", borderColor: COL.grid, borderWidth: 1,
  padding: 14, cornerRadius: 10, titleColor: "#fff", titleFont: { weight: 700 },
  bodyFont: { size: 14 }, displayColors: true, usePointStyle: true, ...extra,
});

// ══ 단 하나의 차트: 연도별 SOTA 성능↑ vs 가격↓ ══
new Chart(document.getElementById("sotaChart"), {
  data: {
    labels: ["2023\nGPT-4", "2024\nGPT-4o", "2025\nGPT-5"],
    datasets: [
      {
        type: "line", label: "성능 (GPQA %)", data: [38.8, 49.9, 85.7],
        borderColor: COL.up, borderWidth: 5, fill: false, tension: 0.35,
        pointBackgroundColor: COL.up, pointBorderColor: "#fff", pointBorderWidth: 2.5,
        pointRadius: 10, pointHoverRadius: 14, yAxisID: "yPerf",
      },
      {
        type: "line", label: "가격 ($/1M)", data: [37.5, 7.5, 3.4],
        borderColor: COL.down,
        backgroundColor: (c) => grad(c.chart, "rgba(52,211,153,0.30)", "rgba(52,211,153,0)"),
        borderWidth: 5, fill: true, tension: 0.35,
        pointBackgroundColor: COL.down, pointBorderColor: "#fff", pointBorderWidth: 2.5,
        pointRadius: 10, pointHoverRadius: 14, yAxisID: "yPrice",
      },
    ],
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    animation: { duration: 1500, easing: "easeOutQuart" },
    interaction: { mode: "index", intersect: false },
    layout: { padding: { top: 34, right: 20, bottom: 8, left: 4 } },
    plugins: {
      legend: { labels: { usePointStyle: true, padding: 22, font: { size: 15, weight: 700 } } },
      tooltip: tip({ callbacks: { label: (c) =>
        c.dataset.yAxisID === "yPrice" ? ` 가격 $${c.parsed.y}/1M` : ` GPQA ${c.parsed.y}%` }}),
      annotation: { annotations: {
        up: {
          type: "label", xValue: "2024\nGPT-4o", yValue: 49.9, yScaleID: "yPerf",
          content: ["↑ 강해진다"], color: COL.up, font: { weight: 800, size: 17 },
          backgroundColor: "rgba(7,11,22,0.72)", borderRadius: 6, padding: 5,
          yAdjust: -48, xAdjust: 44,
        },
        down: {
          type: "label", xValue: "2024\nGPT-4o", yValue: 7.5, yScaleID: "yPrice",
          content: ["↓ 싸진다"], color: COL.down, font: { weight: 800, size: 17 },
          backgroundColor: "rgba(7,11,22,0.72)", borderRadius: 6, padding: 5,
          yAdjust: 46, xAdjust: 40,
        },
      }},
    },
    scales: {
      x: { grid: { color: COL.grid }, ticks: { color: COL.text, font: { weight: 800, size: 15 } } },
      yPerf: {
        position: "left", min: 0, max: 100, grid: { color: COL.grid },
        title: { display: true, text: "성능 ▲  (GPQA %)", color: COL.up, font: { weight: 700 } },
        ticks: { callback: (v) => v + "%", color: COL.up },
      },
      yPrice: {
        position: "right", min: 0, grid: { drawOnChartArea: false },
        title: { display: true, text: "가격 ▼  ($/1M)", color: COL.down, font: { weight: 700 } },
        ticks: { callback: (v) => "$" + v, color: COL.down },
      },
    },
  },
});
