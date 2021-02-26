module.exports = {
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
    obj.gps_hdop = gps_arr[gps_arr.length - 1];
    console.log("HDOP", gps_arr[gps_arr.length - 1]);
    obj.gps_angle = gps_arr[gps_arr.length - 2]; //range between 0~360°
    console.log("angle", gps_arr[gps_arr.length - 2]);
    obj.gps_speed = gps_arr[gps_arr.length - 3];
    console.log("speed km/h : ", gps_arr[gps_arr.length - 3]);
    return obj;
  },
  STT: async (l, obj, evts) => {
    console.log("*****************STT***************");
    const params = require("./params/params.json");
    evt = [];
    stt_data = l.split(";");
    let device_status = stt_data[0].replace("STT:", "");
    console.log("device status : ", stt_data[0].replace("STT:", ""));
    console.log("alarm device status : ", stt_data[1]);
    binary_status = parseInt(device_status, 16).toString(2).toString();
    i = 0;
    while (i < binary_status.length) {
      switch (true) {
        case i == 0 && binary_status[i] == "1":
          evt.push(params["211"]);
          break;
        case i == 1 && binary_status[i] == "1":
          evt.push(params["11000"]);
          break;
        case i == 2 && binary_status[i] == "1":
          evt.push(params["11100"]);
          break;
        case i == 3 && binary_status[i] == "1":
          evt.push(params["50001"]);
          break;
        case i == 4 && binary_status[i] == "1":
          evt.push(params["50002"]);
          break;
        case i == 5 && binary_status[i] == "1":
          evt.push(params["50004"]);
          break;
        case i == 6 && binary_status[i] == "1":
          evt.push(params["50007"]);
          break;
        case i == 7 && binary_status[i] == "1":
          evt.push(params["50009"]);
          break;
        case i == 8 && binary_status[i] == "1":
          evt.push(params["50011"]);
          break;
        case i == 9 && binary_status[i] == "1":
          evt.push(params["1110"]);
          break;
        case i == 10 && binary_status[i] == "1":
          evt.push(params["50013"]);
          break;
        case i == 11 && binary_status[i] == "1":
          evt.push(params["10710"]);
          break;
        case i == 12 && binary_status[i] == "1":
          evt.push(params["50015"]);
          break;
        case i == 13 && binary_status[i] == "1":
          evt.push(params["50017"]);
          break;
        case i == 14 && binary_status[i] == "1":
          //DomesticRoaming judeg by MNC
          evt.push(params["50019"]);
          break;
        case i == 15 && binary_status[i] == "1":
          //International Roaming judeg by MCC
          evt.push(params["11000"]);
          break;
      }
      i++;
    }
    evts.stt_evt = evt;

    return obj, evts;
  }, //Trip Report Data
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
          obj.adc_external_power_supply_voltage = ad_arr[j + 1];
          console.log("external power : ", ad_arr[j + 1], "V");
          break;
        case ad_arr[j] == "1":
          obj.adc_device_tempreture = ad_arr[j + 1];
          console.log("Temertaure : ", ad_arr[j + 1]);
          break;
        case ad_arr[j] == "2":
          obj.adc_device_backup_battery_voltage = ad_arr[j + 1];
          console.log("Backup Battery Voltage : ", ad_arr[j + 1], "V");
          break;
        case ad_arr[j] == "3":
          obj.adc_analog_input_voltage = ad_arr[j + 1];
          console.log(" Analog input voltage : ", ad_arr[j + 1]);
          break;
        case ad_arr[j] == "4":
          obj.adc_device_backup_battery_percent = ad_arr[j + 1];
          console.log("Device backup battery : ", ad_arr[j + 1]);
          break;
        case (ad_arr[j] >= "5") | (ad_arr[j] <= "9"):
          console.log("Fuel Height : ", ad_arr[j + 1]);
          obj.adc_fuel_sensor_height = ad_arr[j + 1];
          console.log("obj: ", this.obj);
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
    obj.event_mask = evt_data[1];
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
    if (!(typeof evt_data[1] == "undefined")) {
      console.log("EVT mask  ", evt_data[1]);
      event_code_mask = parseInt(parseInt(evt_data[1]), 16)
        .toString(2)
        .toString();
      // device status (first array )
      event_mask = [];
      i = 0;
      while (i < event_code_mask.length) {
        switch (true) {
          case i == 0 && event_code_mask[i] == "1":
            event_mask.push(params["211"]);
            break;
          case i == 1 && event_code_mask[i] == "1":
            event_mask.push(params["11010"]);
            break;
          case i == 2 && event_code_mask[i] == "1":
            event_mask.push(params["11400"]);
            break;
          case i == 3 && event_code_mask[i] == "1":
            event_mask.push(params["50001"]);
            break;
          case i == 4 && event_code_mask[i] == "1":
            event_mask.push(params["50002"]);
            break;
          case i == 5 && event_code_mask[i] == "1":
            event_mask.push(params["50004"]);
            break;
          case i == 6 && event_code_mask[i] == "1":
            event_mask.push(params["50007"]);
            break;
          case i == 7 && event_code_mask[i] == "1":
            event_mask.push(params["50009"]);
            break;
          case i == 8 && event_code_mask[i] == "1":
            event_mask.push(params["50011"]);
            break;
          case i == 9 && event_code_mask[i] == "1":
            event_mask.push(params["1110"]);
            break;
          case i == 10 && event_code_mask[i] == "1":
            event_mask.push(params["50013"]);
            break;
          case i == 11 && event_code_mask[i] == "1":
            event_mask.push(params["10710"]);
            break;
          case i == 12 && event_code_mask[i] == "1":
            event_mask.push(params["50015"]);
            break;
          case i == 13 && event_code_mask[i] == "1":
            event_mask.push(params["50017"]);
            break;
          case i == 14 && event_code_mask[i] == "1":
            //Domestic roaming judged by MNC
            event_mask.push(params["50019"]);
            break;
          case i == 15 && event_code_mask[i] == "1":
            //International Roaming judeg by MCC
            event_mask.push(params["50021"]);
            break;
        }
        i++;
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
    obj.vin = l.replace("VIN:", "");
    return obj;
  },
  //OBDII alarm DATA
  OAL: async (l, obj, evt) => {
    console.log("*****************OAL***************");
    const params = require("./params/params.json");
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
      long_term_fuel_bank = parseInt(parseInt(data_blk1[1]), 16)
        .toString(2)
        .toString();
      oal_evts.push(params["50025"]);
      parseInt(parseInt(data_blk1[3]), 16).toString(2).toString(); // name var not menntionned ?
    }
    //block 2
    blk2 = obd_alarm_data.substring(6, 14);
    if (blk2.length != 0) {
      obj.oal_block2 = blk2;
      console.log("OAL block 2 :", blk2);
      //length
      length_service_blk2 = blk2.substring(0, 2);
      //engine_rpm_oal_evt
      engine_rpm = parseInt(parseInt(blk2.substring(2, 4)), 16)
        .toString(2)
        .toString();
      oal_evts.push(params["50023"]);
      parseInt(parseInt(blk2.substring(5, 8)), 16)
        .toString(2)
        .toString(); // name var not menntionned ?
    }
    //block 3
    blk3 = obd_alarm_data.substring(14, 20);
    if (blk3.length != 0) {
      obj.oal_block3 = blk3;
      console.log("OAL block 3 :", blk3);
      length_service_blk3 = blk3.substring(0, 2);
      //vehicle speed
      vehicle_speed = parseInt(parseInt(blk3.substring(2, 4)), 16)
        .toString(2)
        .toString();
      oal_evts.push(params["50024"]);
      parseInt(parseInt(blk3.substring(4, 6)), 16)
        .toString(2)
        .toString(); // name var not menntionned ?
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
    else if (l.indexOf("FUL1") == -1) {
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
    let obd_data = l.replace("OBD:", "");
    obd_evts = [];
    //Block 1
    blk1 = obd_data.substring(0, 6);
    if (blk1.length != 0) {
      console.log("OBD block 1 : ", blk1);
      obj.obd_block1 = blk1;
      engine_coolant_temperature_value = parseInt(
        parseInt(blk1.substring(2, 4)),
        16
      )
        .toString(2)
        .toString();
      obj.obd_engine_coolant_temperature = engine_coolant_temperature_value;
      obd_evts.push(params["50022"]);
    }
    //block 2
    blk2 = obd_data.substring(6, 14);
    if (blk2.length != 0) {
      obj.obd_block2 = blk2;
      console.log("block 2 : ", blk2);
      engine_rpm = parseInt(parseInt(blk2.substring(2, 4)), 16)
        .toString(2)
        .toString();
      obj.obd_engine_rpm_value = engine_rpm;
      obd_evts.push(params["50023"]);
    }

    //block 3
    blk3 = obd_data.substring(14, 20);
    if (blk3.length != 0) {
      obj.obd_block3 = blk3;
      console.log("block 3 : ", blk3);
      vehicle_spped = parseInt(parseInt(blk3.substring(2, 4)), 16)
        .toString(2)
        .toString();
      obj.obd_vehicle_speed_value = vehicle_spped;
      obd_evts.push(params["50024"]);
    }

    //block 4
    blk4 = obd_data.substring(20, 28);
    if (blk4.length != 0) {
      obj.obd_block4 = blk4;
      console.log("block 4 : ", blk4);
      distance_travled = parseInt(parseInt(blk4.substring(2, 4)), 16)
        .toString(2)
        .toString();
      obj.obd_distance_travled_value = distance_travled;
      obd_evts.push(params["50025"]);
    }
    evt.obd_evt = obd_evts;
    return obj, evt;
  },
  //Harsh Driver behavior data
  HDB: async (l, obj, evt) => {
    console.log("*****************HDB***************");
    const hdb_params = require("./params/hdb_params.json");
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
          hdb_evts.push(hdb_params["0"]);
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
