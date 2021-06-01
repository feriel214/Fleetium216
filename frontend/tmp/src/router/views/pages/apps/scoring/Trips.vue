<script>
import Layout from '@layouts/main'
import PageHeader from '@components/page-header'
import axios from 'axios'

export default {
  name: 'Trips',
  components: { Layout, PageHeader},
  data(){
    return {
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
       finalscoreres:null,
       format24: null,
      finalscore:false,
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
  mounted() {
   
      Object.keys(this.userCars.data).forEach((e) => this.options.push(`${e}`))
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
      InsertEndTime(Params) {
      console.log(' this.score.end', this.score.end)
      this.score.end = Params['__ob__'].value[0].getTime()
    },
    InsertStartTime(Params) {
      console.log(' this.score.start', this.score.start)
      this.score.start = Params['__ob__'].value[0].getTime()
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
     refershForm() {
      this.score.start = '00:00'
      this.score.end = '00:00'
      this.score.car = 'IN'
    },
   
  }
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
    <PageHeader   />
      <div id="trips">
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
         
      </div>
  </Layout>
</template>
