<script>
import Layout from '@layouts/main'
import PageHeader from '@components/page-header'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet.markercluster'
import 'leaflet-rotatedmarker'
import axios from 'axios'
import Overview from '@components/overview'
//import markerIconPng from "leaflet/dist/images/marker-icon.png"

export default {
  name: 'LiveData',
  components: { Layout, PageHeader, L, Overview },
  data() {
    return {
      center: [36.8062423, 10.1869993],
      map: [],
      L: [],
      showCarInfo: false,
      options: [],
      useCustomIcons: true,
      eyeIcon: '"uil uil-meh-closed-eye',
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
            mainpower: '1',
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
      tableData: [],
      classObject:[ {class:'col-md-6 col-xl-3'}],
      title: 'Advanced Tables',
      items: [],
      widgetData: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 12, 15, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: 'name',
      sortDesc: false,
      fields: [
        { key: 'name', sortable: true },
        { key: 'ignition', sortable: true },
        { key: 'motion', sortable: true },
      ],
      statData: [],
    }
  },
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.tableData.length
    },
  },
  async mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
    await this.setupLeafletMap()
    await Object.values(this.userCars.data).forEach((e) => {
      if (e.name.length > 0) {
        this.tableData.push(e)
      }
    })

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

      markers.on('clusterclick', function (a) {
        alert('clusterclick Clicked')
        a.layer.zoomToBounds({ padding: [20, 20] })
        console.log('cluster ' + a.layer.getAllChildMarkers().length)
      })
      markers.on('click', function (a) {
        alert('Marker Clicked')
      })
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    onPreviewClick(value, index, item) {
      console.log('value', value, 'index', index, 'item', item)
    },
    getLiveCars() {
      axios
        .get(
          'https://pro.sayarte.ch/intigo/livedata/?accesskey=intigo_90fd3a73dd5d4831a46cf2d7a378f8d674d0ec686be7ac9c16b4857ec318181eb706c6f143375245&fbclid=IwAR1X4FvIsYL4ABQy0p9-a5yXSpw-WeRY3fCZISsLmTRz-eBsrF1kEQrYOHw'
        )
        .then((res) => {
          console.log('res.data', res.data)
        })
    },
  },
}
</script>

<style>
@import url('https://unpkg.com/leaflet@1.5.1/dist/leaflet.css');
#livedata {
  height: 400px;
  z-index: 10 !important;
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
</style>

<template>
  <Layout>
    <PageHeader />
    <div class="row">
      <div class="col-3">
        <div calss="card">
          <div class="card-body">
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
                striped
                hover
                :items="tableData"
                :fields="fields"
                responsive="sm"
                :per-page="perPage"
                :current-page="currentPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :filter="filter"
                :filter-included-fields="filterOn"
                @filtered="onFiltered"
              >
                <template v-if="useCustomIcons">
                  <b-icon icon="uil0 uil-meh-closed-eye"></b-icon>
                </template>
                <!--     <template v-slot:cell(selected)="row">
                <b-form-group>
                  <input type="checkbox" v-model="row.item.selected" 
                   @input="onPreviewClick($event, row.index, row.item)"
                  />
                </b-form-group>
              </template> -->
                <template #cell(ignition)="row">
                  <img
                    v-if="row.item.ignition == 0"
                    src="../../../../assets/images/engine-off.png"
                    style="width: 25px; height: 25px"
                  />
                  <img
                    v-else
                    src="../../../../assets/images/engine.png"
                    style="width: 25px; height: 25px"
                  />
                </template>
                <template #cell(motion)="row">
                  <img
                    v-if="row.item.motion == 0"
                    src="../../../../assets/images/car-stop.png"
                    style="width: 25px; height: 25px"
                  />
                  <img
                    v-else
                    src="../../../../assets/images/car-move.png"
                    style="width: 25px; height: 25px"
                  />
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
      <div class="col-9">
        <div class="card">
          <div class="card-body">
            <div id="livedata"></div>
          </div>
        </div>
        <div v-show="showCarInfo">
          <Overview :items="statData" :classObject="classObject"  />
        </div>
      </div>
    </div>
  </Layout>
</template>
