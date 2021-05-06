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
import { revenueAreaChart, ordersData } from './data'
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
    Overview,
    Member,
    Task,
    Chat,
    SalesDonutChart,
    SimplePieChart,
  },
  data() {
    return {
      revenueAreaChart: revenueAreaChart,

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
              'Acceleration',
              'Cornering',
              'Freinage',
              'Idling',
              'Millage',
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

      ordersData: ordersData,
      power_saver:{},
      nature_friend:{},
      maxHeight: '328px',
      topTen: [],
      statData: [],
      topdriver: {},
      showdetails: false,
      overviewData: [],
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
      statChart: [],
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
      classObject: [{ class: 'col-md-6 col-xl-4' }],
      salesDonutChart: {
        labels: [],
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
      finalscore:false,
      preload: {
        enableTime: true,
        noCalendar: true,
        dateFormat: 'H:i',
        defaultDate: '00:00',
        time_24hr: true,
      },
      lastindex: 0,
      index: null,
      index1: null,
      options: [],
      validations: {
        score: {
          start: { required },
          end: { required },
          car: { required },
        },
      },
      tableData: [],
      title: 'List Cars In Fence',
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
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 25, 50, 100],
      filter: null,
      filterOn: [],
      finalscoreres:null,
      sortBy: 'age',
      sortDesc: false,
      fields: [
        { key: 'car', label: 'Car', sortable: true, editable: true },
        {
          key: 'start_date',
          label: 'Start  Date',
          sortable: true,
          editable: true,
        },
        {
          key: 'end_date',
          label: 'End Date',
          sortable: true,
          editable: true,
        },
        {
          key: 'acceleration',
          label: 'Acceleration',
          sortable: true,
          editable: true,
        },
        {
          key: 'freinage',
          label: 'Deceleration',
          sortable: true,
          editable: true,
        },
        {
          key: 'cornering',
          label: 'Cornering',
          sortable: true,
          editable: true,
        },
        { key: 'score', label: 'Final Score', sortable: true, editable: true },
        { key: 'actions', label: 'Actions' },
      ],
      selectedDate: [new Date().setDate(new Date().getDate() - 7), new Date()],
    }
  },
  async mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
    Object.keys(this.userCars.data).forEach((e) => this.options.push(`${e}`))
    await this.getTopTenDriver()
    await this.gettopDriver()
    await this.powerSaver();
    await this.natureFriend();
  },
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.tableData.length
    },

    editableFields() {
      return this.fields.filter((field) => {
        return field.editable === true
      })
    },
 
  },
  methods: {
   async getFinalScore() {
     
      let data = {
        carId: "1",//this.score.car
        debut: this.score.start.substr(0,10),
        fin: this.score.end.substr(0,10),
      }
      console.log('data ', data)
      axios
        .post('http://localhost:3000/score', data)
        .then((res) => {
          console.log('getFinalScores res : ', res)
           this.finalscore=true;
          this.finalscoreres=res.data.Score;
        },err=>{
            this.refershForm();
            this.finalscoreres=null;
            this.$toast.warning(`car Not found or wrong date please check ! `);
            this.finalscore=false;
        })
        .catch(function (error) {
         
          console.log(error)
        })
    },
    async powerSaver(){
        axios
        .get('http://localhost:3000/ranks/power-saver')
        .then((res) => {
          this.power_saver=res.data;
          console.log('@@@@@@@@@@@ powerSaver @@@@@@@@@@@',res.data)
          this.statChart.push({
            mainTitle: 'Power Saver',
            value: res.data["driver1"].PartitionKey._+' | '+res.data["driver1"].Idling._,
            chartColor: '#5369f8',
            image: require('@assets/images/download.png'),
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    async natureFriend (){
       axios
        .get('http://localhost:3000/ranks/nature-friend')
        .then((res) => {
          this.nature_friend=res.data;
           console.log('@@@@@@@@@@@ natureFriend @@@@@@@@@@@',res.data)
           this.statChart.push({
            mainTitle: 'Nature Friend ',
            value:res.data["driver1"].PartitionKey._+' | '+ res.data["driver1"].Idling._,
            chartColor: '#f77e53',
            image: require('@assets/images/friend-nature.png'),
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    async gettopDriver() {
      axios
        .get('http://localhost:3000/ranks/top-driver')
        .then((res) => {
          console.log('************************** Top one driver :',res.data)
          this.topdriver =res.data;
            this.statChart.push({
            mainTitle: 'Top Driver ',
            value:`${res.data.score._}/10`,
            chartColor: '#43d39e',
            image: require('@assets/images/driver.png'),
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
   
    async getTopTenDriver() {
      axios
        .get('http://localhost:3000/ranks/top-ten')
        .then((res) => {
         console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&',res.data)
          this.topTen = res.data
          for (var i in res.data) {
           this.tableData.push({
              car: res.data[`${i}`].PartitionKey._,
              start_date: res.data[`${i}`].debut._,
              end_date: res.data[`${i}`].fin._,
              idling:res.data[`${i}`].Idling._,
              acceleration: res.data[`${i}`].Acceleration._,
              freinage: res.data[`${i}`].Freinage._,
              cornering: res.data[`${i}`].Cornering._,
              engine_runtime: res.data[`${i}`].engineRT._,
              milleage:res.data[`${i}`].Millage._,
              roadspped1:res.data[`${i}`].roadspeed_1._,
              roadspped2:res.data[`${i}`].roadspeed_2._,
              roadspped3:res.data[`${i}`].roadspeed_3._,
              roadTime1:res.data[`${i}`].roadtime_1._,
              roadTime2:res.data[`${i}`].roadtime_2._,
              roadTime3:res.data[`${i}`].roadtime_3._,
              score: res.data[`${i}`].score._,
              
            })
          }
          this.totalRows = this.tableData.length
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    async showStatistics(driverscore,index) {
      console.log('########## driverscore #########', driverscore,index)
      this.index1 = index
      this.lastindex++
      this.showdetails = true

      if (this.lastindex > 1) {
        this.refreshCharts();
      }

      this.simplePieChart.labels.push('0-90 km/h', '90-120 km/h', '>120 km/h')
      this.salesDonutChart.labels.push('2 AM : 4 PM', '4 PM : 8 PM', '8 PM : 2 AM')

      //RoadSpeed data
      this.simplePieChart.series.push(
        driverscore.roadspped1,
        driverscore.roadspped2,
        driverscore.roadspped3
      );
      //RoadTime
      this.salesDonutChart.series.push(
        driverscore.roadTime1,
        driverscore.roadTime2,
        driverscore.roadTime3
      );
      //Other Information
      await this.targetsBarChart.series[0].data.push(
        driverscore.acceleration,
        driverscore.cornering,
        driverscore. freinage,
        driverscore.idling,
        driverscore.milleage
      );
      this.overviewData.push(
        {
          class: 'border-bottom py-4',
          icon: 'truck',
          value: driverscore.car,
          title: 'Car Name ',
          color: '#f77e53',
        },
        {
          class: 'border-bottom py-4',
          icon: 'calendar',
          value: driverscore.start_date,
          title: 'Start Date',
          color: '#ffbe0b',
        },
        {
          class: 'border-bottom py-4',
          icon: 'calendar',
          value: driverscore.end_date,
          title: 'End Date',
          color: '#1ce1ac',
        },
        {
          class: 'border-bottom py-4',
          icon: 'activity',
          value: `${driverscore.engine_runtime} minutes `,
          title: 'Engine Runtime',
          color: '#6c757d',
        },
        {
          class: 'border-bottom py-4',
          icon: 'clock',
          value: `${driverscore.milleage} km\\h`,
          title: 'Odometer',
          color: '#25c2e3',
        },
        {
          class: 'border-bottom py-4',
          icon: 'award',
          value: `${driverscore.score}\\10`,
          title: 'Score',
          color: '#5369f8',
        }
      );
      document.body.scrollTop = 600
      document.documentElement.scrollTop = 600
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
      this.finalscore=false;
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
            this.refershForm()
          }
        })
    },
    refreshCharts() {
      this.simplePieChart.labels = []
      this.simplePieChart.series = []
      this.targetsBarChart.series.data = []
      this.targetsBarChart.chartOptions.labels = []
      this.salesDonutChart.series = []
      this.overviewData = []
    },
    HideStatistics(param) {
      this.showdetails = !param
      this.index1 = null
      this.refreshCharts();
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
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
.btn-show {
  color: #fff;
  background-color: #f77e53;
  border-color: #f77e53;
}
.btn-hide {
  color: #fff;
  background-color: #43d39e;
  border-color: #43d39e;
}
.btn-show:hover {
  color: #fff;
  background-color: #d45122;
  border-color: #d45122;
}
.btn-hide:hover {
  color: #fff;
  background-color: #15aa73;
  border-color: #15aa73;
}
.btn {
  width: 150px;
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
        v-for="stat of statChart"
        :key="stat.mainTitle"
        class="col-md-6 col-xl-4"
      >
        <StatChart
          :main-title="stat.mainTitle"
          :value="stat.value"
          :sub-value="stat.subValue"
          :chart-color="stat.chartColor"
          :image="stat.image"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-xl-5">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mt-0 pb-2 header-title">Calculate Score </h5>
              <form v-on:submit.prevent="getFinalScore()">
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
                <button type="submit" class="btnTlmtk btn-primary-Tlmtk" > 
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
      </div>
      <div class="col-xl-7">
        <div class="card">
          <div class="card-body" style="height:375px">
            <h1  v-if="finalscore"  style="color:red">Score  :  {{finalscoreres}}</h1>
             <h5  v-if="!finalscore" class="card-title mt-0 pb-2 header-title">Fill Up the Form and Let's see the score ! </h5>
            <div v-if="finalscore">
              <img  v-if="finalscoreres>5"    src="@assets/images/smile.png"   style="width:250px;height:250px;margin-left:200px;"  class="avatar rounded mr-3" alt="shreyu" />
              <img  v-if="finalscoreres == 5" src="@assets/images/unnamed.png" style="width:250px;height:250px;margin-left:220px;"  class="avatar rounded mr-3" alt="shreyu" />
              <img  v-if="finalscoreres<5 && finalscoreres >0"  src="@assets/images/sad.png"     style="width:250px;height:250px;margin-left:150px;"  class="avatar rounded mr-3" alt="shreyu" />
            </div>
            <div v-else>
                <img src="@assets/images/trophy.png" 
                class="avatar rounded mr-3" 
                alt="shreyu"
                style="width:300px;height:280px;margin-left:100px;"/>
             
             
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-show="showdetails">
      <div class="col-xl-6">
        <div class="card">
          <div class="card-body" style="height: 400px">
            <h4>Road Speed</h4>
            <SimplePieChart
              :series="simplePieChart.series"
              :labels="simplePieChart.labels"
            ></SimplePieChart>
          </div>
        </div>
      </div>
      <div class="col-xl-6">
        <div class="card">
          <div class="card-body" style="height: 400px">
            <h4>Other Information</h4>
            <apexchart
              type="bar"
              height="282"
              :series="targetsBarChart.series"
              :options="targetsBarChart.chartOptions"
            ></apexchart>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-show="showdetails">
      <div class="col-xl-6">
        <div class="card" style="height: 400px">
          <div class="card-body">
            <h5>Road Time</h5>
            <!-- Road Time  -->
            <SalesDonutChart
              :series="salesDonutChart.series"
              :labels="salesDonutChart.labels"
            ></SalesDonutChart>
            <!-- Road Time  -->
          </div>
        </div>
      </div>
      <div class="col-xl-6">
        <Overview :items="overviewData" style="height: 400px" />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="header-title mt-0 mb-1">Top 10 Drivers</h4>
            <p class="text-muted font-13 mb-4"></p>
            <div class="row mb-md-2">
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Show&nbsp;
                    <b-form-select
                      v-model="perPage"
                      size="sm"
                      :options="pageOptions"
                    ></b-form-select
                    >&nbsp;entries
                  </label>
                </div>
              </div>
              <!-- Search -->
              <div class="col-sm-12 col-md-6">
                <div
                  id="tickets-table_filter"
                  class="dataTables_filter text-md-right"
                >
                  <label class="d-inline-flex align-items-center">
                    Search:
                    <b-form-input
                      v-model="filter"
                      type="search"
                      placeholder="Search..."
                      class="form-control form-control-sm ml-2"
                    ></b-form-input>
                  </label>
                </div>
              </div>
              <!-- End search -->
            </div>
            <!-- Table -->
            <div class="table-responsive mb-0">
              <b-table
                :items="tableData"
                :fields="fields"
                responsive
                :per-page="perPage"
                :current-page="currentPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :filter="filter"
                :filter-included-fields="filterOn"
                @filtered="onFiltered"
              >
                <template #cell(score)="row">
                 {{ row.item.score }} /10 
                <span style="color: blue">  
                  <i v-if="row.item.score > 5"    class="uil uil-smile-beam"></i>    
                </span>
                <span style="color: green" >
                  <i  v-if="row.item.score == 5"  class="uil uil-meh-alt" ></i>
                </span>
                <span style="color: red">   
                  <i v-if="row.item.score< 5"     class="uil uil-sad-squint"></i>
                </span>
                </template>
                <template #cell(actions)="row">
                  <button
                    v-if="index1 != row.index"
                    type="button"
                    class="btn btn-show"
                    @click="showStatistics(row.item,row.index)"
                  >
                    Show statistics
                  </button>
                  <button
                    v-if="index1 == row.index"
                    type="button"
                    class="btn btn-hide"
                    @click="HideStatistics(true)"
                  >
                    Hide statistics
                  </button>
                </template>
              </b-table>
            </div>
            <div class="row">
              <div class="col">
                <div
                  class="dataTables_paginate paging_simple_numbers float-right"
                >
                  <ul class="pagination pagination-rounded mb-0">
                    <!-- pagination -->
                    <b-pagination
                      v-model="currentPage"
                      :total-rows="rows"
                      :per-page="perPage"
                    ></b-pagination>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

