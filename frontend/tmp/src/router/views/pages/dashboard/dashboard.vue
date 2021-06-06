<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import appConfig from '@src/app.config'
import Layout from '@layouts/main'

import Stat from '@components/widget-stat'
import StatChart from '@components/widget-stat-chart'

import axios from 'axios'
import SalesDonutChart from './components/salesDonutChart.vue'
import SimplePieChart from './components/simplePieChart.vue'
/**
 * Dashboard-1 Component
 */
export default {
  page: {
    title: 'Dashboard',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    VuePerfectScrollbar,
    Layout,
    StatChart,
    Stat,
    SalesDonutChart,
    SimplePieChart,
  },
  data() {
    return {
      topTenPowerSaver: [],
      linewithDataChart: {
        chartOptions: {
          chart: {
            zoom: {
              enabled: false,
            },
            toolbar: {
              show: false,
            },
          },
          colors: ['#5369f8', '#43d39e'],
          dataLabels: {
            enabled: true,
          },
          stroke: {
            width: [3, 3],
            curve: 'smooth',
          },
          grid: {
            row: {
              colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.2,
            },
            borderColor: '#f1f3fa',
          },
          markers: {
            style: 'inverted',
            size: 6,
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            title: {
              text: 'Month',
            },
            axisBorder: {
              color: '#d6ddea',
            },
            axisTicks: {
              color: '#d6ddea',
            },
          },
          yaxis: {
            title: {
              text: 'Temperature',
            },
            min: 5,
            max: 40,
          },
          legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5,
          },
          tooltip: {
            theme: 'dark',
            x: { show: false },
          },
          responsive: [
            {
              breakpoint: 600,
              options: {
                chart: {
                  toolbar: {
                    show: false,
                  },
                },
                legend: {
                  show: false,
                },
              },
            },
          ],
        },
        series: [
          {
            name: 'High - 2018',
            data: [28, 29, 33],
          },
          {
            name: 'Low - 2018',
            data: [12, 11, 14],
          },
        ],
      },
      targetsBarChart: {
        chartOptions: {
          colors: ['#5369f8', '#43d39e', '#f77e53', '#ffbe0b'],
          chart: {
            type: 'bar',
            stacked: true,
            toolbar: {
              show: false,
            },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '45%',
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
          },
          xaxis: {
            categories: [
              'Driver 1',
              'Driver 2',
              'Driver 3',
              'Driver 4',
              'Driver 5',
              'Driver 6',
              'Driver 7',
              'Driver 8',
              'Driver 9',
              'Driver 10',
            ],
            axisBorder: {
              show: false,
            },
          },
          legend: {
            show: false,
          },
          grid: {
            row: {
              colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.2,
            },
            borderColor: '#f3f4f7',
          },
        },
        series: [
          {
            name: 'Value',
            data: [],
          },
        ],
      },
      statData: [],
      basicBarChart: {},
      ordersData: [],
      power_saver: {},
      nature_friend: {},
      maxHeight: '328px',
      topTen: [],
      topdriver: {},
      showdetails: false,
      overviewData: [],

      statChart: [],

      classObject: [{ class: 'col-md-6 col-xl-4' }],
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
          labels: [
            'Driver 1',
            'Driver 2',
            'Driver 3',
            'Driver 4',
            'Driver 5',
            'Driver 6',
            'Driver 7',
            'Driver 8',
            'Driver 9',
            'Driver 10',
          ],
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
                return value + 'Minutes'
              },
            },
          },
        },
        series: [],
      },
      salesDonutChart1: {
        labels: [],
        series: [20, 30, 40],
      },
      simplePieChart: {
        labels: [],
        series: [],
      },
      simplePieChart1: {},
      simplePieChart2: {},
      simplePieChart3: {},

      items: [
        {
          text: 'Shreyu',
          href: '/',
        },
        {
          text: 'Icons',
          href: '/',
        },
        {
          text: 'Advanced',
          active: true,
        },
      ],

      basicBarChart1: {},
    }
  },
  async mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
    await this.natureFriend()
    await this.getTopTenDriver()
    await this.powerSaver()
    await this.getTopTrip()
  },
  computed: {},
  methods: {
    async getTopTrip() {
      axios.get('http://localhost:3000/ranks/top-trip').then(async (res) => {
        console.log('//////////////////////Top trip : ', res.data)
        this.simplePieChart1 = await this.initPieChart(
          [
            res.data.roadspeed_1._,
            res.data.roadspeed_2._,
            res.data.roadspeed_3._,
          ],
          ['RoadSpeed1', 'RoadSpeed2', 'RoadSpeed3'],
          ['#f77e53', '#1ce1ac', '#25c2e3']
        )
        this.simplePieChart2 = await this.initPieChart(
          [res.data.roadtime_1._, res.data.roadtime_2._, res.data.roadtime_3._],
          ['RoadTime1', 'RoadTime2', 'RoadTime3'],
          ['#5369f8', '#43d39e', '#1ce1ac']
        )
        this.simplePieChart3 = await this.initPieChart(
          [
            res.data.Millage._,
            res.data.Acceleration._,
            res.data.Freinage._,
            res.data.Cornering._,
            res.data.Idling._,
            res.data.engineRT._ / 60,
            res.data.score._,
          ],
          [
            'Milleage',
            'Acceleration',
            'Freinage',
            'Cornering',
            'Idling',
            'Engine Run Time',
            'score',
          ],
          ['#5369f8', '#43d39e', '#f77e53', '#1ce1ac', '#25c2e3', '#ffbe0b']
        )
      })
    },
    async powerSaver() {
      axios
        .get('http://localhost:3000/ranks/power-saver')
        .then(async (res) => {
          this.power_saver = res.data
          console.log('@@@@@@@@@@@ powerSaver @@@@@@@@@@@', res.data)
          this.statData.push({
            title: 'Top Power Saver',
            value: res.data[`driver1`].PartitionKey._,
            icon: 'battery-charging',
            color: 'primary',
          })
          var i = 1
          while (i <= 10) {
            this.ordersData.push({
              carname: res.data[`driver${i}`].PartitionKey._,
              startdate: res.data[`driver${i}`].debut._,
              enddate: res.data[`driver${i}`].fin._,
              egt: res.data[`driver${i}`].engineRT._,
              score: res.data[`driver${i}`].score._,
            })
            i++
          }
          this.overviewData.push({
            class: 'border-bottom py-4',
            icon: 'battery-charging',
            value: res.data['driver1'].PartitionKey._,
            title: 'Top Power Saver',
          })
          // this.revenueAreaChart.series[0].data=
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    async natureFriend() {
      axios
        .get('http://localhost:3000/ranks/nature-friend')
        .then((res) => {
          this.overviewData.push({
            class: 'border-bottom py-4',
            icon: 'cloud-lightning',
            value: res.data['driver1'].PartitionKey._,
            title: 'Top Nature Friend',
          })
          console.log('@@@@@@@@@@@ natureFriend @@@@@@@@@@@', res.data)
          this.statData.push({
            title: 'Top Eco Friend',
            value: res.data['driver1'].PartitionKey._,
            icon: 'cloud-lightning',
            color: 'success',
          })
          var i = 0
          while (i < 10) {
            this.targetsBarChart.series[0].data[i] =
              res.data[`driver${i + 1}`]['Idling']._
            this.salesDonutChart.series.push(
              res.data[`driver${i + 1}`]['Idling']._
            )
            i++
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    async getTopTenDriver() {
      axios
        .get('http://localhost:3000/ranks/top-ten')
        .then(async (res) => {
          console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&& Top Ten Drivers ', res.data)
          this.topTen = res.data
          this.basicBarChart = await this.initBasicChart(
            [
              'Top 1',
              'Top 2',
              'Top 3',
              'Top 4',
              'Top 5',
              'Top 6',
              'Top 7',
              'Top 8',
              'Top 9',
              'Top 10',
            ],
            res.data
          )
          this.statData.push({
            title: 'Top Driver',
            value: res.data[0],
            icon: 'user',
            color: 'info',
          })
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    async initBasicChart(categories, data) {
      return {
        series: [
          {
            data: data,
          },
        ],
        chartOptions: {
          chart: {
            toolbar: {
              show: false,
            },
          },
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          dataLabels: {
            enabled: false,
          },

          colors: ['#5369f8'],
          xaxis: {
            // tslint:disable-next-line: max-line-length
            categories: categories,
            axisBorder: {
              color: '#d6ddea',
            },
            axisTicks: {
              color: '#d6ddea',
            },
          },
          states: {
            hover: {
              filter: 'none',
            },
          },
          grid: {
            borderColor: '#f1f3fa',
          },
          tooltip: {
            theme: 'dark',
            x: { show: false },
          },
        },
      }
    },
    async initPieChart(series, labels, colors) {
      return {
        series: series,
        chartOptions: {
          labels: labels,
          colors: colors,
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
      }
    },
  },
}
</script>
<style>
#livedata {
  height: 505px;
}
.left-side-menu-dark .left-side-menu {
    z-index: 200!important; 
    position: fixed !important;
    width: 90px!important;
}
</style>
<template>
  <Layout>
    <div class="row page-title align-items-center">
      <div class="col-sm-4 col-xl-6">
        <h4 class="mb-1 mt-0">Dashboard</h4>
      </div>
    </div>
    <div class="row">
      <div
        v-for="(stat, index) of statData"
        :key="index"
        class="col-md-6 col-xl-4"
      >
        <Stat
          :title="stat.title"
          :value="stat.value"
          :icon="stat.icon"
          :color="stat.color"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-xl-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mt-0 pb-2 header-title"
              >Top 10 Nature Friend</h5
            >
            <!-- Sales donut chart -->
            <apexchart
              type="donut"
              height="300"
              :series="salesDonutChart.series"
              :options="salesDonutChart.chartOptions"
            ></apexchart>
            <!-- end sales chart -->
          </div>
        </div>
      </div>
      <div class="col-xl-6">
        <div class="card">
          <div class="card-body">
            <h4 class="header-title mt-0 mb-3">Top Ten Driver</h4>

            <apexchart
              height="300"
              type="bar"
              class="apex-charts"
              :series="basicBarChart.series"
              :options="basicBarChart.chartOptions"
            ></apexchart>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card-->
      </div>
    </div>
    <div class="row">
      <div class="col-xl-7">
        <div class="card">
          <div class="card-body" style="height:735px">
            <h5 class="card-title mt-0 mb-0 header-title"
              >Top Ten Power Saver</h5
            >
            <div class="table-responsive mt-4 mb-0">
              <b-table-simple class="table table-hover table-nowrap mb-0">
                <b-thead class="thead-white">
                  <b-tr>
                    <b-th>Car Name</b-th>
                    <b-th>Start Date</b-th>
                    <b-th>End Date</b-th>
                    <b-th>Engine RT</b-th>
                    <b-th>Score</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(order, index) in ordersData" :key="index">
                    <b-td>{{ order.carname }}</b-td>
                    <b-td>{{ order.startdate }}</b-td>
                    <b-td>{{ order.enddate }}</b-td>
                    <b-td>{{ order.egt }}</b-td>
                    <b-td>
                      <span>
                        <b-progress
                          v-if="order.score > 5"
                          :value="order.score"
                          :max="10"
                          class="mb-3"
                          variant="success"
                        ></b-progress>
                        <b-progress
                          v-else-if="order.score == 5"
                          :value="order.score"
                          :max="10"
                          class="mb-3"
                          variant="warning"
                        ></b-progress>
                        <b-progress
                          v-else-if="order.score < 5"
                          :value="order.score"
                          :max="10"
                          class="mb-3"
                          variant="danger"
                        ></b-progress>
                      </span>
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-5">
        <div class="card">
          <div class="card-body">
            <h4 class="header-title mt-0 mb-3">The Longest Trip</h4>
            <apexchart
              class="apex-charts"
              height="250"
              type="pie"
              :series="simplePieChart1.series"
              :options="simplePieChart1.chartOptions"
            ></apexchart>
            <apexchart
              class="apex-charts"
              height="250"
              type="pie"
              :series="simplePieChart2.series"
              :options="simplePieChart2.chartOptions"
            ></apexchart>
            <apexchart
              class="apex-charts"
              height="250"
              type="pie"
              :series="simplePieChart3.series"
              :options="simplePieChart3.chartOptions"
            ></apexchart>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
