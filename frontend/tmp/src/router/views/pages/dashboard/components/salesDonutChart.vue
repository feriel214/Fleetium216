<script>
/**
 * A simple stat widget
 */
export default {
    props: {
    labels:  Array,
    series: Array,
  },
  data() {
    return {
      salesDonutChart: {
        chartOptions: {
          plotOptions: {
            pie: {
              donut: {
                size: '70%',
              },
              expandOnClick: false,
            },
          },
          colors: ['#5369f8', '#43d39e', '#f77e53', '#ffbe0b'],
          legend: {
            show: true,
            position: 'right',
            horizontalAlign: 'left',
            itemMargin: {
              horizontal: 6,
              vertical: 3,
            },
          },
          labels: this.labels,
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  position: 'bottom',
                },
              },
            },
          ],
          tooltip: {
            y: {
              formatter: (value) => {
                return value + 'k'
              },
            },
          },
        },
        series: this.series
      },
    }
  }
  
}
</script>

<template>
      <apexchart
        type="donut"
        height="304"
        :series="salesDonutChart.series"
        :options="salesDonutChart.chartOptions"
      ></apexchart>
    
</template>
