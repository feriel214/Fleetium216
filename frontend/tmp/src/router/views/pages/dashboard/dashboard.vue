<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

import appConfig from '@src/app.config'
import Layout from '@layouts/main'

import StatChart from '@components/widget-stat-chart'
import Overview from '@components/overview'
import Member from '@components/member'
import Task from '@components/task'
import Chat from '@components/chat'

import axios from 'axios'
import { required } from 'vuelidate/lib/validators'
import {
  revenueAreaChart,
  targetsBarChart,
  salesDonutChart,
  ordersData,
} from './data'

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
    Overview,
    Member,
    Task,
    Chat,
  },
  data() {
    return {
      revenueAreaChart: revenueAreaChart,
      targetsBarChart: targetsBarChart,
      salesDonutChart: salesDonutChart,
      ordersData: ordersData,

      maxHeight: '328px',
      overviewData: [
        {
          class: 'border-bottom py-4',
          icon: 'users',
          value: '121,000',
          title: 'Total Visitors',
        },
        {
          class: 'border-bottom py-4',
          icon: 'image',
          value: '21,000',
          title: 'Total Product Views',
        },
        {
          class: 'py-4',
          icon: 'shopping-bag',
          value: '$21.5',
          title: 'Revenue Per Visitor',
        },
      ],
      membersData: [
        {
          image: require('@assets/images/users/avatar-7.jpg'),
          text: 'Senior Sales Guy',
          name: 'Shreyu N',
        },
        {
          image: require('@assets/images/users/avatar-9.jpg'),
          text: 'Social Media Campaign',
          name: 'Greeva Y',
        },
        {
          image: require('@assets/images/users/avatar-4.jpg'),
          text: 'Inventory Manager',
          name: 'Nik G',
        },
        {
          image: require('@assets/images/users/avatar-1.jpg'),
          text: 'Sales Persons',
          name: 'Hardik G',
        },
        {
          image: require('@assets/images/users/avatar-2.jpg'),
          text: 'Sales Persons',
          name: 'Stive K',
        },
      ],
      tasksData: [
        {
          title: 'Draft the new contract document for sales team',
          text: 'Due on 24 Aug, 2019',
          id: 1,
        },
        {
          title: 'iOS App home page',
          text: 'Due on 23 Aug, 2019',
          id: 2,
        },
        {
          title: 'Write a release note for Shreyu',
          text: 'Due on 22 Aug, 2019',
          id: 3,
        },
        {
          title: 'Invite Greeva to a project shreyu admin',
          text: 'Due on 21 Aug, 2019',
          id: 4,
        },
        {
          title: 'Enable analytics tracking for main website',
          text: 'Due on 20 Aug, 2019',
          id: 5,
        },
        {
          title: 'Invite user to a project',
          text: 'Due on 28 Aug, 2019',
          id: 6,
        },
        {
          title: 'Write a release note',
          text: 'Due on 14 Aug, 2019',
          id: 7,
        },
      ],
      statChart: [
        {
          mainTitle: 'today revenue',
          value: 2100,
          subValue: '10.21%',
          chartColor: '#5369f8',
        },
        {
          mainTitle: 'product sold',
          value: 1065,
          subValue: '5.05%',
          chartColor: '#f77e53',
        },
        {
          mainTitle: 'New customers',
          value: 11,
          subValue: '25.16%',
          chartColor: '#43d39e',
        },
        {
          mainTitle: 'new visitors',
          value: 750,
          subValue: '5.05%',
          chartColor: '#ffbe0b',
        },
      ],
      chatMessages: [
        {
          id: 1,
          image: require('@assets/images/users/avatar-9.jpg'),
          name: 'Greeva',
          message: 'Hello!',
          time: '10:00',
        },
        {
          id: 2,
          image: require('@assets/images/users/avatar-7.jpg'),
          name: 'Shreyu',
          message: 'Hi, How are you? What about our next meeting?',
          time: '10:01',
        },
        {
          id: 3,
          image: require('@assets/images/users/avatar-9.jpg'),
          name: 'Greeva',
          message: 'Yeah everything is fine',
          time: '10:01',
        },
        {
          id: 4,
          image: require('@assets/images/users/avatar-7.jpg'),
          name: 'Shreyu',
          message: 'Awesome! let me know if we can talk in 20 min',
          time: '10:02',
        },
      ],
      dateTimePicker: {
        enableTime: true,
        dateFormat: 'd-m-Y H:i',
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
      format24: null,
      preload: {
        enableTime: true,
        noCalendar: true,
        dateFormat: 'H:i',
        defaultDate: '00:00',
        time_24hr: true,
      },
      options: [],
      validations: {
        score: {
          start: { required },
          end: { required },
          car: { required },
        },
      },
      selectedDate: [new Date().setDate(new Date().getDate() - 7), new Date()],
    }
  },
  async mounted() {
    Object.keys(this.userCars.data).forEach((e) => this.options.push(`${e}`))
  },
  methods: {
    async getFinalScore() {
      let data = {
        carId: this.score.car,
        debut: this.score.start,
        fin: this.score.end,
      }
      console.log('data ', data)
      axios
        .post('http://localhost:3000/score', data)
        .then((res) => {
          console.log(('getFinalScores res : ', res))
        })
        .catch(function (error) {
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
    ValidationsStatus(validation) {
      console.log('validation : ', validation)
      return typeof validation != 'undefined' ? validation.$error : false
    },
    refershForm() {
      this.score.start = '00:00'
      this.score.end = '00:00'
      this.score.car = 'IN'
    },
    Cancel() {
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
        .then((result) => {
          if (result.isConfirmed) {
            this.$swal.fire('Canceled!', 'Action has been canceled.', 'success')
          }
        })
    },
  },
}
</script>
<style>
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
    <div class="row page-title align-items-center">
      <div class="col-sm-4 col-xl-6">
        <h4 class="mb-1 mt-0">Dashboard</h4>
      </div>
      <div class="col-sm-8 col-xl-6">
        <b-button
          class="b-button-inline float-sm-right mt-3 mt-sm-0"
          variant="info"
          >Calculate Score</b-button
        >
      </div>
    </div>
    <div class="row"> </div>

    <div class="row">
      <div
        v-for="stat of statChart"
        :key="stat.mainTitle"
        class="col-md-6 col-xl-3"
      >
        <StatChart
          :main-title="stat.mainTitle"
          :value="stat.value"
          :sub-value="stat.subValue"
          :chart-color="stat.chartColor"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-xl-5">
        <div class="card">
		<div class="card-body">
         <h3 class="card-title mt-0 pb-2 header-title">Calculate Score </h3>
		</div>
          <form v-on:submit.prevent="getFinalScore">
            <div class="row">
              <div class="card-body">
                <div class="form-group mb-3">
                  <flat-pickr
                    v-model="score.start"
                    :config="dateTimePicker"
                    @on-change="InsertStartTime"
                    class="form-control"
                    placeholder="Date and Time"
                  ></flat-pickr>
                </div>
                <div class="form-group mb-3">
                  <flat-pickr
                    v-model="score.end"
                    :config="dateTimePicker"
                    @on-change="InsertEndTime"
                    class="form-control"
                    placeholder="Date and Time"
                  ></flat-pickr>
                </div>

                <div class="form-group mb-3">
                  <b-form-select
                    size="lg"
                    class="mb-2"
                    v-model="score.car"
                    :options="options"
                  ></b-form-select>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="card-body">
                <button type="submit" class="btnTlmtk btn-primary-Tlmtk">
                  Calculate Score</button
                >
              </div>
              <div class="card-body">
                <button
                  class="btnTlmtk btn-danger-Tlmtk"
                  type="button"
                  @click="Cancel()"
                  >Cancel</button
                >
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="col-xl-7">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mt-0 pb-2 header-title">Score Details </h5>
            <!-- Sales donut chart -->
            <apexchart
              type="donut"
              height="304"
              :series="salesDonutChart.series"
              :options="salesDonutChart.chartOptions"
            ></apexchart>
            <!-- end sales chart -->
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xl-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mt-0 mb-0 header-title"
              >Top 10 Drivers Details</h5
            >
            <div class="table-responsive mt-4 mb-0">
              <b-table-simple class="table table-hover table-nowrap mb-0">
                <b-thead class="thead-white">
                  <b-tr>
                    <b-th>Car Name </b-th>
                    <b-th>Driver </b-th>
                    <b-th>Score</b-th>
                    <b-th>Price</b-th>
                    <b-th>Status</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="order in ordersData" :key="order.name">
                    <b-td>{{ order.id }}</b-td>
                    <b-td>{{ order.product }}</b-td>
                    <b-td>{{ order.name }}</b-td>
                    <b-td>{{ order.price }}</b-td>
                    <b-td>
                      <span
                        class="badge"
                        :class="{
                          'badge-soft-warning': `${order.status}` === 'Pending',
                          'badge-soft-success':
                            `${order.status}` === 'Delivered',
                          'badge-soft-danger': `${order.status}` === 'Declined',
                        }"
                        >{{ order.status }}</span
                      >
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
