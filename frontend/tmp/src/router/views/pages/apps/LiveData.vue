<script>
import Layout from '@layouts/main'
import PageHeader from '@components/page-header'
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import * as L1 from 'leaflet.markercluster'



export default {
  name: 'LiveData',
  components: { Layout, PageHeader ,L },
  data(){
    return {
       center   : [36.8062423, 10.1869993],
       map      : [],
       L        :[],
       options: [],
       userCars : {
        "data":{
        "21038":{
          "gps_longitude":10.187016666666667,
          "gps_heading":254.6,
          "adresse":"Rue El Bahja, Ariana Ville, Ariana",
          "mainpower":"1",
          "gps_altitude":"12",
          "gps_latitude":36.87251666666667,
          "name":"21038",
          "gps_speed":0,
          "rtc":1589369876000,
          "ignition":0,
          "motion":0,
          "mdmid":"013799001768045",
          "code_driver":false,
          "status_scooter":false},
          "20910":{
            "name":"20910",
            "gps_longitude":10.140433333333334,
            "gps_heading":301.9,
            "gps_speed":0,
            "rtc":1603289917000,
            "adresse":"Rue Ibn El Khatib, Cit\u00e9 Ibn Khaldoun, El Omrane Sup\u00e9rieur, Tunis",
            "mainpower":"1",
            "gps_altitude":"65",
            "gps_latitude":36.828833333333336,
            "ignition":1,
            "motion":1,
            "mdmid":"013799001702804",
            "code_driver":false,
            "status_scooter":false}
            ,"20914":{
              "gps_longitude":10.186883333333334,
              "gps_heading":0,"adresse":"Rue El Bahja, Ariana Ville, Ariana",
              "mainpower":"0",
              "gps_altitude":"6",
              "gps_latitude":36.87243333333333,
              "name":"20914",
              "gps_speed":0,
              "rtc":1598026053000,
              "ignition":0,
              "motion":0,
              "mdmid":"013799001767922",
              "code_driver":"285",
              "status_scooter":false
              },"20902":{
                "name":"20902",
                "gps_longitude":10.146433333333333,
                "gps_heading":188.5,
                "gps_speed":0,
                "rtc":1615347133000,
                "adresse":"Zaghouan, Zaghouan",
                "mainpower":"0",
                "gps_altitude":"162",
                "gps_latitude":36.4045,
                "ignition":0,
                "motion":0,
                "mdmid":"013799001702770",
                "code_driver":false,
                "status_scooter":false
                },
                "20945":{
                  "name":"20945",
                  "gps_longitude":10.059366666666667,
                  "gps_heading":41.8,
                  "gps_speed":33.891600000000004,
                  "rtc":1604504627000,
                  "adresse":"RN 5 \u0637\u0648, El Hrairia, Tunis",
                  "mainpower":"0",
                  "gps_altitude":"104",
                  "gps_latitude":36.77718333333333,
                  "ignition":0,
                  "motion":1,
                  "mdmid":"013799001675174",
                  "code_driver":false,
                  "status_scooter":false
                  },
                  "21041":{
                    "name":"21041",
                    "gps_longitude":10.186916666666667,
                    "gps_heading":175.8,
                    "gps_speed":0,
                    "rtc":1592843991000,
                    "adresse":"Rue El Bahja, Ariana Ville, Ariana",
                    "mainpower":"0",
                    "gps_altitude":"36",
                    "gps_latitude":36.8725,
                    "ignition":0,
                    "motion":1,
                    "mdmid":"013799001702648",
                    "code_driver":false,
                    "status_scooter":false
                    },
                    "20911":{
                      "gps_longitude":10.131683333333333,
                      "gps_heading":0,
                      "adresse":"Cit\u00e9 Ettahrir, El Omrane Sup\u00e9rieur, Tunis",
                      "mainpower":"1",
                      "gps_altitude":"61",
                      "gps_latitude":36.829633333333334,
                      "name":"20911",
                      "gps_speed":0,
                      "rtc":1601636259000,
                      "ignition":0,
                      "motion":0,
                      "mdmid":"013799001674144",
                      "code_driver":"283",
                      "status_scooter":false
                      },
                      "21034":{
                        "gps_longitude":10.186983333333334,
                        "gps_heading":95.3,
                        "adresse":"",
                        "mainpower":"1",
                        "gps_altitude":"18",
                        "gps_latitude":36.872483333333335,
                        "name":"21034",
                        "gps_speed":5.556,
                        "rtc":1598542481041,
                        "ignition":1,
                        "motion":1,
                        "mdmid":"013799001674037",
                        "code_driver":"303",
                        "status_scooter":false
                        },
                        "21047":{
                          "name":"21047",
                          "gps_longitude":0,
                          "gps_heading":0,
                          "gps_speed":0,
                          "rtc":1601377388000,
                          "adresse":"",
                          "mainpower":"1",
                          "gps_altitude":"9",
                          "gps_latitude":0,
                          "ignition":0,
                          "motion":0,
                          "mdmid":"013799001705369",
                          "code_driver":false,
                          "status_scooter":false
                          },
                          "21046":{
                            "name":"21046",
                            "gps_longitude":10.1839,
                            "gps_heading":101.3,
                            "gps_speed":0,
                            "rtc":1585984992000,
                            "adresse":"Raoued, Ariana",
                            "mainpower":"1",
                            "gps_altitude":"73",
                            "gps_latitude":36.900533333333335,
                            "ignition":0,
                            "motion":0,
                            "mdmid":"013799001674136",
                            "code_driver":false,
                            "status_scooter":false}
                            }
              },
    }
  },
  async mounted() {
     await this.setupLeafletMap() 
 
  
  },
  methods: {
      async setupLeafletMap() {
       this.map= L.map("livedata").setView(this.center, 13); //places the map in San Francisco.
         L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', { 
        attribution: 'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18, 
        id: 'mapbox/streets-v11', 
        accessToken: 'pk.eyJ1IjoiZmVyaWVsemFycm91a2kiLCJhIjoiY2tscng2bHBnMWg0ZTJvcW04eG1tdDQ3aiJ9.ZEcUfh7px2DYH7ZRGIBkgw' }).addTo(this.map);   
       this.DrawLiveCars()
    },
    async DrawLiveCars(){
    var carIcon = L.icon({
    iconUrl: '',
    shadowUrl: 'leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
      var markers = new L1.MarkerClusterGroup();    
      await  Object.values(this.userCars.data).forEach((e) => {
        let info={
          adresse:e.adresse,
          speed:e.gps_speed,
          name:e.name,   
        }
        markers.addLayer(L.marker([e.gps_latitude,e.gps_longitude])
        .bindPopup('Adresse :'+ info.adresse+' \n Speed :'+info.speed+'\n Name :'+info.name));
        this.map.addLayer(markers);
      })    
   
      markers.on('click', function (a) {
        console.log('marker ' + a.layer);
      });

      markers.on('clusterclick', function (a) {
        // a.layer is actually a cluster
        map.addLayer(L.polygon(a.layer.getConvexHull()));
        a.layer.zoomToBounds({padding: [20, 20]});
        console.log('cluster ' + a.layer.getAllChildMarkers().length);
      });
    
    
    }
  }
}
</script>

<style>
@import url('https://unpkg.com/leaflet@1.5.1/dist/leaflet.css');
#livedata {
  min-height: 600px;
  height: 100%;
  z-index: 10 !important;
}
 
</style>

<template>
  <Layout>
    <PageHeader />
       <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div id="livedata"></div>
            
            </div>
          </div>
        </div>
       </div>
  </Layout>
</template>
