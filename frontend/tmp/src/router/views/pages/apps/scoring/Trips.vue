<script>
import Layout from '@layouts/main'
import PageHeader from '@components/page-header'
import axios from 'axios'
import Overview from '@components/overview'
import Stat from '@components/widget-stat'
export default {
  name: 'Trips',
  components: { Layout, PageHeader, Overview, Stat },
  data() {
    return {
      statData: [],
      multipleRadialBars: {},
      patternedDonutChart: {},

      dateTimePicker: {
        enableTime: false,
        dateFormat: 'Y-m-d H:i',
      },
      datetime: null,
      dateConfig: {
        mode: 'range',
      },
      score: {
        start: null,
        end: null,
        car: null,
      },
      options: [],
      preload: {
        enableTime: true,
        noCalendar: true,
        dateFormat: 'H:i',
        defaultDate: '00:00',
        time_24hr: true,
      },
      index: 0,
      format24: null,
      selectedDate: [new Date().setDate(new Date().getDate() - 7), new Date()],
      userCars: {
        data: {
          21038: {
            gps_longitude: 10.187016666666667,
            gps_heading: 254.6,
            adresse: 'Rue El Bahja, Ariana Ville, Ariana',
            mainpower: '1',
            gps_altitude: '12',
            gps_latitude: 36.87251666666667,
            name: '21038',
            gps_speed: 0,
            rtc: 1589369876000,
            ignition: 0,
            motion: 0,
            mdmid: '013799001768045',
            code_driver: false,
            status_scooter: false,
          },
          20910: {
            name: '20910',
            gps_longitude: 10.140433333333334,
            gps_heading: 301.9,
            gps_speed: 0,
            rtc: 1603289917000,
            adresse:
              'Rue Ibn El Khatib, Cit\u00e9 Ibn Khaldoun, El Omrane Sup\u00e9rieur, Tunis',
            mainpower: '1',
            gps_altitude: '65',
            gps_latitude: 36.828833333333336,
            ignition: 1,
            motion: 1,
            mdmid: '013799001702804',
            code_driver: false,
            status_scooter: false,
          },
          20914: {
            gps_longitude: 10.186883333333334,
            gps_heading: 0,
            adresse: 'Rue El Bahja, Ariana Ville, Ariana',
            mainpower: '0',
            gps_altitude: '6',
            gps_latitude: 36.87243333333333,
            name: '20914',
            gps_speed: 0,
            rtc: 1598026053000,
            ignition: 0,
            motion: 0,
            mdmid: '013799001767922',
            code_driver: '285',
            status_scooter: false,
          },
          20902: {
            name: '20902',
            gps_longitude: 10.146433333333333,
            gps_heading: 188.5,
            gps_speed: 0,
            rtc: 1615347133000,
            adresse: 'Zaghouan, Zaghouan',
            mainpower: '0',
            gps_altitude: '162',
            gps_latitude: 36.4045,
            ignition: 0,
            motion: 0,
            mdmid: '013799001702770',
            code_driver: false,
            status_scooter: false,
          },
          20945: {
            name: '20945',
            gps_longitude: 10.059366666666667,
            gps_heading: 41.8,
            gps_speed: 33.891600000000004,
            rtc: 1604504627000,
            adresse: 'RN 5 \u0637\u0648, El Hrairia, Tunis',
            mainpower: '0',
            gps_altitude: '104',
            gps_latitude: 36.77718333333333,
            ignition: 0,
            motion: 1,
            mdmid: '013799001675174',
            code_driver: false,
            status_scooter: false,
          },
          21041: {
            name: '21041',
            gps_longitude: 10.186916666666667,
            gps_heading: 175.8,
            gps_speed: 0,
            rtc: 1592843991000,
            adresse: 'Rue El Bahja, Ariana Ville, Ariana',
            mainpower: '0',
            gps_altitude: '36',
            gps_latitude: 36.8725,
            ignition: 0,
            motion: 1,
            mdmid: '013799001702648',
            code_driver: false,
            status_scooter: false,
          },
          20911: {
            gps_longitude: 10.131683333333333,
            gps_heading: 0,
            adresse: 'Cit\u00e9 Ettahrir, El Omrane Sup\u00e9rieur, Tunis',
            mainpower: '1',
            gps_altitude: '61',
            gps_latitude: 36.829633333333334,
            name: '20911',
            gps_speed: 0,
            rtc: 1601636259000,
            ignition: 0,
            motion: 0,
            mdmid: '013799001674144',
            code_driver: '283',
            status_scooter: false,
          },
          21034: {
            gps_longitude: 10.186983333333334,
            gps_heading: 95.3,
            adresse: '',
            mainpower: '1',
            gps_altitude: '18',
            gps_latitude: 36.872483333333335,
            name: '21034',
            gps_speed: 5.556,
            rtc: 1598542481041,
            ignition: 1,
            motion: 1,
            mdmid: '013799001674037',
            code_driver: '303',
            status_scooter: false,
          },
          21047: {
            name: '21047',
            gps_longitude: 0,
            gps_heading: 0,
            gps_speed: 0,
            rtc: 1601377388000,
            adresse: '',
            mainpower: '1',
            gps_altitude: '9',
            gps_latitude: 0,
            ignition: 0,
            motion: 0,
            mdmid: '013799001705369',
            code_driver: false,
            status_scooter: false,
          },
          21046: {
            name: '21046',
            gps_longitude: 10.1839,
            gps_heading: 101.3,
            gps_speed: 0,
            rtc: 1585984992000,
            adresse: 'Raoued, Ariana',
            mainpower: '1',
            gps_altitude: '73',
            gps_latitude: 36.900533333333335,
            ignition: 0,
            motion: 0,
            mdmid: '013799001674136',
            code_driver: false,
            status_scooter: false,
          },
        },
      },
    }
  },
  async mounted() {
    Object.keys(this.userCars.data).forEach((e) => this.options.push(`${e}`))
    await this.refershForm()
    this.patternedDonutChart = await this.roadTime([30, 30, 30])
    this.multipleRadialBars = await this.roadSpeed([60, 20, 10])
    await this.initData()
  },
  methods: {
    async initInfo(obj1, obj2, obj3, obj4) {
      await this.initstatObj(obj1)
      await this.initstatObj(obj2)
      await this.initstatObj(obj3)
      await this.initstatObj(obj4)
    },
    async initstatObj(obj) {
      this.statData.push({
        title: obj.title,
        value: obj.value,
        icon: obj.icon,
        color: obj.color,
      })
    },
    async getFinalScore() {
      this.index++
      console.log('data ', this.score)
      let data = {
        carId: '1',
        debut: this.score.start.substr(0, 10),
        fin: this.score.end.substr(0, 10),
      }

      console.log('data ', data)
      axios
        .post('http://localhost:3000/score', data)
        .then(
          async (res) => {
            await console.log('8888888888888888888888888 Score : ', res.data)

            this.patternedDonutChart = await this.roadTime([
              res.data.roadtime_1,
              res.data.roadtime_2,
              res.data.roadtime_3,
            ])
            this.multipleRadialBars = await this.roadSpeed([
              res.data.roadspeed_1,
              res.data.roadspeed_2,
              res.data.roadspeed_3,
            ])
            this.statData = []
            await this.initInfo(
              {
                title: 'Cornering Score',
                value: res.data.SCornering,
                icon: 'rotate-cw',
                color: 'info',
              },
              {
                title: 'Freinage Score',
                value: res.data.SFreinage,
                icon: 'trending-down',
                color: 'success',
              },
              {
                title: 'Acceleration',
                value: res.data.SAcceleration,
                icon: 'trending-up',
                color: 'warning',
              },
              {
                title: 'RoadSpeed Score',
                value: res.data.SRoadSpeed,
                icon: 'wind',
                color: 'danger',
              }
            )
            await this.initInfo(
              {
                title: 'Millage',
                value: res.data.millage,
                icon: 'clock',
                color: 'warning',
              },
              {
                title: 'Idling',
                value: res.data.idling,
                icon: 'crosshair',
                color: 'danger',
              },
              {
                title: 'Engine Run Time',
                value: res.data.engineRT,
                icon: 'slack',
                color: 'info',
              },
              {
                title: 'Score',
                value: res.data.Score,
                icon: 'pause-circle',
                color: 'success',
              }
            )
            this.$toast.success(
              `Score succefully calculated. go show details ! `
            )
          },
          (err) => {
            this.$toast.warning(`car Not found or wrong date please check ! `)
          }
        )
        .catch(function(error) {
          console.log(error)
        })
    },
    InsertEndTime(Params) {
      console.log(' this.score.end', this.score.end)
      this.score.end = Params['__ob__'].value[0].getTime()
    },
    InsertStartTime(Params) {
      console.log(' this.score.start', this.score.start)
      this.score.start = Params['__ob__'].value[0].getTime()
    },
    Cancel() {
      this.index = 0
      this.$swal
        .fire({
          title: 'Are you sure to undo ?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, cancel it!',
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            this.$swal.fire('Canceled!', 'Action has been canceled.', 'success')
            await this.refershForm()
            this.statData = []
            this.multipleRadialBars = await this.roadSpeed([60, 20, 10])
            await this.initData()
          }
        })
    },
    async refershForm() {
      this.score.start = '00:00'
      this.score.end = '00:00'
      this.score.car = 'IN'
      this.statData = []
    },
    async roadTime(series) {
      return {
        series: series,
        chartOptions: {
          chart: {
            dropShadow: {
              enabled: true,
              color: '#111',
              top: -1,
              left: 3,
              blur: 3,
              opacity: 0.2,
            },
          },
          stroke: {
            show: true,
            width: 2,
          },
          colors: ['#5369f8', '#43d39e', '#f77e53', '#1ce1ac', '#25c2e3'],
          labels: ['2AM : 4PM', '4PM : 8PM', '8PM : 2AM'],
          dataLabels: {
            dropShadow: {
              blur: 3,
              opacity: 0.8,
            },
            enabled: false,
          },
          fill: {
            type: 'pattern',
            opacity: 1,
            pattern: {
              enabled: true,
              style: [
                'verticalLines',
                'squares',
                'horizontalLines',
                'circles',
                'slantedLines',
              ],
            },
          },
          states: {
            hover: {
              enabled: false,
            },
          },
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
    async roadSpeed(series) {
      return {
        chartOptions: {
          plotOptions: {
            radialBar: {
              dataLabels: {
                name: {
                  fontSize: '22px',
                },
                value: {
                  fontSize: '16px',
                },
                total: {
                  show: true,
                  label: 'Total',
                  formatter(w) {
                    // tslint:disable-next-line: max-line-length
                    // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                    return 249
                  },
                },
              },
            },
          },
          labels: ['0-90 km/h', '90-120 km/h', '>120 km/h'],
          colors: ['#5369f8', '#43d39e', '#f77e53', '#1ce1ac'],
        },
        series: series,
      }
    },
    async initData() {
      await this.initInfo(
        {
          title: 'Cornering Score',
          value: 0,
          icon: 'rotate-cw',
          color: 'info',
        },
        {
          title: 'Freinage Score',
          value: 0,
          icon: 'trending-down',
          color: 'success',
        },
        {
          title: 'Acceleration',
          value: 0,
          icon: 'trending-up',
          color: 'warning',
        },
        { title: 'RoadSpeed Score', value: 0, icon: 'wind', color: 'danger' }
      )
      await this.initInfo(
        { title: 'Millage', value: 0, icon: 'clock', color: 'warning' },
        { title: 'Idling', value: 0, icon: 'crosshair', color: 'danger' },
        { title: 'Engine Run Time', value: 0, icon: 'slack', color: 'info' },
        { title: 'Score', value: 0, icon: 'pause-circle', color: 'success' }
      )
    },
  },
}
</script>

<style>
.left-side-menu-dark .left-side-menu {
    z-index: 200!important; 
    position: fixed !important;
    width: 90px!important;
}

.btn-primary-Tlmtk {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}
.btn-primary-Tlmtk:hover {
  color: #fff;
  background-color: #0069d9;
  border-color: #0062cc;
}
.btn-danger-Tlmtk {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}
.btn-danger-Tlmtk:hover {
  color: #fff;
  background-color: #c82333;
  border-color: #bd2130;
}
.btnTlmtk {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  width: 100%;
}
</style>

<template>
  <Layout>
    <PageHeader />
    <div class="row">
      <div calss="card-body" style="margin-left:732px;">
        <b-form inline v-on:submit.prevent="getFinalScore()">
          <div class="form-group mb-3">
            <flat-pickr
              style="height:50px;margin-right:10px;"
              v-model="score.start"
              :config="dateTimePicker"
              @on-change="InsertStartTime"
              class="form-control"
              placeholder="Start Date"
            ></flat-pickr>
          </div>
          <div class="form-group mb-3">
            <flat-pickr
              style="height:50px;margin-right:10px;"
              v-model="score.end"
              :config="dateTimePicker"
              @on-change="InsertEndTime"
              class="form-control"
              placeholder="End Date"
            ></flat-pickr>
          </div>
          <div class="form-group mb-3">
            <b-form-select
              style="height:50px;margin-right:10px;"
              size="lg"
              class="form-control"
              v-model="score.car"
              :options="options"
            ></b-form-select>
          </div>
          <div class="form-group mb-3">
            <button
              type="submit"
              class="btnTlmtk btn-primary-Tlmtk"
              style="height:50px;margin-right:10px;"
            >
              Calculate</button
            >
          </div>
          <div class="form-group mb-3">
            <button
              class="btnTlmtk btn-danger-Tlmtk"
              type="button"
              style="height:50px;margin-right:10px;"
              @click="Cancel()"
              >Cancel</button
            >
          </div>
        </b-form></div
      >
    </div>
    <div class="row">
      <div
        v-for="(stat, index) of statData"
        :key="index"
        class="col-md-6 col-xl-3"
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
            <h4 class="header-title mt-0 mb-3">Road Time Details</h4>
            <apexchart
              class="apex-charts"
              height="260"
              type="donut"
              :series="patternedDonutChart.series"
              :options="patternedDonutChart.chartOptions"
            ></apexchart>
          </div>
        </div>
      </div>
      <div class="col-xl-6">
        <div class="card">
          <div class="card-body">
            <h4 class="header-title mt-0 mb-3">RoadSpeed Details</h4>
            <apexchart
              class="apex-charts"
              height="250"
              type="radialBar"
              :series="multipleRadialBars.series"
              :options="multipleRadialBars.chartOptions"
            ></apexchart>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
