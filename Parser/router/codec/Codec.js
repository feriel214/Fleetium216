const ClassRedis=require('../model/redis')
module.exports = {
	STT_STATUS : [],
  LBS: async (l, obj) => {
    console.log("*****************LBS***************");
    let lbs_data = l.split(";");
    //MCC
    obj.lbs_mcc = lbs_data[1];
    console.log("LBS_MCC: ", lbs_data[1]);
    //MNC
    obj.lbs_mnc = lbs_data[2];
    console.log("LBS_MNC: ", lbs_data[2]);
    stations = [];
    for (let j = 3; j < lbs_data.length; j += 3) {
      /*   
        let station_lac=lbs_data[j];
        let station_cid=lbs_data[j+1];
        let dbm=lbs_data[j+2];//registred station signal length  
        station =lac+cid+dbm      
      */
      stations.push(
        lbs_data[j] + ";" + lbs_data[j + 1] + ";" + lbs_data[j + 2]
      );
    }
    console.log("LBS_stations : ", stations);
    obj.lbs_sations = stations;
    return obj;
  },
  //location information GPS
  GPS: async (l, obj) => {
    console.log("*****************GPS***************");
    let gps_arr = l.split(";");
    let j = 0;
    while (j < gps_arr.length - 3) {
      if (gps_arr[j].includes("GPS")) {
        obj.gps_signal = gps_arr[j].replace("GPS:", "");
      } else if (gps_arr[j].includes("N") | gps_arr[j].includes("S")) {
        let latitude = gps_arr[j];
        obj.gps_lat = latitude.replace("N", "");
        console.log("latitude : ", latitude);
      } else if (gps_arr[j].includes("E") | gps_arr[j].includes("W")) {
        let longitude = gps_arr[j];
        obj.gps_long = longitude.replace("E", "");
        console.log("longitude : ", longitude);
      }
      j++;
    }  
    console.log("speed km/h : ", gps_arr[gps_arr.length - 3]);
    obj.gps_speed = gps_arr[gps_arr.length - 3];
    console.log("angle", gps_arr[gps_arr.length - 2]);
    obj.gps_angle = gps_arr[gps_arr.length - 2]; //range between 0~360°
    console.log("HDOP", gps_arr[gps_arr.length - 1]);
    obj.gps_hdop = gps_arr[gps_arr.length - 1];
    return obj;
  },
  STT: async (l, obj, evts,STT_STATUS) => {
    console.log("*****************STT***************");
    const params = require("./params/params.json");
    evt = [];
    stt_data = l.split(";");
    let device_status = stt_data[0].replace("STT:", "");
    obj.stt_device_status=stt_data[0].replace("STT:", "");
    console.log("device status : ", stt_data[0].replace("STT:", ""));
    console.log("alarm device status : ", stt_data[1]);
    binary_status = parseInt(device_status, 16).toString(2).toString();

	if(device_status == "0" && STT_STATUS[obj.id_car].toString() != "0"){//ig_off
		STT_STATUS[obj.id_car] = "0";//await ClassRedis.GetIgnToRedis(obj.id_car);
		ClassRedis.InsertEvtToRedis(obj.id_car,"last_ign","0")
		 evt.push(params["1100"]);
     console.log('#######################################')
     console.log(evt);
     console.log('#######################################')
		//evt off storage
	}else if(device_status != "0" && STT_STATUS[obj.id_car].toString() == "0"){//ig_off
		STT_STATUS[obj.id_car] = "1";//await ClassRedis.GetIgnToRedis(obj.id_car);
		ClassRedis.InsertEvtToRedis(obj.id_car,"last_ign","1")
		 evt.push(params["1110"]);  console.log('#######################################')
     console.log(evt);
     console.log('#######################################')
		//evt On storage
	} 
  //missed params event 
    switch(true){
        case stt_data[0]=='1': 
        evt.push(params['210']);
        break;
        case stt_data[0]=='2': 
        evt.push("move");//Move  params['']
        break;
        case stt_data[0]=='3': 
        evt.push(params['210'],"move");//move
        break;
        case stt_data[0]=='200': 
        evt.push("engine_status_on");//Engine status on 
        break;
        case stt_data[0]=='202': //Engine status on , move 
        evt.push("engine_status_on","move");
        break;
        case stt_data[0]=='240': //Engine status on , acc_status_on
        evt.push("engine_status_on","acc_status_on");
        break;
        case stt_data[0]=='242': //move ,Engine status on,acc_status_on
        evt.push("move","engine_status_on","acc_status_on");
        break;
        case stt_data[0]=='A40': //Engine status on,acc_status_on,OBDII_alarm
        evt.push("engine_status_on","acc_status_on","OBDII_alarm");
        break;
        case stt_data[0]=='A42': //move,Engine status on,acc_status_on,OBDII_alarm
        evt.push("move","engine_status_on","acc_status_on","OBDII_alarm");
        break;
        case stt_data[0]=='A46': //move,over_speed,Engine status on,acc_status_on,OBDII_alarm
        evt.push("move","over_speed","engine_status_on","acc_status_on","OBDII_alarm");
        break;
    }
   
    evts.stt_evt = evt;
    return {obj,evt };
  }, 
  //Trip Report Data
  TripReportData: async (l, obj) => {
    trip_data.replace("TRP:", "");
    trip_data = l.split(";");
    let start_time = trip_data[0];
    console.log("TRIP start time: ", start_time);
    let end_time = trip_data[1];
    console.log("TRIP end time : ", end_time);
    let start_latitude = trip_data[2];
    console.log("start_latitude : ", start_latitude);
    let start_longitude = trip_data[3];
    console.log("start_longitude : ", start_longitude);
    let end_latitude = trip_data[4];
    console.log("end_latitude: ", end_latitude);
    let end_longitude = trip_data[5];
    console.log("end_longitude: ", end_longitude);
    let start_millage = trip_data[6];
    console.log("start milleage : ", start_millage);
    let end_milleage = trip_data[7];
    console.log("end_milleage : ", end_milleage);
    let fue_algorithm_id = trip_data[8];
    console.log("fue_algorithm_id : ", fue_algorithm_id);
    let start_fuel_consumption = trip_data[9];
    console.log("start_fuel_consumption : ", start_fuel_consumption);
    let end_fuel_consumption = trip_data[10];
    console.log("end_fuel_consumption : ", end_fuel_consumption);
    let idle_seconds = trip_data[11];
    console.log("idle_seconds: ", idle_seconds);
    let max_speed = trip_data[12];
    console.log("max_speed : ", max_speed);
    let max_rpm = trip_data[13];
    console.log("max_rpm: ", max_rpm);
    return obj;
  },
  //AD Convert Data function
  ADConvertData: async (l, obj) => {
    console.log("*****************ADC***************");
    let ad_arr = l.replace("ADC:", "").split(";");
    j = 0;
    while (j < ad_arr.length) {
      switch (true) {
        case ad_arr[j] == "0":
          obj.adc_external_power_supply_voltage=ad_arr[j + 1];
          console.log("external power: ", ad_arr[j + 1], "V");
          break;
        case ad_arr[j] == "1":
          obj.adc_device_tempreture=ad_arr[j + 1];
          console.log("Temertaure: ", ad_arr[j + 1]);
          break;
        case ad_arr[j] == "2":
          obj.adc_device_backup_battery_voltage = ad_arr[j + 1];
          console.log("Backup Battery Voltage: ", ad_arr[j + 1], "V");
          break;
        case ad_arr[j] == "3":
          obj.adc_analog_input_voltage = ad_arr[j + 1];
          console.log(" Analog input voltage: ",ad_arr[j + 1]);
          break;
        case ad_arr[j] == "4":
          obj.adc_device_backup_battery_percent = ad_arr[j + 1];
          console.log("Device backup battery: ", ad_arr[j + 1]);
          break;
        case (ad_arr[j] >= "5") | (ad_arr[j] <= "9"):
          console.log("Fuel Height : ", ad_arr[j + 1]);
          obj.adc_fuel_sensor_height = ad_arr[j + 1];
          break;
      }
      j++;
    }
    return obj;
  },
  //EVENT DATA
  EventData: async (l, obj, evt) => {
    console.log("*****************EVT***************");
    const params = require("./params/params.json");
    const evt_params = require("./params/event_code_params.json");
    evt_data = l.replace("EVT:", "").replace("#", "").split(";");
    event_code = evt_data[0];
    obj.event_code = event_code;
    if(evt_data[1]!= undefined){
      obj.event_mask = evt_data[1];
    }
    console.log("EVT code  ", event_code);
    evt_codes = [];
    switch (true) {
      case event_code == "1":
        evt_codes.push(evt_params["1"]);
        break;
      case event_code == "2":
        evt_codes.push(evt_params["2"]);
        break;
      case event_code == "3":
        evt_codes.push(evt_params["3"]);
        break;
      case event_code == "4":
        evt_codes.push(evt_params["4"]);
        break;
      case event_code == "10":
        evt_codes.push(evt_params["10"]);
        break;
      case event_code == "11":
        evt_codes.push(evt_params["11"]);
        break;
      case event_code == "20":
        evt_codes.push(evt_params["20"]);
        break;
      case event_code == "28":
        evt_codes.push(evt_params["28"]);
        break;
      case event_code == "80":
        evt_codes.push(evt_params["80"]);
        break;
      case event_code == "90":
        evt_codes.push(evt_params["90"]);
        break;
      case event_code == "F0":
        evt_codes.push(evt_params["F0"]);
        break;
      case event_code == "F8":
        evt_codes.push(evt_params["F8"]);
        break;
    }
    evt.evt_code = evt_codes;
   //missed mask params
    if (!(typeof evt_data[1] == "undefined")) {
      console.log("EVT mask  ", evt_data[1]);
      event_mask = [];
      switch(true){
        case evt_data[1]=='1':
           event_mask.push(params["210"]);  //main_powwer_lost
           break ; 
        case evt_data[1]=='2':
           event_mask.push("move");  //move  params[""]
           break ; 
        case evt_data[1]=='4':
           event_mask.push("over_speed");  //over_speed
           break ; 
        case evt_data[1]=='40':
            event_mask.push("over_speed","acc_status_on");  //over_speed,acc_status_on
            break ; 
        case evt_data[1]=='200':
             event_mask.push("engine_status_on");  //engine_status_on
             break ; 
        case evt_data[1]=='800':
             event_mask.push("OBDIIalarm_alert");  //OBDIIalarm_alert
             break ; 
      }
      evt.evts_code_mask = event_mask;
    }

    return obj, evt;
  },
  //GFS Geo-fence data
  GFS: async (l, obj) => {
    console.log("*****************GFS***************");
    geofence_data = l.split(";");
    obj.gfs_staus = geofence_data[0].replace("GFS:", "");
    console.log("GFS Status : ", geofence_data[0].replace("GFS:", ""));
    obj.gfs_alarm_status = geofence_data[1];
    console.log("GFS Alarm Status : ", geofence_data[1]);

    /*  //geofence status 
    gfs_status = geofence_data[0].replace('GFS:','')
    gfs_alarm_status = geofence_data[1];
    cnv_gfss = parseInt(gfs_status, 16).toString(2).toString();
    console.log("cnv_gfss",cnv_gfss);
    let i = 0
    gfs_arr = []
    while (i < cnv_gfss.length) {
      if (cnv_gfss[i] == '1') {
        console.log('geo-fence ',i+1, 'inside the fence')
        gfs_arr.push(`geo-fence ${i+1} inside the fence`)
      } else if (cnv_gfss[i] == '0') {
        console.log('geo-fence ',i+1, ' out the fence or no fence is set')
        gfs_arr.push(`geo-fence ${i+1} out the fence or no fence is set`)
      }
      i++;
    }
    obj.geofence_status=gfs_arr;
SS
    //geofence alarm status 
    cnv_gfsa = parseInt(gfs_alarm_status, 16).toString(2).toString();
    console.log("cnv_gfsa",cnv_gfsa);
    let j = 0;
    gfsa_arr = [];
    while (j < cnv_gfsa.length) {
      if (cnv_gfsa[j] == '1') {
        console.log('geo-fence ',j+1, 'alarm triggered here')
        gfsa_arr.push(`geo-fence ${j+1} alarm triggered here`);
      } else if (cnv_gfsa[j] == '0') {
        console.log('geo-fence ', j+1, ' no alarm triggered here')
        gfsa_arr.push(`geo-fence ${j+1} no alarm triggered here`)
      }
      j++;
    }
    obj.geofence_alarm_status=gfsa_arr;
 */ return obj;
  },
  //Engine run time data
  EngineRunTime: async (l, obj) => {
    console.log("*****************EGT***************");
    console.log("Engine Run Time : ", l.replace("EGT:", ""));
    obj.egt_value = l.replace("EGT:", "");
    return obj;
  },
  //RFID data
  Rfid: async (l, obj) => {
    console.log("*****************RFI***************");
    rfid = l.replace("RFI:", "").split(";");
    obj.rfid_card_id = rfid[0];
    console.log("RFID CardID :", rfid[0]);
    rfid_authStatus = rfid[1];
    if (parseInt(rfid_authStatus) == 1) {
      obj.rfid_authStatus = "Authorized ";
      console.log("RFID authStatus : Authorized");
    } else if (parseInt(rfid_authStatus) == 0) {
      obj.rfid_authStatus = "Unauthorized ";
      console.log("RFID authStatus : Unauthorized ");
    }
    return obj;
  },
  //Vehicle identification number(VIN) data
  VIN: async (l, obj) => {
    console.log("*****************VIN***************");
    console.log("VIN: ", l.replace("VIN:", ""));
    vin = l.replace("VIN:", "");
    if(vin != undefined){
      obj.vin=vin
    }else{
      obj.vin="NAN"
    }
    return obj;
  },
  //OBDII alarm DATA
  OAL: async (l, obj, evt) => {
    console.log("*****************OAL***************");
    const pid = require("./params/pid.json");
    let obd_alarm_data = l.replace("OAL:", "");
    oal_evts = [];
    //block 1
    blk1 = obd_alarm_data.substring(0, 6);
    if (blk1.length != 0) {
      obj.oal_block1 = blk1;
      console.log("OAL block 1 :", blk1);
      data_blk1 = blk1.match(/.{1,2}/g);
      //length block 1
      length_service_blk1 = data_blk1[0];
      //long_term_fuel
      long_term_fuel_bank = parseInt(parseInt(data_blk1[1]), 16).toString(2);
        //semi-block1
        sb1 = blk1.substring(2, 4);
        oal_evts.push(pid[`${sb1}`]);
        //Semi-Block 2
        sb2= blk1.substring(4, 6);
        oal_evts.push(pid[`${sb2}`]);
     
    }
    //block 2
    blk2 = obd_alarm_data.substring(6, 14);
    if (blk2.length != 0) {
      obj.oal_block2 = blk2;
      console.log("OAL block 2 :", blk2);
      //length
      length_service_blk2 = blk2.substring(0, 2);
      //semi-block1
      sb21 = blk2.substring(2, 4);
      oal_evts.push(pid[`${sb21}`]);
      //Semi-Block 2
      sb22= blk2.substring(4, 8);
      oal_evts.push(pid[`${sb22}`]);
    }
    //block 3
    blk3 = obd_alarm_data.substring(14, 20);
    if (blk3.length != 0) {
      obj.oal_block3 = blk3;
      console.log("OAL block 3 :", blk3);
      length_service_blk3 = blk3.substring(0, 2);
      //semi-block1
      sb31 = blk3.substring(2, 4);
      oal_evts.push(pid[`${sb31}`]);
      //Semi-Block 2
      sb32= blk3.substring(4, 6);
      oal_evts.push(pid[`${sb32}`]);
    }
    //block 4
    blk4 = obd_alarm_data.substring(20, 34);
    if (blk4.length != 0) {
      length_service_blk4 = blk4.substring(0, 2);
      obj.oal_block4 = blk4;
      console.log("OAL block 4 :", blk4);
      error1 = blk4.substring(2, 6);
      if (error1.length != 0) {
        //DTC#1 P0100
        oal_evts.push(`P${error1}`);
      }
      error2 = blk4.substring(6, 10);
      if (error2.length != 0) {
        //DTC#2 P0200
        oal_evts.push(`P${error2}`);
      }
      error3 = blk4.substring(10, 14);
      if (error3.length != 0) {
        //DTC#3 P0300
        oal_evts.push(`P${error3}`);
      }
    }
    evt.oal_evt = oal_evts;
    return obj, evt;
  },
  //Fuel Consumption Data
  Fuel: async (l, obj) => {
    console.log("*****************FUL***************");
    ve = 1;
    ed = 1.4;
    afr = 1.43;
    density = 748.9;
    real_fuel_consumption = 0;
    if (l.indexOf("FUL1") > -1) {
      //we will use the formula of algorithm 1
      fuel_value = parseInt(l.replace("FUL1:", ""));
      real_fuel_consumption = (fuel_value * ve * ed) / 10 / afr / density;
      console.log("Fuel Consumption", real_fuel_consumption);
      obj.fuel_consumption = real_fuel_consumption;
    } //we will use the algorithm 0
    else if (l.indexOf("FUL") > -1) {
      fuel_value = parseInt(l.replace("FUL:", "")); // to check
      real_fuel_consumption = fuel_value / 10 / afr / density;
      obj.fuel_consumption = real_fuel_consumption;
    }
    return obj;
  },
  //OBDII DATA
  OBD: async (l, obj, evt) => {
    console.log("*****************OBD***************");
    const params = require("./params/params.json");
    const pid=require('./params/pid.json')
    let obd_data = l.replace("OBD:", "");
    obd_evts = [];
    //Block 1
    let blk1 = obd_data.substring(0,6);
    if (blk1.length != 0) {
      console.log("OBD block 1 : ", blk1);
      obj.obd_block1 = blk1;
      //Semi-Block 1
      sb1 = blk1.substring(2, 4);
      obd_evts.push(pid[`${sb1}`])
      //Semi-Block 2
      sb2= blk1.substring(4, 6);
      obd_evts.push(pid[`${sb2}`])
    }
    //block 2
    let blk2 = obd_data.substring(6,14);
    if (blk2.length != 0) {
      obj.obd_block2 = blk2;
      console.log("block 2 : ", blk2);
       //Semi-Block 1
       sb21 = blk2.substring(2,4);
       obd_evts.push(pid[`${sb21}`])
       //Semi-Block 2
       sb22= blk2.substring(4,8);
       obd_evts.push(pid[`${sb22}`]) 
    }
    //block 3
    let blk3 = obd_data.substring(14, 20);
    if (blk3.length != 0) {
      obj.obd_block3 = blk3;
      console.log("block 3 : ", blk3);
      //Semi-Block 1
      sb31 = blk3.substring(2,4);
      obd_evts.push(pid[`${sb31}`])
      //Semi-Block 2
      sb32= blk3.substring(4, 6);
      obd_evts.push(pid[`${sb32}`])
    }
    //block 4
    let blk4 = obd_data.substring(20, 28);
    if (blk4.length != 0) {
      obj.obd_block4 = blk4;
      console.log("block 4 : ", blk4);
       //Semi-Block 1
       sb41 = blk4.substring(2,4);
       obd_evts.push(pid[`${sb41}`])
       //Semi-Block 2
       sb42= blk4.substring(4,8);
       obd_evts.push(pid[`${sb42}`]) 
    }
    evt.obd_evt = obd_evts;
    return obj, evt;
  },
  //Harsh Driver behavior data
  HDB: async (l, obj, evt) => {
    console.log("*****************HDB***************");
    const hdb_params = require("./params/hdb_params.json");
    const params=require('./params/params.json')
    hdb_satus = parseInt(parseInt(l.replace("HDB:", "").replace("#", "")), 16)
      .toString(2)
      .toString();
    obj.hdb_status = l.replace("HDB:", "");
    console.log("HDB status : ", l.replace("HDB:", "").replace("#", ""));
    let i = 0;
    hdb_evts = [];
    while (i < 7) {
      switch (true) {
        case i == 0 && !(typeof hdb_satus[i] == "undefined"):
          hdb_evts.push(params["11100"]);
          break;
        case i == 1 && !(typeof hdb_satus[i] == "undefined"):
          hdb_evts.push(hdb_params["1"]);
          break;
        case i == 2 && !(typeof hdb_satus[i] == "undefined"):
          hdb_evts.push(hdb_params["2"]);
          break;
        case i == 3 && !(typeof hdb_satus[i] == "undefined"):
          hdb_evts.push(hdb_params["3"]);
          break;
        case i == 4 && !(typeof hdb_satus[i] == "undefined"):
          hdb_evts.push(hdb_params["4"]);
          break;
        case i == 5 && !(typeof hdb_satus[i] == "undefined"):
          hdb_evts.push(hdb_params["5"]);
          break;
        case i == 6 && !(typeof hdb_satus[i] == "undefined"):
          hdb_evts.push(hdb_params["6"]);
          break;
        case i == 7 && !(typeof hdb_satus[i] == "undefined"):
          hdb_evts.push(hdb_params["7"]);
          break;
      }
      i++;
    }
    evt.hdb_evt = hdb_evts;
    return obj, evt;
  },
  //Canbus
  Canbus: async (l, obj) => {
    console.log("CANBUS j1939 data", l);
    canbus_obddata = l.replace("CAN:", "");
    // block 1 & 2 & 3
    blks = canbus_obddata.match(/.{1,24}/g);
    arr_blks = [];
    for (i = 0; i < 3; i++) {
      pgn_data_length = blks[i].substring(0, 2);
      pgn_number = blks[i].substring(2, 8);
      pgn_data = blks[i].substring(8, 24);
      arr_blks.push({
        nb: i + 1,
        pgn_data_length: pgn_data_length,
        pgn_number: pgn_number,
        pgn_data: pgn_data,
      });
    }
    console.log("pgn_blocks : ", arr_blks);
    obj.canbus_data = arr_blks;
    return obj;
  },
  HVD: async (l, obj) => {
    return obj;
  },
};
