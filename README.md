# LLM플레이션 차트 — AI는 해마다 싸지고 강해진다

연도별 대표 AI 모델(SOTA)의 **가격 하락**과 **성능 상승**을 한 장의 교차 차트로 시각화한 프로젝트입니다.

## 무엇을 보여주나

- **성능(GPQA Diamond)** 은 위로: 38.8% → 49.9% → 85.7%
- **가격(블렌디드 $/1M)** 은 아래로: $37.5 → $7.5 → $3.4
- 대상: 2023 GPT-4 · 2024 GPT-4o · 2025 GPT-5

두 선이 반대로 벌어지며 X자로 교차합니다 — "싸지면서 강해진다"는 LLM플레이션의 실체.

## 데이터 출처

모든 수치는 모델 제작사의 **공식 1차 출처**(기술보고서·시스템카드·발표)와 GPQA 원논문(arXiv:2311.12022)에서 확인했습니다. 근거가 불분명한 수치는 배제했습니다.

- GPT-4 GPQA 38.8% — GPQA 원논문 Few-Shot CoT
- GPT-4o GPQA 49.9% — OpenAI 현행 공식값 (런칭 당시 53.6%에서 하향 수정)
- GPT-5 GPQA 85.7% — OpenAI 공식 발표 (무도구)

## 실행

```
index.html을 브라우저에서 열면 됩니다 (Chart.js CDN 로드에 인터넷 필요).
```

## 기술 스택

- [Chart.js](https://www.chartjs.org/) 4.4.1 + [annotation plugin](https://www.chartjs.org/chartjs-plugin-annotation/) 3.0.1
- Vanilla HTML / CSS / JS (빌드 불필요)
