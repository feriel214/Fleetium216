<script>
import Layout from '@layouts/main'
import PageHeader from '@components/page-header'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet.markercluster'
import 'leaflet-rotatedmarker'
import axios from 'axios'
import Overview from '@components/overview'
import { todayTasks } from './data-tasklist'
//import markerIconPng from "leaflet/dist/images/marker-icon.png" 

export default {
  name: 'LiveData',
  components: { Layout, PageHeader, L, Overview },
  data() {
    return {
      center: [36.8062423, 10.1869993],
      map: [],
      index: 0,
      L: [],
      showCarInfo: false,
      options: [],
      useCustomIcons: true,
      eyeIcon: '"uil uil-meh-closed-eye',
      task: {},
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
            gps_longitude: 10.180266666666666,
            gps_heading: 14.5,
            gps_speed: 0,
            rtc: 1617554062000,
            adresse: 'Raoued, Ariana',
            mainpower: '1',
            gps_altitude: '17',
            gps_latitude: 36.878766666666664,
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
            gps_longitude: 10.1238,
            gps_heading: 0,
            adresse: "Jardin d'El Menzah 1, El Omrane Sup\u00e9rieur, Tunis",
            mainpower: '1',
            gps_altitude: '75',
            gps_latitude: 36.837133333333334,
            name: '20911',
            gps_speed: 0,
            rtc: 1616869489963,
            ignition: 0,
            motion: 0,
            mdmid: '013799001674144',
            code_driver: '283',
            status_scooter: false,
          },
          21034: {
            gps_longitude: 10.308766666666667,
            gps_heading: 195.6,
            adresse: 'Bou Mhel El Bassatine, Ben Arous',
            mainpower: '1',
            gps_altitude: '13',
            gps_latitude: 36.72923333333333,
            name: '21034',
            gps_speed: 0,
            rtc: 1617539643417,
            ignition: 0,
            motion: 0,
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
            rtc: 1618445783000,
            adresse: 'Raoued, Ariana',
            mainpower: '1',
            gps_altitude: '35',
            gps_latitude: 36.900533333333335,
            ignition: 1,
            motion: 1,
            mdmid: '013799001674136',
            code_driver: false,
            status_scooter: false,
          },
          20870: {
            name: '20870',
            gps_longitude: 10.186866666666667,
            gps_heading: 158.3,
            gps_speed: 0,
            rtc: 1594989570221,
            adresse: 'Rue El Bahja, Ariana Ville, Ariana',
            mainpower: '0',
            gps_altitude: '22',
            gps_latitude: 36.87253333333334,
            ignition: 0,
            motion: 0,
            mdmid: '013799001702762',
            code_driver: '295',
            status_scooter: false,
          },
          20909: {
            gps_longitude: 10.185883333333333,
            gps_heading: 288.7,
            adresse: 'El Mostaqbel, Ariana Ville, Ariana',
            mainpower: '1',
            gps_altitude: '16777146',
            gps_latitude: 36.87285,
            name: '20909',
            gps_speed: 0,
            rtc: 1618445512000,
            ignition: 1,
            motion: 1,
            mdmid: '013799001703372',
            code_driver: false,
            status_scooter: false,
          },
          21037: {
            name: '21037',
            gps_longitude: 10.187266666666666,
            gps_heading: 301.4,
            gps_speed: 0,
            rtc: 1599240975000,
            adresse: 'Rue De Parfin, Ariana Ville, Ariana',
            mainpower: '1',
            gps_altitude: '16777214',
            gps_latitude: 36.8721,
            ignition: 0,
            motion: 1,
            mdmid: '013799001674052',
            code_driver: false,
            status_scooter: false,
          },
          21042: {
            name: '21042',
            gps_longitude: 10.1202,
            gps_heading: 125.4,
            gps_speed: 36.114000000000004,
            rtc: 1596796689000,
            adresse: 'Avenue Mongi Slim, Cit\u00e9 Ettahrir, Ettahrir, Tunis',
            mainpower: '1',
            gps_altitude: '53',
            gps_latitude: 36.82695,
            ignition: 0,
            motion: 0,
            mdmid: '013799001674946',
            code_driver: false,
            status_scooter: false,
          },
          20904: {
            name: '20904',
            gps_longitude: 10.1652,
            gps_heading: 0,
            gps_speed: 0,
            rtc: 1618435331756,
            adresse: '',
            mainpower: '1',
            gps_altitude: '61',
            gps_latitude: 36.849666666666664,
            ignition: 1,
            motion: 1,
            mdmid: '013799001703505',
            code_driver: false,
            status_scooter: false,
          },
          20875: {
            gps_longitude: 10.186666666666667,
            gps_heading: 220.8,
            adresse: 'Ariana Ville, Ariana',
            mainpower: '1',
            gps_altitude: '16777076',
            gps_latitude: 36.87263333333333,
            name: '20875',
            gps_speed: 0,
            rtc: 1603891704000,
            ignition: 0,
            motion: 0,
            mdmid: '013799001705120',
            code_driver: '309',
            status_scooter: false,
          },
          21039: {
            gps_longitude: 10.186983333333334,
            gps_heading: 221.5,
            adresse: 'Rue El Itr, Ariana Ville, Ariana',
            mainpower: '1',
            gps_altitude: '16777211',
            gps_latitude: 36.87266666666667,
            name: '21039',
            gps_speed: 0,
            rtc: 946684961000,
            ignition: 1,
            motion: 1,
            mdmid: '013799001674177',
            code_driver: '289',
            status_scooter: false,
          },
          21152: {
            name: '21152',
            gps_longitude: 10.182983333333333,
            gps_heading: 0,
            gps_speed: 0,
            rtc: 1595699870000,
            adresse:
              'Rue de Syrie, La Fayette, Cit\u00e9 Mahraj\u00e8ne, Bab Bhar, Tunis',
            mainpower: '1',
            gps_altitude: '11',
            gps_latitude: 36.81433333333333,
            ignition: 0,
            motion: 0,
            mdmid: '013799001702697',
            code_driver: false,
            status_scooter: false,
          },
          'Ne marche plus 21033': {
            name: 'Ne marche plus 21033',
            gps_longitude: 10.183316666666666,
            gps_heading: 320.5,
            gps_speed: 0,
            rtc: 1581009224000,
            adresse: 'Avenue Jean Jaures, La Fayette, Bab Bhar, Tunis',
            mainpower: '0',
            gps_altitude: '117',
            gps_latitude: 36.80206666666667,
            ignition: 0,
            motion: 0,
            mdmid: '013799001703422',
            code_driver: false,
            status_scooter: false,
          },
          21040: {
            name: '21040',
            gps_longitude: 10.151083333333334,
            gps_heading: 11.5,
            gps_speed: 0,
            rtc: 1618570948171,
            adresse:
              "Route Nationale Num\u00e9ro 9, Cit\u00e9 Taeib M'hiri, Cit\u00e9 El Khadra, Tunis",
            mainpower: '1',
            gps_altitude: '125',
            gps_latitude: 36.862,
            ignition: 0,
            motion: 0,
            mdmid: '013799001703760',
            code_driver: false,
            status_scooter: false,
          },
          20873: {
            gps_longitude: 10.186933333333334,
            gps_heading: 308.7,
            adresse: '',
            mainpower: '1',
            gps_altitude: '16777207',
            gps_latitude: 36.87243333333333,
            name: '20873',
            gps_speed: 0,
            rtc: 1606953881881,
            ignition: 1,
            motion: 1,
            mdmid: '013799001702671',
            code_driver: false,
            status_scooter: false,
          },
          IMEI0431: {
            mdmid: '013799001750431',
            name: 'IMEI0431',
            ignition: 0,
            code_driver: false,
            status_scooter: false,
          },
          '20870-delete': {
            name: '20870-delete',
            gps_longitude: 10.167483333333333,
            gps_heading: 308.5,
            gps_speed: 35.0028,
            rtc: 1579872139000,
            adresse:
              'X2 / RL 451 \u0637\u0645, Mutuelleville, Cit\u00e9 Mahraj\u00e8ne, El Menzah, Tunis',
            mainpower: '0',
            gps_altitude: '28',
            gps_latitude: 36.84198333333333,
            ignition: 0,
            motion: 1,
            mdmid: '013799001702820',
            code_driver: false,
            status_scooter: false,
          },
          20878: {
            name: '20878',
            gps_longitude: 10.195183333333333,
            gps_heading: 143.5,
            gps_speed: 10.7416,
            rtc: 1615343064000,
            adresse: 'Ettaamir II, Ariana Ville, Ariana',
            mainpower: '1',
            gps_altitude: '11',
            gps_latitude: 36.86156666666667,
            ignition: 0,
            motion: 1,
            mdmid: '013799001750472',
            code_driver: false,
            status_scooter: false,
          },
          'Annul&eacute': {
            gps_longitude: 10.184583333333332,
            gps_heading: 14.5,
            adresse: 'RR 23 \u0637\u062c, Raoued Plage, Raoued, Raoued, Ariana',
            mainpower: '1',
            gps_altitude: '4',
            gps_latitude: 36.9482,
            name: 'Annul&eacute',
            gps_speed: 54.4488,
            rtc: 1576338872000,
            ignition: 0,
            motion: 1,
            mdmid: '013799001702747',
            code_driver: false,
            status_scooter: false,
          },
          20912: {
            name: '20912',
            gps_longitude: 10.202433333333333,
            gps_heading: 0,
            gps_speed: 0,
            rtc: 1617366157000,
            adresse:
              "Rue de l'Industrie, Cit\u00e9 El Khadra, Zone Industrielle La Charguia I, Cit\u00e9 El Khadra, Tunis",
            mainpower: '1',
            gps_altitude: '0',
            gps_latitude: 36.834966666666666,
            ignition: 0,
            motion: 0,
            mdmid: '013799001782319',
            code_driver: false,
            status_scooter: false,
          },
          'IVECO 4858': {
            gps_longitude: 10.155466666666667,
            gps_heading: 0,
            adresse:
              'Rue Ibn Hasm El Andaloussi, \u0627\u0644\u0645\u0646\u0632\u0647 7, Ariana Ville, Ariana',
            mainpower: '1',
            gps_altitude: '72',
            gps_latitude: 36.853,
            name: 'IVECO 4858',
            gps_speed: 0,
            rtc: 1619487404001,
            ignition: 0,
            motion: 0,
            mdmid: '013799001702713',
            code_driver: false,
            status_scooter: false,
          },
          21045: {
            name: '21045',
            gps_longitude: 10.18665,
            gps_heading: 0,
            gps_speed: 0,
            rtc: 1618436569000,
            adresse: 'Ariana Ville, Ariana',
            mainpower: '1',
            gps_altitude: '17',
            gps_latitude: 36.87255,
            ignition: 0,
            motion: 1,
            mdmid: '013799001702705',
            code_driver: '1755',
            status_scooter: false,
          },
          21043: {
            gps_longitude: 10.1017,
            gps_heading: 244,
            adresse: '',
            mainpower: '1',
            gps_altitude: '45',
            gps_latitude: 36.8285,
            name: '21043',
            gps_speed: 0,
            rtc: 1600582900516,
            ignition: 0,
            motion: 0,
            mdmid: '013799001702788',
            code_driver: '307',
            status_scooter: false,
          },
          20900: {
            gps_longitude: 10.498216666666666,
            gps_heading: 0,
            adresse: 'VERS MAHROUGA, El Merania, Agareb, Sfax',
            mainpower: '1',
            gps_altitude: '98',
            gps_latitude: 34.74985,
            name: '20900',
            gps_speed: 0,
            rtc: 1618225903000,
            ignition: 0,
            motion: 0,
            mdmid: '013799001705450',
            code_driver: '1881',
            status_scooter: false,
          },
          20906: {
            name: '20906',
            gps_longitude: 10.1868,
            gps_heading: 235.2,
            gps_speed: 0,
            rtc: 1598455085000,
            adresse: 'Rue El Bahja, Ariana Ville, Ariana',
            mainpower: '1',
            gps_altitude: '8',
            gps_latitude: 36.8724,
            ignition: 1,
            motion: 1,
            mdmid: '013799001782665',
            code_driver: false,
            status_scooter: false,
          },
          20901: {
            gps_longitude: 10.13695,
            gps_heading: 138.3,
            adresse: '',
            mainpower: '1',
            gps_altitude: '60',
            gps_latitude: 36.8186,
            name: '20901',
            gps_speed: 0,
            rtc: 1586439261187,
            ignition: 0,
            motion: 0,
            mdmid: '013799001702721',
            code_driver: false,
            status_scooter: false,
          },
          20905: {
            name: '20905',
            gps_longitude: 10.186933333333334,
            gps_heading: 0,
            gps_speed: 0,
            rtc: 1588248055000,
            adresse: 'Rue El Bahja, Ariana Ville, Ariana',
            mainpower: '0',
            gps_altitude: '12',
            gps_latitude: 36.87238333333333,
            ignition: 0,
            motion: 0,
            mdmid: '013799001674888',
            code_driver: '297',
            status_scooter: false,
          },
          20872: {
            gps_longitude: 10.212216666666666,
            gps_heading: 0,
            adresse: 'Avenue Taieb Mhiri, Ettaamir II, Ariana Ville, Ariana',
            mainpower: '1',
            gps_altitude: '9',
            gps_latitude: 36.86075,
            name: '20872',
            gps_speed: 0,
            rtc: 1619487546706,
            ignition: 0,
            motion: 0,
            mdmid: '013799001778747',
            code_driver: '108',
            status_scooter: false,
          },
          20899: {
            name: '20899',
            gps_longitude: 10.18695,
            gps_heading: 0.8,
            gps_speed: 0,
            rtc: 1601548655000,
            adresse: 'Rue El Bahja, Ariana Ville, Ariana',
            mainpower: '1',
            gps_altitude: '9',
            gps_latitude: 36.87255,
            ignition: 0,
            motion: 1,
            mdmid: '013799001674060',
            code_driver: '323',
            status_scooter: false,
          },
          'DACIA 558': {
            gps_longitude: 10.142383333333333,
            gps_heading: 0,
            adresse: 'Avenue Habib Bourguiba, Le Bardo, Tunis',
            mainpower: '1',
            gps_altitude: '25',
            gps_latitude: 36.81131666666667,
            name: 'DACIA 558',
            gps_speed: 0,
            rtc: 1619487627579,
            ignition: 0,
            motion: 0,
            mdmid: '013799001703323',
            code_driver: '291',
            status_scooter: false,
          },
          20883: {
            gps_longitude: 10.187083333333334,
            gps_heading: 219.1,
            adresse: 'Rue El Bahja, Ariana Ville, Ariana',
            mainpower: '1',
            gps_altitude: '8',
            gps_latitude: 36.87245,
            name: '20883',
            gps_speed: 0,
            rtc: 1618435976000,
            ignition: 1,
            motion: 1,
            mdmid: '013799001706334',
            code_driver: false,
            status_scooter: false,
          },
          20876: {
            name: '20876',
            gps_longitude: 10.5993,
            gps_heading: 0,
            gps_speed: 0,
            rtc: 1616870375000,
            adresse:
              'Boulevard Abdelkader Daghrir, Cit\u00e9 Riadh, Hammam Sousse, Sousse',
            mainpower: '1',
            gps_altitude: '26',
            gps_latitude: 35.852016666666664,
            ignition: 1,
            motion: 1,
            mdmid: '013799001706367',
            code_driver: false,
            status_scooter: false,
          },
          20898: {
            gps_longitude: 0,
            gps_heading: 0,
            adresse: '',
            mainpower: '1',
            gps_altitude: '64',
            gps_latitude: 0,
            name: '20898',
            gps_speed: 0,
            rtc: 946684808000,
            ignition: 1,
            motion: 1,
            mdmid: '013799001706284',
            code_driver: false,
            status_scooter: '3',
          },
          20913: {
            gps_longitude: 10.187483333333333,
            gps_heading: 97.8,
            adresse: 'Rue La Galit\u00e9, Ariana Ville, Ariana',
            mainpower: '1',
            gps_altitude: '16777215',
            gps_latitude: 36.87235,
            name: '20913',
            gps_speed: 0,
            rtc: 946684810000,
            ignition: 1,
            motion: 1,
            mdmid: '013799001782327',
            code_driver: '293',
            status_scooter: false,
          },
          20907: {
            name: '20907',
            gps_longitude: 10.178966666666666,
            gps_heading: 7.6,
            gps_speed: 0,
            rtc: 1596286737990,
            adresse: '',
            mainpower: '0',
            gps_altitude: '11',
            gps_latitude: 36.80845,
            ignition: 0,
            motion: 0,
            mdmid: '013799001706458',
            code_driver: '311',
            status_scooter: false,
          },
          20871: {
            gps_longitude: 10.101833333333333,
            gps_heading: 179,
            adresse: '',
            mainpower: '1',
            gps_altitude: '79',
            gps_latitude: 36.828466666666664,
            name: '20871',
            gps_speed: 0,
            rtc: 1586354901100,
            ignition: 0,
            motion: 0,
            mdmid: '013799001782368',
            code_driver: '279',
            status_scooter: false,
          },
          20877: {
            name: '20877',
            gps_longitude: 0,
            gps_heading: 0,
            gps_speed: 0,
            rtc: 1587027379537,
            adresse: '',
            mainpower: '1',
            gps_altitude: '2',
            gps_latitude: 0,
            ignition: 0,
            motion: 1,
            mdmid: '013799001775719',
            code_driver: '161',
            status_scooter: false,
          },
          21151: {
            name: '21151',
            gps_longitude: 10.1868,
            gps_heading: 0,
            gps_speed: 0,
            rtc: 946684809000,
            adresse: 'Ariana Ville, Ariana',
            mainpower: '0',
            gps_altitude: '15',
            gps_latitude: 36.87266666666667,
            ignition: 1,
            motion: 1,
            mdmid: '013799001750456',
            code_driver: false,
            status_scooter: false,
          },
          20874: {
            gps_longitude: 10.196083333333334,
            gps_heading: 0,
            adresse: '',
            mainpower: '1',
            gps_altitude: '36',
            gps_latitude: 36.75301666666667,
            name: '20874',
            gps_speed: 0,
            rtc: 1592260388483,
            ignition: 0,
            motion: 0,
            mdmid: '013799001673930',
            code_driver: false,
            status_scooter: false,
          },
          21036: {
            gps_longitude: 10.186883333333334,
            gps_heading: 102.1,
            adresse: 'Rue El Bahja, Ariana Ville, Ariana',
            mainpower: '0',
            gps_altitude: '13',
            gps_latitude: 36.87251666666667,
            name: '21036',
            gps_speed: 0,
            rtc: 1618442298000,
            ignition: 0,
            motion: 0,
            mdmid: '013799001750449',
            code_driver: false,
            status_scooter: false,
          },
          20908: {
            gps_longitude: 10.186966666666667,
            gps_heading: 85.2,
            adresse: 'Rue El Bahja, Ariana Ville, Ariana',
            mainpower: '1 ',
            gps_altitude: '7',
            gps_latitude: 36.87245,
            name: '20908',
            gps_speed: 0,
            rtc: 1618443691000,
            ignition: 0,
            motion: 0,
            mdmid: '013799001705468',
            code_driver: false,
            status_scooter: false,
          },
          21033: {
            name: '21033',
            gps_longitude: 10.195183333333333,
            gps_heading: 357.9,
            gps_speed: 0.5556,
            rtc: 1581875830000,
            adresse: 'Ettaamir II, Ariana Ville, Ariana',
            mainpower: '0',
            gps_altitude: '18',
            gps_latitude: 36.86156666666667,
            ignition: 1,
            motion: 1,
            mdmid: '013799001702754',
            code_driver: '277',
            status_scooter: false,
          },
          200754: { code_driver: false, status_scooter: false },
          20897: {
            name: '20897',
            gps_longitude: 10.125616666666666,
            gps_heading: 141.1,
            gps_speed: 0,
            rtc: 1617570696000,
            adresse: 'Cit\u00e9 Ettahrir, El Omrane Sup\u00e9rieur, Tunis',
            mainpower: '1',
            gps_altitude: '5',
            gps_latitude: 36.8327,
            ignition: 0,
            motion: 0,
            mdmid: '013799001706292',
            code_driver: false,
            status_scooter: false,
          },
          20880: {
            gps_longitude: 10.186833333333333,
            gps_heading: 35.3,
            adresse: 'Rue El Bahja, Ariana Ville, Ariana',
            mainpower: '0',
            gps_altitude: '4',
            gps_latitude: 36.87245,
            name: '20880',
            gps_speed: 0,
            rtc: 1594034157000,
            ignition: 0,
            motion: 0,
            mdmid: '013799001673948',
            code_driver: '301',
            status_scooter: false,
          },
        },
      },
      overviewData: [],
      tableData: [],
      classObject: [{ class: 'col-md-6 col-xl-3' }],
      title: 'Advanced Tables',
      items: [],
      widgetData: [],
      filter: '',
      filterOn: [],
      showdetails: false,
      statData: [],
      todayTasks: [...todayTasks],
      strokedCircularGuage: {
        chartOptions: {
          plotOptions: {
            radialBar: {
              startAngle: -135,
              endAngle: 135,
              dataLabels: {
                name: {
                  fontSize: '16px',
                  color: undefined,
                  offsetY: 120,
                },
                value: {
                  offsetY: 76,
                  fontSize: '22px',
                  color: undefined,
                  formatter(val) {
                    return val + '%'
                  },
                },
              },
            },
          },
          fill: {
            gradient: {
              enabled: true,
              shade: 'dark',
              shadeIntensity: 0.15,
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 50, 65, 91],
            },
          },
          stroke: {
            dashArray: 4,
          },
          colors: ['#f46a6a'],
          labels: ['Median Ratio'],
          responsive: [
            {
              breakpoint: 380,
              options: {
                chart: {
                  height: 280,
                },
              },
            },
          ],
        },
        series: [67],
      },
      selected:{},
      filterOptions:['carson','carsoff','mainpoweron','mainpoweroff']
    
    }
  },
  computed: {
    filterdItems() {
      return this.tableData.filter((data) => {
        return (
          data.adresse.toLocaleLowerCase().includes(this.filter) ||
          data.name.toLocaleLowerCase().includes(this.filter)
        )
      })
    },
    carsfilter(){
        return  this.tableData.filter((value) => {
        return  value.ignition==1 
      })
    }

  },
  async mounted() {
    // Set the initial number of items
    this.getLiveCars()
    this.totalRows = this.items.length
    await this.setupLeafletMap()
    await Object.values(this.userCars.data).forEach((e) => {
      if (e.name.length > 0) {
        e.assignee_avatar = require('../../../../assets/images/car2.png')
        this.tableData.push(e)
      }
    })
 await this.carsfilter();
    this.statData.push(
      {
        title: 'Car Name',
        value: 'tessssssssst',
        icon: 'truck',
        color: '#DC143C',
      },
      {
        title: 'Code Driver ',
        value: 'info.code_driver',
        icon: 'user',
        color: '#66CDAA',
      }
    )
   
  },
  methods: {
      refreshFilter(e){
      console.log('###############################')
      console.log('event',e)
        console.log(this.selected)
    },
    async setupLeafletMap() {
      this.map = L.map('livedata').setView(this.center, 13) //places the map in San Francisco.
      L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
        {
          attribution:
            'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 20,
          id: 'mapbox/streets-v11',
          accessToken:
            'pk.eyJ1IjoiZmVyaWVsemFycm91a2kiLCJhIjoiY2tscng2bHBnMWg0ZTJvcW04eG1tdDQ3aiJ9.ZEcUfh7px2DYH7ZRGIBkgw',
        }
      ).addTo(this.map)
      setTimeout(() => {
        this.DrawLiveCars()
      }, 5000)
    },
    async DrawLiveCars() {
      var carIcon = L.icon({
        iconUrl: require('../../../../assets/images/car2.png'),
        iconSize: [50, 50], // size of the icon
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
      })
      var markers = new L.MarkerClusterGroup()
      console.log(this.showCarInfo)
      await Object.values(this.userCars.data).forEach((e) => {
        let info = {
          name: e.name,
          adresse: e.adresse,
          code_driver: e.code_driver,
          position:
            String(e.gps_latitude).substr(0, 10) +
            '°\n' +
            String(e.gps_longitude).substr(0, 10) +
            '°',
          speed: e.gps_speed,
          angle: String(e.gps_altitude).substr(0, 10) + '°',
          ignition: e.ignition,
          mainpower: e.mainpower,
          motion: e.motion,
          rtc: e.rtc,
        }

        markers.addLayer(
          L.marker([e.gps_latitude, e.gps_longitude], {
            rotationAngle: e.gps_heading,
            icon: carIcon,
          })
            .bindPopup(
              '<table><tr><td>Name : </td><td>' +
                info.name +
                '</td></tr><tr>' +
                '<td>Speed : </td><td>' +
                info.speed +
                '</td></tr><tr>' +
                '<td> Adresse : </td><td>' +
                info.adresse +
                '</td></tr><table>'
            )
            .openPopup()
            .on('click', async (e) => {
              console.log('click')
              console.log('info', info)

              this.statData.push(
                {
                  title: 'Car Name',
                  value: info.name,
                  icon: 'truck',
                  color: '#DC143C',
                },
                {
                  title: 'Code Driver ',
                  value: info.code_driver,
                  icon: 'user',
                  color: '#66CDAA',
                },
                {
                  title: 'Speed',
                  value: info.gps_speed,
                  icon: 'clock',
                  color: '#FF0000',
                },
                {
                  title: 'Angle',
                  value: info.angle,
                  icon: 'activity',
                  color: '#D2691E',
                },
                {
                  title: 'Ignition',
                  value: info.ignition,
                  icon: 'key',
                  color: '#20B2AA',
                },
                {
                  title: 'Mainpower',
                  value: info.mainpower,
                  icon: 'battery',
                  color: '#A52A2A',
                },
                {
                  title: 'Motion',
                  value: info.motion,
                  icon: 'navigation',
                  color: '#FF4500',
                },
                { title: 'Rtc', value: info.rtc, icon: 'code', color: 'pink' },
                {
                  title: 'Adresse',
                  value: info.adresse,
                  icon: 'home',
                  color: '#9370DB',
                },
                {
                  title: 'Position',
                  value: info.position,
                  icon: 'map-pin',
                  color: '#4682B4',
                }
              )
              this.showCarInfo = true
              this.perPage = 15
            })
            .on('popupclose', (e) => {
              this.statData = []
              this.showCarInfo = false
              this.perPage = 5
            })
        )

        this.map.addLayer(markers)
      })

      markers.on('clusterclick', function(a) {
        alert('clusterclick Clicked')
        a.layer.zoomToBounds({ padding: [20, 20] })
        console.log('cluster ' + a.layer.getAllChildMarkers().length)
      })
      markers.on('click', function(a) {
        alert('Marker Clicked')
      })
    },
    onPreviewClick(value, index, item) {
      console.log('value', value, 'index', index, 'item', item)
    },
    getLiveCars() {
      axios.get(
        'https://pro.sayarte.ch/intigo/livedata/?accesskey=intigo_90fd3a73dd5d4831a46cf2d7a378f8d674d0ec686be7ac9c16b4857ec318181eb706c6f143375245',
        { withCredentials: true }
      )
    },
    async MoreDetails(task) {
      this.index++
      this.showdetails = true
      console.log('Task', task)
      let info = {
        adresse: task.adresse,
        assignee_avatar: '/img/car2.8224a149.png',
        code_driver: task.code_driver,
        position: String(task.gps_latitude + task.gps_latitude),
        gps_speed: task.gps_speed,
        ignition: task.ignition,
        mainpower: task.mainpower,
        mdmid: task.mdmid,
        motion: task.motion,
        gps_altitude: task.gps_altitude,
        name: task.name,
        gps_longitude: task.gps_longitude,
        gps_latitude: task.gps_latitude,
        rtc: task.rtc,
        status_scooter: task.status_scooter,
      }
      this.overviewData.push(
        {
          class: 'py-3 border-bottom',
          icon: require('../../../../assets/images/driver-icon.png'),
          value:
            task.code_driver == false ? 'Not available ' : task.code_driver,
          title: 'Code Driver',
        },
        {
          class: 'py-3 border-bottom',
          icon: require('../../../../assets/images/car-pos.png'),
          value:
            String(task.gps_latitude).substr(0, 6) +
            '°\n' +
            String(task.gps_longitude).substr(0, 6) +
            '°',
          title: 'Position',
        },
        {
          class: 'py-3 border-bottom',
          icon: require('../../../../assets/images/speed1.png'),
          value: task.gps_speed + 'km/h',
          title: 'Speed',
        },
        {
          class: 'py-3 border-bottom',
          icon: require('../../../../assets/images/mpow.png'),
          value: task.mainpower,
          title: 'Mainpower',
        },
        {
          class: 'py-3 border-bottom',
          icon: require('../../../../assets/images/alt.png'),
          value: task.gps_altitude + ' meter',
          title: 'Altitude',
        },
        {
          class: 'py-3 border-bottom',
          icon: require('../../../../assets/images/mdmid.png'),
          value: task.mdmid,
          title: 'Mdmid ',
        }
      )
      this.task = info
    },
    TimeToDate(unixTimestamp) {
      var date = new Date(parseFloat(unixTimestamp))

      return (
        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
        '/' +
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) +
        '/' +
        date.getFullYear() +
        ' ' +
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
        ':' +
        (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
        ':' +
        (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      )
    },
    CloseDetails() {
      this.showdetails = false
    },
    async getLastSore(idcar) {
      axios.get('').then((res) => {
        this.strokedCircularGuage.series = 0
      })
    },
    refreshDetails() {
      if (this.index != 0) {
        this.task = {}
      }
    },
  },
}
</script>
<style scoped>
@import url('https://unpkg.com/leaflet@1.5.1/dist/leaflet.css');
.header-title {
  margin-left: 20px;
  font-size: 1.04rem;
  font-weight: 700;
  margin-top: 15px;
}
.left-side-menu-dark .left-side-menu {
    z-index: 200!important; 
}
.icon-dual .feather {
  color: #f8f9fa;
  fill: rgba(108, 117, 125, 0.12);
}
#livedata {
  height: 600px;
  z-index: 10 !important;
}
.picCars {
  background-image: url('../../../../assets/images/kia.png');
  width: 50px;
  height: 50px;
  background-position: center;
  background-size: cover;
  background-size: contain;
  background-repeat: no-repeat;
  border: 1px solid #eee;
  border-radius: 50%;
}
.left-side-menu-condensed .content-page {
  margin-left: 70px !important;
  background-color: white;
}
.left-side-menu-condensed .left-side-menu {
  z-index: 500 !important;
}
.leaflet-popup-content-wrapper {
  padding: 1px;
  text-align: left;
  font-size: 11px;
}
.page-title {
  padding: 0px 0;
}
.list-group-item {
  border: none;
}

.sec {
  position: relative;
  right: -13px;
  top: -22px;
}

.counter.counter-lg {
  top: -24px !important;
}
.tabs-car-details {
  width: 300px;
  height: 600px;
  z-index: 600;
  position: absolute;
  top: 0;
  left: 470px;
  background-color: white;
}
.nav-pills {
  background-color: #6c757d;
  padding: 6px 2px;
}
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #6c757d;
}
.media {
  background-color: #6c757d;
  height: 100px;
}
.avatar-lg {
  margin-top: 15px;
  margin-left: 15px;
  width: 4.5rem;
  height: 4.5rem;
}
.mt-2,
.my-2 {
  margin-top: 30px !important;
  color: #f8f9fa !important;
}
.color-icon {
  color: #f6f6f7 !important;
}
.details-car[data-v-15a967ba] {
  background-color: white !important;
  height: 66px;
  margin-left: -20px;
}

.Ign-on {
  color: #31a24c !important;
}
.Ign-off {
  color: #ed1c25 !important;
}
.custom-control {
    margin-left: 10px;
 
}
.custom-control-label::after{
    background-color:#6c757d!important;
}
</style>

<template>
  <Layout>
    <PageHeader />
    <div class="row" style="background-color: white;">
      <div class="col-4" style="background-color: white;">
        <div class="tabs-car-details" v-show="showdetails">
          <div>
            <div class="media">
              <div class="picCars avatar-lg rounded-circle mr-2"> </div>
              <span
                v-if="task.ignition == 0"
                style="
                  position: relative;
                  background: rgb(237, 28, 37);
                  border-radius: 50%;
                  width: 15px;
                  height: 15px;
                  left: -80px;
                  top: 19px;
                  border: 1px solid rgb(238, 238, 238);
                  display: block;
                "
              ></span>
              <span
                v-if="task.ignition == 1"
                style="
                  position: relative;
                  background-color: #31a24c;
                  border-radius: 50%;
                  width: 15px;
                  height: 15px;
                  left: -80px;
                  top: 19px;
                  border: 1px solid rgb(238, 238, 238);
                  display: block;
                "
              ></span>
              <div class="media-body">
                <h5 class="mt-2 mb-0">{{ task.name }}</h5>
                <h6
                  class="text-muted font-weight-normal mt-1 mb-4"
                  style="color: #f8f9fa !important"
                  >{{ task.adresse }}</h6
                >
              </div>
              <span style="color: red"
                ><feather
                  type="x"
                  class="color-icon"
                  @click="CloseDetails()"
                ></feather
              ></span>
            </div>
          </div>
          <div>
            <b-tabs pills justified class="navtab-bg">
              <b-tab title="Details" style="margin-left: 20px" active>
                <div class="card">
                  <div class="card-body pt-2">
                    <!-- Mdmid -->
                    <div class="media px-3 pt-3 details-car">
                      <div class="media-body">
                        <h4 class="mt-0 mb-1 font-size-22">Mdmid</h4>
                        <span class="text-muted">{{ task.mdmid }}</span>
                      </div>
                      <i class="uil uil-lock-alt" style="font-size: 24px"></i>
                    </div>
                    <!-- Code Driver -->
                    <div class="media px-3 py-3 border-bottom details-car">
                      <div class="media-body">
                        <h4 class="mt-0 mb-1 font-size-22">Code Driver</h4>
                        <span class="text-muted">{{ task.code_driver }}</span>
                      </div>
                      <i class="uil uil-user" style="font-size: 24px"></i>
                    </div>

                    <!--Position-->
                    <div class="media px-3 py-3 border-bottom details-car">
                      <div class="media-body">
                        <h4 class="mt-0 mb-1 font-size-22"> Position </h4>
                        <span class="text-muted">
                          {{
                            String(task.gps_latitude).substr(0, 6) +
                              '°\n' +
                              String(task.gps_longitude).substr(0, 6) +
                              '°'
                          }}</span
                        >
                      </div>
                      <a
                        :href="
                          'https://www.google.com/maps/@' +
                            task.gps_latitude +
                            ',' +
                            task.gps_longitude +
                            'z'
                        "
                      >
                        <i
                          class="uil uil-location-arrow"
                          style="
                            font-size: 24px;
                            margin-left: 8px;
                            margin-top: 3px;
                          "
                        ></i>
                      </a>
                    </div>

                    <!-- speed -->
                    <div class="media px-3 py-3 border-bottom details-car">
                      <div class="media-body">
                        <h4 class="mt-0 mb-1 font-size-22"> Speed</h4>
                        <span class="text-muted">
                          {{ task.gps_speed + 'km/h' }}
                        </span>
                      </div>
                      <i
                        class="uil uil-clock-eight"
                        style="font-size: 24px"
                      ></i>
                    </div>

                    <!-- Mainpower -->
                    <div class="media px-3 pt-3 details-car">
                      <div class="media-body">
                        <h4 class="mt-0 mb-1 font-size-22"> Mainpower </h4>
                        <span v-if="task.mainpower == 0" class="text-muted"
                          >Main power has been lost
                        </span>
                        <span v-else class="text-muted"
                          >Main power applied
                        </span>
                      </div>
                      <i
                        v-if="task.mainpower == 1"
                        class="uil uil-key-skeleton-alt Ign-on"
                        style="font-size: 24px"
                      ></i>
                      <i
                        v-else
                        class="uil uil-key-skeleton-alt Ign-off"
                        style="font-size: 24px"
                      ></i>
                    </div>
                    <!-- Altitude -->
                    <div class="media px-3 pt-3 details-car">
                      <div class="media-body">
                        <h4 class="mt-0 mb-1 font-size-22"> Altitude</h4>
                        <span class="text-muted">{{ task.gps_altitude }}</span>
                      </div>
                      <i class="uil uil-mountains" style="font-size: 24px"></i>
                    </div>
                  </div>
                </div>
              </b-tab>
              <b-tab title="Score">
                <h4 class="header-title mt-0 mb-3">Your Score Result </h4>
                <apexchart
                  class="apex-charts"
                  height="350"
                  type="radialBar"
                  :series="strokedCircularGuage.series"
                  :options="strokedCircularGuage.chartOptions"
                ></apexchart>
              </b-tab>
            </b-tabs>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col">
            <b-collapse id="todayTasks" visible>
              <div class="card mb-0 shadow-none"  >
                <div
                  class="card-body pt-0"
                  style="height: 575px; overflow: auto"
                >
                  <h5 class="mb-0">VEHICLES</h5>
                  <div class="row mb-md-2">  
                    <div class="col-sm-12 col-md-6">
                     
                    </div>             
                    <div class="col-sm-12 col-md-12">
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
                          <div>
                            
                          </div>
                                     <!--start here -->
                     
                      <b-nav-item-dropdown
                        id="globe-tooltip"
                        right
                        variant="black"
                        class="dropdown d-none d-lg-block"
                      >
                        <template v-slot:button-content>
                        <feather type="filter" style="color: #6c757d;"></feather>
                        </template>  
                         <b-form-checkbox  @change="refreshFilter($event)" value="carson">carson</b-form-checkbox>
                         <b-form-checkbox  @change="refreshFilter(event)"  value="cars off">cars off</b-form-checkbox>
                         <b-form-checkbox  @change="refreshFilter(event)"  >main power on</b-form-checkbox>
                         <b-form-checkbox  @change="refreshFilter(event)" >main power off</b-form-checkbox>
                   
                      </b-nav-item-dropdown>
                   
                       <!--ends here -->
                        </label>
            
                      </div>
                    </div>
                    
                
                  </div>
                  <div
                    class="row justify-content-sm-between border-bottom mt-2 pt-2"
                  >
                    <!-- end col -->
                    <div class="col-lg-12" style="margin-top:-60px;">
                      <ul
                        class="list-inline font-15 list-group notification-list"
                      >
                        <li
                          style="padding: 0; margin: 0"
                          v-for="(task, index) of filterdItems"
                          :key="index"
                          v-on:click="MoreDetails(task)"
                          role="presentation"
                          class="notify-item border-bottom"
                        >
                          <p href="javascript:void(0);" class="b-dropdown-text">
                          </p
                          ><div style="width: 50px; position: absolute">
                            <div class="picCars"> </div>
                            <span
                              v-if="task.ignition == 0"
                              style="
                                position: relative;
                                background: rgb(237, 28, 37);
                                border-radius: 50%;
                                width: 15px;
                                height: 15px;
                                left: -2px;
                                top: -50px;
                                border: 1px solid rgb(238, 238, 238);
                                display: block;
                              "
                            ></span>
                            <span
                              v-if="task.ignition == 1"
                              style="
                                position: relative;
                                background-color: #31a24c;
                                border-radius: 50%;
                                width: 15px;
                                height: 15px;
                                left: -2px;
                                top: -50px;
                                border: 1px solid rgb(238, 238, 238);
                                display: block;
                              "
                            ></span>
                          </div>
                          <p class="notify-details" style="margin-left: 57px">
                            <b style="font-weight: 800">{{ task.name }}</b>
                          </p>
                          <p
                            class="text-muted mb-0 user-msg"
                            style="margin-left: 57px"
                          >
                            <small
                              >{{ TimeToDate(task.rtc) }} -
                              {{ task.adresse }}</small
                            >
                          </p>
                        </li>
                      </ul>

                      <!-- end .d-flex-->
                    </div>
                    <!-- end col -->
                  </div>
                  <!-- end card-body-->
                </div>
                <!-- end card -->
              </div>
              <!-- end .collapse-->

              <!-- upcoming tasks -->
            </b-collapse>
          </div>
          <!-- end row -->
        </div>
      </div>
      <div class="col-8">
        <div id="livedata"></div>
      </div>
    </div>
  </Layout>
</template>
