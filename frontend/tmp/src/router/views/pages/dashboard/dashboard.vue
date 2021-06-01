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
      topTenPowerSaver:[],
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
              'Driver 10'
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

      ordersData: [],
      power_saver: {},
      nature_friend: {},
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
      data:[],
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

      classObject: [{ class: 'col-md-6 col-xl-4' }],
      salesDonutChart :{
  chartOptions: {
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
        },
        expandOnClick: false,
      },
    },
     basicBarChart: {
  series: [
    {
      data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
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
      categories: [
        'South Korea',
        'Canada',
        'United Kingdom',
        'Netherlands',
        'Italy',
        'France',
        'Japan',
        'United States',
        'China',
        'Germany',
      ],
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

    ,
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
    labels: ['Driver 1', 'Driver 2', 'Driver 3', 'Driver 4', 'Driver 5','Driver 6', 'Driver 7', 'Driver 8', 'Driver 9', 'Driver 10' ],
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
      overviewData: [],
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
    // Object.keys(this.userCars.data).forEach((e) => this.options.push(`${e}`))
       await this.natureFriend()
   await this.getTopTenDriver()
    await this.powerSaver()

    await this.getTopTrip();
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
    async getTopTrip(){
     axios.get('http://localhost:3000/ranks/top-trip').then(res=>{
       console.log('//////////////////////Top trip : ',res.data)
     })
    },
    async powerSaver() {
      axios
        .get('http://localhost:3000/ranks/power-saver')
        .then(async(res) => {
          this.power_saver = res.data
          console.log('@@@@@@@@@@@ powerSaver @@@@@@@@@@@', res.data)
        
          var i=1;
          while(i<=10){
          
            this.ordersData.push({
              "carname":res.data[`driver${i}`].PartitionKey._,
              "startdate":res.data[`driver${i}`].debut._,
              "enddate":res.data[`driver${i}`].fin._,
              "egt":res.data[`driver${i}`].engineRT._,
              "score":res.data[`driver${i}`].score._,
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
        var i=0;
         while(i<10){
          this.targetsBarChart.series[0].data[i]=res.data[`driver${i+1}`]["Idling"]._ 
          this.salesDonutChart.series.push(
           res.data[`driver${i+1}`]["Idling"]._ 
           
      )
         i++;
         }
         


        })
        .catch(function(error) {
          console.log(error)
        })
    },
    async getTopTenDriver() {
      axios
        .get('http://localhost:3000/ranks/top-ten')
        .then((res) => {
          console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&& Top Ten Drivers ', res.data)
          this.topTen = res.data
           this.overviewData.push({
            class: 'border-bottom py-4',
            icon: 'trending-up',
            value: res.data["driver1"].score._,
            title: 'Top Driver',
          })
          for (var i in res.data) {
            this.tableData.push({
              car: res.data[`${i}`].PartitionKey._,
              start_date: res.data[`${i}`].debut._,
              end_date: res.data[`${i}`].fin._,
              idling: res.data[`${i}`].Idling._,
              acceleration: res.data[`${i}`].Acceleration._,
              freinage: res.data[`${i}`].Freinage._,
              cornering: res.data[`${i}`].Cornering._,
              engine_runtime: res.data[`${i}`].engineRT._,
              milleage: res.data[`${i}`].Millage._,
              roadspped1: res.data[`${i}`].roadspeed_1._,
              roadspped2: res.data[`${i}`].roadspeed_2._,
              roadspped3: res.data[`${i}`].roadspeed_3._,
              roadTime1: res.data[`${i}`].roadtime_1._,
              roadTime2: res.data[`${i}`].roadtime_2._,
              roadTime3: res.data[`${i}`].roadtime_3._,
              score: res.data[`${i}`].score._,
            })
          }
          this.totalRows = this.tableData.length
        })
        .catch(function(error) {
          console.log(error)
        })
    },
 
  
    async showStatistics(driverscore, index) {
      console.log('########## driverscore #########', driverscore, index)
      this.index1 = index
      this.lastindex++
      this.showdetails = true

      if (this.lastindex > 1) {
        this.refreshCharts()
      }

      this.simplePieChart.labels.push('0-90 km/h', '90-120 km/h', '>120 km/h')
      this.salesDonutChart.labels.push(
        '2 AM : 4 PM',
        '4 PM : 8 PM',
        '8 PM : 2 AM'
      )

      //RoadSpeed data
      this.simplePieChart.series.push(
        driverscore.roadspped1,
        driverscore.roadspped2,
        driverscore.roadspped3
      )
      //RoadTime
     /*  this.salesDonutChart.series.push(
        driverscore.roadTime1,
        driverscore.roadTime2,
        driverscore.roadTime3
      ) */
      //Other Information
   /*   
    await this.targetsBarChart.series[0].data.push(
        driverscore.acceleration,
        driverscore.cornering,
        driverscore.freinage,
        driverscore.idling,
        driverscore.milleage
      )
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
      )
     
      */
     
     document.body.scrollTop = 600
      document.documentElement.scrollTop = 600
    },

    ValidationsStatus(validation) {
      console.log('validation : ', validation)
      return typeof validation != 'undefined' ? validation.$error : false
    },

    refreshCharts() {
      this.simplePieChart.labels = []
      this.simplePieChart.series = []
     /*  this.targetsBarChart.series.data = []
      this.targetsBarChart.chartOptions.labels = [] */
     // this.salesDonutChart.series = []
      this.overviewData = []
    },
    HideStatistics(param) {
      this.showdetails = !param
      this.index1 = null
      this.refreshCharts()
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

<!--  <div class="row" v-show="showdetails">
      <div class="col-xl-4">
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
      <div class="col-xl-5">
        <div class="card" style="height: 400px">
          <div class="card-body">
            <h5>Road Time</h5>
          
            <SalesDonutChart
              :series="salesDonutChart.series"
              :labels="salesDonutChart.labels"
            ></SalesDonutChart>
          
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-show="showdetails">
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
      <div class="col-xl-6">
        <Overview :items="overviewData" />
      </div>
    </div> -->

    <div class="row">
     <div class="col-xl-3">
				<Overview :items="overviewData" />
			</div>
      	<div class="col-xl-3">
				<div class="card">
					<div class="card-body pb-0">
						<h5 class="card-title header-title">Top 10 Nature Friend</h5>
						<!-- Target Radialbar chart -->
						<div class="mt-3">
							<apexchart
								type="bar"
								height="282"
								:series="targetsBarChart.series"
								:options="targetsBarChart.chartOptions"
							></apexchart>
						</div>
						<!-- end target chart -->
					</div>
				</div>
			</div> 
  <!--     <div class="col-xl-6">
				
						<apexchart
							height="380"
							type="bar"
							class="apex-charts"
							:series="basicBarChart.series"
							:options="basicBarChart.chartOptions"
						></apexchart>
					
			</div> -->
    </div>

		<div class="row">
			<div class="col-xl-5">
				<div class="card">
					<div class="card-body">
						<h5 class="card-title mt-0 pb-2 header-title">Top 10 Nature Friend</h5>
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
			<div class="col-xl-7">
				<div class="card">
					<div class="card-body">
						<a
							href="javascript: void(0);"
							class="btn btn-primary btn-sm float-right"
						>
							<i class="uil uil-export ml-1"></i> Export
						</a>
						<h5 class="card-title mt-0 mb-0 header-title">Top Ten Power Saver</h5>
						<div class="table-responsive mt-4 mb-0">
							<b-table-simple class="table table-hover table-nowrap mb-0">
								<b-thead class="thead-white">
									<b-tr>
										<b-th>Car Name</b-th>
										<b-th>Start Date</b-th>
										<b-th>End Date</b-th>
										<b-th>Engine Run Time</b-th>
										<b-th>Score</b-th>
									</b-tr>
								</b-thead>
								<b-tbody>
									<b-tr v-for="(order,index) in ordersData" :key="index">
										<b-td>{{ order.carname }}</b-td>
										<b-td>{{ order.startdate }}</b-td>
										<b-td>{{ order.enddate }}</b-td>
										<b-td>{{ order.egt }}</b-td>
										<b-td>
											<span
												class="badge"
												:class="{
													'badge-soft-warning': `${order.score}` < 5,
													'badge-soft-success':
														`${order.score}` > 5,
													'badge-soft-danger': `${order.score}` == 5 
                         
												}"
												
                        
												>{{ order.score }}</span
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
                    <i v-if="row.item.score > 5" class="uil uil-smile-beam"></i>
                  </span>
                  <span style="color: green">
                    <i v-if="row.item.score == 5" class="uil uil-meh-alt"></i>
                  </span>
                  <span style="color: red">
                    <i v-if="row.item.score < 5" class="uil uil-sad-squint"></i>
                  </span>
                </template>
                <template #cell(actions)="row">
                  <button
                    v-if="index1 != row.index"
                    type="button"
                    class="btn btn-show"
                    @click="showStatistics(row.item, row.index)"
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
