<script>
import Layout from '@layouts/main'
import PageHeader from '@components/page-header'
import axios from 'axios'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import Multiselect from 'vue-multiselect'
import L from 'leaflet'
import LDraw from 'leaflet-draw'
import * as Vue2Leaflet from 'leaflet-control-geocoder'
import 'leaflet-control-geocoder/dist/Control.Geocoder'
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'
import { required, numeric } from 'vuelidate/lib/validators'
export default {
  name: 'LeafletMapView',
  components: { Layout, PageHeader, Multiselect, L },
  data() {
    return {
      center: [36.8062423, 10.1869993],
      lmap: [],
      polygon: [],
      L: [],
      editableLayers: [],
      drawControl: null,
      layer: null,
      layer_type: null,
      idpg: null,
      zoom: 10,
      showForm: false,
      geofence: {
        id: null,
        key: null,
        value: [],
      },
      edit: false,
      geojson: {},
      posts: {
        name: null,
        description: null,
        startTime: null,
        endTime: null,
        range: null,
        cars: [],
        type_fence: null,
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
      preload: {
        enableTime: true,
        noCalendar: true,
        dateFormat: 'H:i',
        defaultDate: '00:00',
        time_24hr: true,
      },
      option: [
        { value: true, text: 'IN' },
        { value: false, text: ' OUT' },
      ],
      options: [],
      idredis: null,
      value: [],
      updatefence: false,
      newgeo: {},
      cars: null,
      format24: null,
      descreption: '',
      name: '',
      range: '',
      CreateElementLayer: false,
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
      sortBy: 'age',
      sortDesc: false,
      geocoder: [],
      fields: [
        { key: 'car', label: 'car', sortable: true, editable: true },
        { key: 'name', label: 'Name', sortable: true, editable: true },
        {
          key: 'description',
          label: 'Descreption',
          sortable: true,
          editable: true,
        },
        {
          key: 'time_start',
          label: 'Time Start',
          sortable: true,
          editable: true,
        },
        { key: 'time_end', label: 'Time End', sortable: true, editable: true },
        { key: 'rang', label: 'Range', sortable: true, editable: true },
        { key: 'actions', label: 'Actions' },
      ],
    }
  },
  validations: {
    posts: {
      name: { required },
      description: { required },
      startTime: { required },
      endTime: { required },
      range: { required, numeric },
      cars: { required },
      type_fence: { required },
    },
  },
  async mounted() {
    await this.setupLeafletMap()
    // Set the initial number of items
    this.totalRows = this.items.length
    //await this.getUserCars()
    await this.getGeo()
    Object.keys(this.userCars.data).forEach((e) => this.options.push(`${e}`))
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
    async setupLeafletMap() {
      // Create the map
      this.polygon = L.polygon
      this.lmap = L.map('l-container').setView(this.center, this.zoom)
      // Set up the OSM layer
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution:
          '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.lmap)
      this.geocoderInit('add')
      // Initialise the FeatureGroup to store editable layers
      this.editableLayers = new L.FeatureGroup()
      this.lmap.addLayer(this.editableLayers)
      this.DrawControl('Add')
    },
    async geocoderInit(action) {
      if (action == 'add') {
        this.geocoder = L.Control.geocoder({
          defaultMarkGeocode: false,
        }).addTo(this.lmap)
        this.geocoder.on('markgeocode', (e) => {
          console.log('e', e)
          this.GeoCodec(e)
        })
      } else {
        this.geocoder.remove()
      }
    },
    //To Optimise
    async DrawControl(type) {
      if (this.drawControl) this.lmap.removeControl(this.drawControl)
      if (type == 'Add') {
        var drawPluginOptions = {
          position: 'topright',
          draw: {
            polyline: false,
            polygon: {
              allowIntersection: false, // Restricts shapes to simple polygons
              drawError: {
                color: '#0000ff', // Color the shape will turn when intersects
                message:
                  '<strong>Polygon draw does not allow intersections!<strong> (allow Intersection: false)', // Message that will show when intersect
              },
              shapeOptions: {
                color: '#0000ff',
              },
            },
            circle: true, // Turns off this drawing tool
            circlemarker: false,
            rectangle: {
              shapeOptions: {
                clickable: false,
              },
            },

            marker: false,
          },
          edit: {
            featureGroup: this.editableLayers,
            remove: true,
          },
        }
      } else if (type == 'View') {
        var drawPluginOptions = {
          position: 'topright',
          draw: {
            polyline: false,
            polygon: false,
            circle: false, // Turns off this drawing tool
            circlemarker: false,
            rectangle: false,
            marker: false,
          },
          edit: false,
        }
      } else {
        var drawPluginOptions = {
          position: 'topright',
          draw: {
            polyline: false,
            polygon: false,
            circle: false, // Turns off this drawing tool
            circlemarker: false,
            rectangle: false,
            marker: false,
          },
          edit: {
            featureGroup: this.editableLayers,
            remove: false,
          },
        }
      }
      // Initialise the draw control and pass it the FeatureGroup of editable layers
      this.drawControl = new L.Control.Draw(drawPluginOptions)
      this.lmap.addControl(this.drawControl)
      this.lmap.on('draw:created', async (e) => {
        this.geocoderInit()
        if (this.CreateElementLayer) {
          alert()
          return
        }
        this.CreateElementLayer = true
        this.showForm = true
        this.layer = e.layer
        if (e.layerType === 'circle') {
          let geo = {
            type: e.layerType,
            coordinates: Object.values({
              lat: e.layer._latlng.lat,
              lng: e.layer._latlng.lng,
              radius: e.layer._mRadius,
            }),
          }
          console.log('geojson', geo)
          this.geojson = geo
          this.layer_type = 'circle'
          this.circle = e.layer
        }

        if (e.layerType === 'rectangle' || e.layerType === 'polygon') {
          if (e.layerType === 'rectangle') {
            this.layer_type = 'rectangle'
          } else {
            this.layer_type = 'polygon'
          }

          let geo = {
            type: e.layerType,
            coordinates: e.layer._latlngs[0].map(function (obj) {
              return Object.keys(obj)
                .sort()
                .map(function (key) {
                  return obj[key]
                })
            }),
          }
          console.log('geojson', geo)
          this.geojson = geo
          if (e.layerType === 'rectangle') {
            this.rectangle = e.layer
          } else {
            this.polygon = e.layer
          }
        }
        if (e.layerType === 'marker') {
          this.layer.bindPopup('A popup!')
        }

        this.editableLayers.addLayer(this.layer)
      })
      console.log('this.updatefence', this.updatefence)
      this.lmap.on('draw:edited', (e) => {
        this.CreateElementLayer = true
        this.editShape = this.e

        console.log('this.layer_type', this.layer_type)
        //circle
        if (this.layer_type == 'circle') {
          console.log(
            'radius : ',
            e.layers._layers[Object.keys(e.layers._layers)]._mRadius
          )
          console.log(
            'lat: ',
            e.layers._layers[Object.keys(e.layers._layers)]._latlng.lat
          )
          console.log(
            'lng : ',
            e.layers._layers[Object.keys(e.layers._layers)]._latlng.lng
          )
          this.newgeo = {
            type: this.layer_type,
            coordinates: [
              e.layers._layers[Object.keys(e.layers._layers)]._latlng.lat,
              e.layers._layers[Object.keys(e.layers._layers)]._latlng.lng,
              e.layers._layers[Object.keys(e.layers._layers)]._mRadius,
            ],
          }
        } else {
          //polygon || Rectangle
          let latlngs = []
          console.log(e.layers._layers[Object.keys(e.layers._layers)])
          console.log(
            e.layers._layers[Object.keys(e.layers._layers)]._latlngs[0]
          )
          for (
            let i = 0;
            i <
            e.layers._layers[Object.keys(e.layers._layers)]._latlngs[0].length;
            i++
          ) {
            latlngs.push([
              e.layers._layers[Object.keys(e.layers._layers)]._latlngs[0][i]
                .lat,
              e.layers._layers[Object.keys(e.layers._layers)]._latlngs[0][i]
                .lng,
            ])
          }

          this.newgeo = {
            type: this.layer_type,
            coordinates: latlngs,
          }

          console.log('this.newgeo', this.newgeo)
        }
      })
      this.lmap.on('draw:deleted', (e) => {
        this.showForm = false
        this.CreateElementLayer = false
        this.geocoderInit('add')
      })
      //To check with nourredine why the executed 2 times
      this.lmap.on('draw:toolbaropened', (e) => {
        //this.$toast.warning(`You should save after editing fence or editing will be canceld`)
      })
      this.lmap.on('draw:editstart', (e) => {
        // this.$toast.warning(`You should save after editing fence or editing will be canceld`)
      })
    },
    async GeoCodec(e) {
      axios
        .get(
          `https://nominatim.openstreetmap.org/details?place_id=${e.geocode.properties.place_id}&polygon_geojson=1&format=json`
        )
        .then(async (response) => {
          console.log(response.data)
          let data = response.data
          this.showForm = true
          this.geojson = {
            type: `X${data.geometry.type}`,
            coordinates: data.geometry.coordinates[0],
          }
          console.log('coordinates type : ', data.geometry.type)
          console.log('place id  : ', data.place_id)
          console.log('coordinates: ', data.geometry.coordinates[0])
          let coordinates = data.geometry.coordinates[0]
          this.DrawGeocoder(coordinates)
        })
    },
    async getUserCars() {
      axios
        .get(
          'https://pro.sayarte.ch/intigo/livedata/?accesskey=intigo_90fd3a73dd5d4831a46cf2d7a378f8d674d0ec686be7ac9c16b4857ec318181eb706c6f143375245&fbclid=IwAR0bL5_JQungYQ5eCee8fwyOBL0AsnIYQ-5ew2f_0i2i1HImwwdaheuYmUU'
        )
        .then((response) => {
          console.log('********************** live data api ', response.data)
          this.userCars.data = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    InsertEndTime(Params) {
      this.posts.endTime = Params['__ob__'].value[0].getTime()
    },
    InsertStartTime(Params) {
      this.posts.startTime = Params['__ob__'].value[0].getTime()
    },
    ValidationsStatus(validation) {
      console.log('validation : ', validation)
      return typeof validation != 'undefined' ? validation.$error : false
    },
    PostGeofence() {
      this.$v.$touch()
      if (this.$v.$pending || this.$v.$error) return
      let data = {
        geojson: this.geojson,
        name: this.posts.name,
        description: this.posts.description,
        time_start: this.posts.startTime,
        time_end: this.posts.endTime,
        rang: this.posts.range,
        cars: this.posts.cars,
        type_fence: this.posts.type_fence,
      }

      console.log('data :', data)
      console.log('typeof(data.time_start) :', typeof data.time_start)
      //Test and put the data of fence
      axios
        .post('http://localhost:3000/api/geofence', data)
        .then((res) => {
          this.CreateElementLayer = false
          this.$toast.success(`cars add succefully into fence`)
          this.showForm = false
          this.getGeo()
          this.DrawControl('Add')
          this.clearMap(1000)
          console.log('res', res)
          this.geocoderInit('add')
          this.refershForm()
        })
        .catch(function (error) {
          console.log('error ', error)
        })
      return false
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    async getGeo() {
      axios
        .get('http://localhost:3000/api/get/geofence')
        .then((response) => {
          console.log('list of cars in fences ', response)
          this.tableData = response.data
          this.totalRows = this.tableData.length
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    Edit(id, item, pkey) {
      if (this.showForm) {
        this.showForm = false
        this.clearMap(1000)
      }
      this.geocoderInit()
      this.Show(id, true)
      this.edit = true
      this.idredis = id
      this.idpg = pkey
      //edit form data
      this.showForm = true
      this.posts.name = item.name
      this.posts.range = item.rang
      this.posts.description = item.description
      this.posts.startTime = item.time_start
      this.posts.endTime = item.time_end
      this.posts.type_fence = item.type_fence
      axios
        .get(`http://localhost:3000/get/cars/fence/${id}`)
        .then((res) => {
          console.log('res: ', res)
          this.posts.cars = res.data.map(function (obj) {
            return obj.car
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    Delete(id) {
      this.$swal
        .fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`http://localhost:3000/api/delete/geofence/${id}`)
              .then((res) => {
                this.getGeo()
                console.log(res)
              })
              .catch(function (error) {
                console.log(error)
              })
            this.$swal.fire('Deleted!', 'Car has been deleted.', 'success')
          }
        })
    },
    async Show(id, edit) {
      // This function will be executed in two case
      // 1-if we wanna show the fence ||   2-if we wanna edit the fence
      this.geocoder.remove()
      if (edit) {
        this.DrawControl('Edit')
      } else {
        this.showForm = false
        this.DrawControl('View')
      }
      axios
        .get(`http://localhost:3000/fences/${id}`)
        .then(async (res) => {
          console.log(res)
          let obj = res.data
          let type = Object.keys(obj)
          if (type[0].indexOf('X') > -1) {
            let val = Object.values(obj)
            var coordinates = JSON.parse(val[0])
            this.clearMap()
            this.DrawGeocoder(coordinates)
            this.DrawControl('View')
            if (!edit) this.refreshMap()
          }
          if (type[0] == 'rectangle' || type[0] == 'polygon') {
            let val = Object.values(obj)
            var coordinates = JSON.parse(val[0])
            console.log('val ', val)
            console.log('arr ', coordinates)
            //polygon
            if (type[0] == 'polygon') {
              this.clearMap()
              this.updatefence = true
              this.polygon = L.polygon(coordinates, {
                color: '#00f',
                fillOpacity: 0.3,
                fillColor: '#c2bfed',
              }).addTo(this.lmap)
              console.log('polygon bounds ', this.polygon.getBounds())
              this.lmap.fitBounds(this.polygon.getBounds())
              this.$toast.info(`Go to the map to see or edit position !`)
              this.editableLayers.addLayer(this.polygon)
              this.layer_type = 'polygon'
              if (!edit) this.refreshMap()
            }
            //Rectangle
            if (type[0] == 'rectangle') {
              this.clearMap()
              this.updatefence = true
              // create an orange rectangle
              this.rectangle = L.rectangle(coordinates, {
                color: '#ff7800',
                weight: 1,
              }).addTo(this.lmap)
              // zoom the map to the rectangle bounds
              this.lmap.fitBounds(this.rectangle.getBounds())
              this.$toast.info(`Go to the map to see or edit position !`)
              this.editableLayers.addLayer(this.rectangle)
              this.layer_type = 'rectangle'
              if (!edit) this.refreshMap()
            }
          }
          //Circle
          if (type == 'circle') {
            this.clearMap()
            this.updatefence = true
            let val = Object.values(obj)
            console.log('circle obj', val)
            var arr = JSON.parse(val[0])
            let radius = parseFloat(arr[2])
            this.circle = L.circle(
              [parseFloat(arr[0]), parseFloat(arr[1])],
              radius
            ).addTo(this.lmap)
            this.lmap.fitBounds(this.circle.getBounds())
            this.$toast.info(`Go to the map to see or edit position !`)
            this.editableLayers.addLayer(this.circle)
            this.layer_type = 'circle'
            if (!edit) this.refreshMap()
          }
          document.body.scrollTop = 0
          document.documentElement.scrollTop = 0
        })
        .catch(function (error) {
          console.log(error)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    //To Optimise
    /*   EditForm(item) {    
      console.log('item : ', item)
      console.log('posts : ', this.posts)
      let id = this.idredis
      //update fence and form
      console.log('this.newgeo',this.newgeo)
      if (!Object.entries(this.newgeo).length === 0) {
        let data = {
          geojson: [this.newgeo],
          name: item.name,
          description: item.description,
          time_start: item.startTime,
          time_end: item.endTime,
          rang: item.range,
          cars: item.cars,
          type_fence : item.type_fence
        }
        console.log(id, 'edit data ', data)
        this.geocoderInit("add")
        axios
          .put(`http://localhost:3000/fences/edit/${id}`,data)
          .then((res) => {
            console.log('res : ', res)
            this.showForm = false
            this.$toast.success(`Geofence Updated Successfully ! `)
            this.getGeo()
            this.DrawControl('ADD')
            this.clearMap(1000);
         
          })
          .catch(function(error) {
            console.log(error)
          })
      }
      //update only form
      else {
        let data = {
          name: item.name,
          description: item.description,
          time_start: item.startTime,
          time_end: item.endTime,
          rang: item.range,
          cars: item.cars,
          type_fence : item.type_fence
        }
        console.log(id, 'edit data only form  ', data)
        axios
          .put(`http://localhost:3000/fences/cars/edit/${id}`,data)
          .then((res) => {
            console.log(res.data)
            this.showForm = false
            this.$toast.success(`Geofence Updated Successfully ! `)
            this.clearMap(1000);
            this.getGeo()
            this.DrawControl(' this.clearMap();')    
          })
          .catch(function(error) {
            console.log(error)
          })
           
      }
       this.geocoderInit("add")
    }, */
    EditForm(item) {
      console.log('item : ', item)
      console.log('posts : ', this.posts)
      let id = this.idredis
      console.log('this.newgeo', this.newgeo)
      let data = {}
      let param = ''
      if (!Object.entries(this.newgeo).length === 0) {
        //update fence only form
        data = {
          name: item.name,
          description: item.description,
          time_start: item.startTime,
          time_end: item.endTime,
          rang: item.range,
          cars: item.cars,
          type_fence: item.type_fence,
        }
        param = 'f'
      } else {
        //update fence and form
        data = {
          geojson: [this.newgeo],
          name: item.name,
          description: item.description,
          time_start: item.startTime,
          time_end: item.endTime,
          rang: item.range,
          cars: item.cars,
          type_fence: item.type_fence,
        }
        param = 'ff'
      }
      axios
        .put(`http://localhost:3000/fences/edit/${id}/${param}`, data)
        .then((res) => {
          console.log('res : ', res)
          this.showForm = false
          this.$toast.success(`Geofence Updated Successfully ! `)
          this.getGeo()
          this.DrawControl('ADD')
          this.clearMap(1000)
          this.refreshMap()
          this.geocoderInit('add')
          this.refershForm()
        })
        .catch(function (error) {
          console.log(error)
        })
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
            this.showForm = false
            this.clearMap()
            this.geocoderInit('add')
            this.DrawControl('Add')
            this.refershForm()
            this.$swal.fire('Canceled!', 'Action has been canceled.', 'success')
          }
        })
    },
    DrawGeocoder(coordinates) {
      var coordinate = []
      if (coordinates.length == 1) {
        var j = 0
        for (var i in coordinates[j]) {
          coordinate[i] = [coordinates[j][i][1], coordinates[j][i][0]]
        }
        this.polygon = L.polygon(coordinate, {
          color: '#00f',
          fillOpacity: 0.2,
          fillColor: '#080afe',
        }).addTo(this.lmap)
        this.lmap.fitBounds(this.polygon.getBounds())
        this.$toast.info(`Go to the map to see or edit position !`)
      } else {
        //for (var j in coordinates) {
        var j = 0
        for (var i in coordinates) {
          coordinate[i] = [coordinates[i][1], coordinates[i][0]]
        }
        console.log(coordinate)
        this.polygon = L.polygon(coordinate, {
          color: '#080afe',
          fillOpacity: 0.2,
          fillColor: '#BFBFBF',
        }).addTo(this.lmap)
        console.log('polygon bounds ', this.polygon.getBounds())
        this.lmap.fitBounds(this.polygon.getBounds())
        this.$toast.info(`Go to the map to see or edit position !`)
        //}
      }
    },
    async clearMap() {
      console.log(this.circle, this.polygon, this.rectangle)
      if (this.circle) this.lmap.removeLayer(this.circle)
      if (this.polygon) this.lmap.removeLayer(this.polygon)
      if (this.rectangle) this.lmap.removeLayer(this.rectangle)
      this.geocoder.remove()
    },
    refreshMap() {
      setTimeout(() => {
        this.clearMap()
        this.geocoderInit('add')
        this.DrawControl('Add')
      }, 10000)
    },
    refershForm() {
      this.posts.name = ''
      this.posts.description = ''
      this.posts.startTime = '00:00'
      this.posts.endTime = '00:00'
      this.posts.range = ''
      this.posts.cars = []
      this.posts.type_fence = 'IN'
    },
  },
}
</script>

<style scoped>
.Btn-Action-green {
  font-size: 20px;
  color: #43d39e;
}
.Btn-Action-red {
  font-size: 20px;
  color: #ed1c24;
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
#l-container {
  min-height: 600px;
  height: 100%;
  z-index: 10 !important;
}
.multiselect--above .multiselect__content-wrapper {
  z-index: 999 !important;
}
.leaflet-control-geocoder {
  display: none;
}
.btn:not(:disabled):not(.disabled) {
  cursor: pointer;
  background-color: white;
  border: none;
}
</style>

<template>
  <Layout>
    <PageHeader />

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div id="l-container"> </div>
            <form v-on:submit.prevent="PostGeofence" v-show="showForm">
              <div class="row">
                <div class="col-lg-4">
                  <div class="card">
                    <div class="card-body">
                      <div class="form-group mb-3">
                        <input
                          v-model.trim="$v.posts.name.$model"
                          type="text"
                          placeholder="Name"
                          :maxlength="25"
                          class="form-control"
                          :class="{
                            'is-invalid': ValidationsStatus($v.posts.name),
                          }"
                        />
                        <div
                          class="invalid-feedback"
                          v-if="!$v.posts.name.required"
                        >
                          The Name field is required
                        </div>
                      </div>
                      <div class="form-group mb-3">
                        <textarea
                          v-model.trim="$v.posts.description.$model"
                          class="form-control"
                          :maxlength="225"
                          rows="3"
                          placeholder="description"
                          :class="{
                            'is-invalid': ValidationsStatus(
                              $v.posts.description
                            ),
                          }"
                        ></textarea>
                        <div
                          class="invalid-feedback"
                          v-if="!$v.posts.description.required"
                        >
                          The Descreption field is required
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="card">
                    <div class="card-body">
                      <h4 class="header-title mt-0 mb-1"></h4>
                      <div class="form-group mb-3">
                        <flat-pickr
                          v-model="$v.posts.startTime.$model"
                          :config="preload"
                          class="form-control"
                          @on-change="InsertStartTime"
                          placeholder="Time start"
                          :class="{
                            'is-invalid': ValidationsStatus($v.posts.startTime),
                          }"
                        ></flat-pickr>
                        <div
                          class="invalid-feedback is-invalid"
                          v-if="!$v.posts.startTime.required"
                        >
                          Time Start is required
                        </div>
                      </div>
                      <div class="form-group mb-3">
                        <flat-pickr
                          v-model="$v.posts.endTime.$model"
                          :config="preload"
                          class="form-control"
                          placeholder="Time End"
                          @on-change="InsertEndTime"
                          :class="{
                            'is-invalid': ValidationsStatus($v.posts.endTime),
                          }"
                        ></flat-pickr>
                        <div
                          class="invalid-feedback"
                          v-if="!$v.posts.endTime.required"
                        >
                          Time End is required
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="card">
                    <div class="card-body">
                      <div class="form-group mb-3">
                        <input
                          v-model.number="$v.posts.range.$model"
                          type="number"
                          placeholder="Range Meter"
                          class="form-control"
                          :class="{
                            'is-invalid': ValidationsStatus($v.posts.range),
                          }"
                        />
                        <div
                          class="invalid-feedback"
                          v-if="!$v.posts.range.required"
                        >
                          Range Value is required
                        </div>
                      </div>
                      <div class="form-group mt-3 mt-sm-0">
                        <multiselect
                          v-model="$v.posts.cars.$model"
                          :options="options"
                          :multiple="true"
                          :class="{
                            'is-invalid': ValidationsStatus($v.posts.cars),
                          }"
                        ></multiselect>
                        <div
                          class="invalid-feedback"
                          v-if="!$v.posts.cars.required"
                        >
                          Car is required
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="card">
                  <div class="card-body">
                    <div class="form-group mb-3">
                      <b-form-select
                        size="lg"
                        class="mb-2"
                        v-model="$v.posts.type_fence.$model"
                        :options="option"
                        :class="{
                          'is-invalid': ValidationsStatus($v.posts.type_fence),
                        }"
                      ></b-form-select>
                      <div
                        class="invalid-feedback"
                        v-if="!$v.posts.type_fence.required"
                      >
                        Type Fence is required
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-8 col-2"> </div>
                <div class="col-lg-2 col-5">
                  <button
                    v-if="!edit"
                    type="submit"
                    class="btnTlmtk btn-primary-Tlmtk"
                    >Submit</button
                  >
                  <button
                    v-else
                    @click="EditForm(posts)"
                    type="button"
                    class="btnTlmtk btn-primary-Tlmtk"
                    >Edit</button
                  >
                </div>
                <div class="col-lg-2 col-5">
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
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <h4 class="header-title mt-0 mb-1">List Cars In Fence</h4>
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
                    <template #cell(actions)="row">
                      <b-button @click="Show(row.item.id, false)">
                        <i class="uil uil-eye Btn-Action-green"></i>
                      </b-button>
                      <b-button
                        @click="Edit(row.item.id, row.item, row.item.pkey)"
                      >
                        <i class="uil uil-edit Btn-Action-green"></i>
                      </b-button>

                      <b-button @click="Delete(row.item.pkey)">
                        <i class="uil uil-trash-alt Btn-Action-red"></i>
                      </b-button>
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
      </div>
    </div>
  </Layout>
</template>
