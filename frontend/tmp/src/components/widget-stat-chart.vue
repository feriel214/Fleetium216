<script>
/**
 * A stat widget to show data with tiny chart visulization
 */
export default {
  props: {
    mainTitle: {
      type: String,
      default: '',
    },
    value: '',
    subValue: {
      type: String,
      default: '',
    },
    chartColor: {
      type: String,
      default: '#5369f8',
    },
     image: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      series: [
        {
          data: [25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54],
        },
      ],
      chartOptions: {
        chart: {
          sparkline: {
            enabled: true,
          },
          parentHeightOffset: 0,
          toolbar: {
            show: false,
          },
        },
        colors: [this.chartColor],
        height: 45,
        width: 90,
        markers: { size: 0 },
        fill: {
          type: 'gradient',
          gradient: {
            type: 'vertical',
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [45, 100],
          },
        },
        tooltip: {
          theme: 'dark',
          fixed: {
            enabled: false,
          },
          x: {
            show: false,
          },
          y: {
            title: {
              formatter: (seriesName) => {
                return ''
              },
            },
          },
          marker: {
            show: false,
          },
        },
        stroke: { width: 2, curve: 'smooth' },
      },
    }
  },
}
</script>
<template>
  <div class="card">
    <div class="card-body p-0">
      <div class="media p-3">
        <div class="media-body">
          <span
            class="text-muted text-uppercase font-size-12 font-weight-bold"
            >{{ mainTitle }}</span
          >
          <h2 class="mb-0">{{ value }}</h2>
        </div>
        <div class="align-self-center">
          <img :src="`${image}`" class="avatar rounded mr-3" alt="shreyu" />
         
        </div>
      </div>
    </div>
  </div>
</template>
