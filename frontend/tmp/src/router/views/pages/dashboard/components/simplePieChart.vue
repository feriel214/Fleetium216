<script>

export default {
  props: {
    labels:  Array,
    series:  Array,
  },
  data() {
    return {
      simplePieChart: {
        series: this.series,
        chartOptions: {
          labels: this.labels,
          colors: ['#5369f8', '#43d39e', '#f77e53', '#1ce1ac', '#25c2e3'],
          legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            verticalAlign: 'middle',
            floating: false,
            fontSize: '14px',
            offsetX: 0,
            offsetY: -10,
          },
          dataLabels: {
            enabled: false,
          },
          responsive: [
            {
              breakpoint: 600,
              options: {
                chart: {
                  height: 240,
                },
                legend: {
                  show: false,
                },
              },
            },
          ],
        },
      },
    }
  },
}
</script>

<template>
  <!-- Sales donut chart -->
  <apexchart
    class="apex-charts"
    height="320"
    type="pie"
    :series="simplePieChart.series"
    :options="simplePieChart.chartOptions"
  ></apexchart>
</template>
