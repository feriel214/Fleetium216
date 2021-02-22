module.exports = {
  LBS: async (l, obj) => {
    obj.gps = l;
    let lbs_data = l.split(";");
    let IdLBS = lbs_data[0].replace("LBS:", "");
    console.log("LBS_ID : ", IdLBS);
    let mcc = lbs_data[1];
    console.log("MCC: ", mcc);
    let mnc = lbs_data[2];
    console.log("MNC: ", mnc);
    stations = [];
    for (let j = 3; j < lbs_data.length; j += 3) {
      /*   let station_lac=lbs_data[j];
                let station_cid=lbs_data[j+1];
                let dbm=lbs_data[j+2];//registred station signal length */
      stations.push(
        lbs_data[j] + ";" + lbs_data[j + 1] + ";" + lbs_data[j + 2]
      );
    }
    console.log("stations : ", stations);
    return obj;
  },
  //location information GPS
  GPS: async (l, obj) => {
    let gps_arr = l.split(";");
    let j = 0;
    while (j < gps_arr.length - 3) {
      if (gps_arr[j].includes("GPS")) {
        obj.gps = gps_arr[j];
        let dataID = gps_arr[j];
        console.log("dataId", dataID);
      } else if ((gps_arr[j] == 1) | (gps_arr[j] == 2) | (gps_arr[j] == 3)) {
        //1==> no signal  2==> with 2D signal  3==>with 3D signal
        let gps_status_mark = gps_arr[j];
        obj.gps_status_mark = gps_status_mark;
        console.log("Gps Status Mark", gps_status_mark);
      } else if (gps_arr[j].includes("N") | gps_arr[j].includes("S")) {
        let latitude = gps_arr[j];
        obj.lat = latitude.replace("N", "");
        console.log("latitude : ", latitude);
      } else if (gps_arr[j].includes("E") | gps_arr[j].includes("W")) {
        let longitude = gps_arr[j];
        obj.long = longitude.replace("E", "");
        console.log("longitude : ", longitude);
      }
      j++;
    }
    let hdop = gps_arr[gps_arr.length - 1];
    obj.hdop = hdop;
    console.log("HDOP", hdop);
    let angle = gps_arr[gps_arr.length - 2]; //range between 0~360°
    obj.angle = angle;
    console.log("angle", angle);
    let speed = gps_arr[gps_arr.length - 3];
    obj.speed = speed;
    console.log("speed km/h : ", speed);
    return obj;
  },
  STT: async (l, obj) => {
    console.log("STT", l);
    obj.STT = l;
    stt_data = l.split(";");
    let device_status = stt_data[0].replace("STT:", "");
    console.log("STT: device status ", device_status);
    device_info = [];
    alarm_device_info = [];
    binary_status = parseInt(device_status, 16).toString(2).toString();
    i = 0;
    while (i < binary_status.length) {
      switch (i) {
        case i == 0:
          if (binary_status[i] == 0) {
            // 210
            device_info.push("powered with external power");
          } else {
            //211
            device_info.push("powered with internal power");
          }
        case i == 1:
          if (binary_status[i] == 0) {
            //11000
            device_info.push("stop");
          } else {
            //11010
            device_info.push("move");
          }
        case i == 2:
          if (binary_status[i] == 0) {
            //11100
            device_info.push("not over speed ");
          } else {
            //11400
            device_info.push("over speed ");
          }
        case i == 3:
          if (binary_status[i] == 0) {
            device_info.push("no jamming ");
          } else {
            device_info.push("jamming ");
          }
        case i == 4:
          if (binary_status[i] == 0) {
            device_info.push("no alarm geo-fence");
          } else {
            device_info.push("alarm geo-fence");
          }
        case i == 5:
          if (binary_status[i] == 0) {
            device_info.push("immobilize status on");
          } else {
            device_info.push("immobilize status off");
          }
        case i == 6:
          if (binary_status[i] == 0) {
            device_info.push("acc status off");
          } else {
            device_info.push("acc status on ");
          }
        case i == 7:
          if (binary_status[i] == 0) {
            //
            device_info.push("input level is low");
          } else {
            device_info.push("input level is high");
          }
        case i == 8:
          if (binary_status[i] == 0) {
            device_info.push("input not in middle level ");
          } else {
            device_info.push("input in middle level");
          }
        case i == 9:
          if (binary_status[i] == 0) {
            //1100
            device_info.push("engine status off");
          } else {
            //1110
            device_info.push("engine status on");
          }
        case i == 10:
          if (binary_status[i] == 0) {
            device_info.push("panic button off ");
          } else {
            device_info.push("panic button on ");
          }
        case i == 11:
          if (binary_status[i] == 0) {
            //10700
            device_info.push("obdII no alarm ");
          } else {
            //10710
            device_info.push("obdII alarm");
          }
        case i == 12:
          if (binary_status[i] == 0) {
            device_info.push("angle rapid changed no alert ");
          } else {
            device_info.push("angle rapid changed alert");
          }
        case i == 13:
          if (binary_status[i] == 0) {
            device_info.push("speed rapid  no changed  alert");
          } else {
            device_info.push("speed rapid changed alert ");
          }
        case i == 14:
          if (binary_status[i] == 0) {
            device_info.push("not roaming");
          } else {
            device_info.push("roaming");
          } //Domestic roaming judged by MNC
        case i == 15:
          if (binary_status[i] == 0) {
            device_info.push("not roaming");
          } else {
            device_info.push("roaming ");
          } //International Roaming judeg by MCC
      }
      i++;
    }
    console.log("STT information  device info ", device_info);
    let alaram_triggered = parseInt(stt_data[1], 16).toString(2).toString();
    let j = 0;
    while (j < alaram_triggered.length) {
      switch (j) {
        case j == 0:
          if (binary_status[j] == "0") {
            alarm_device_info.push("external power alarm not triggered");
          } else {
            alarm_device_info.push("external power alarm  triggered");
          }
        case j == 1:
          if (binary_status[j] == 0) {
            alarm_device_info.push("Motion not triggerd");
          } else {
            alarm_device_info.push("Motion alarm triggerd");
          }
        case j == 2:
          if (binary_status[j] == 0) {
            alarm_device_info.push("over speed not triggerd");
          } else {
            alarm_device_info.push("over speed alarm triggerd ");
          }
        case j == 3:
          if (binary_status[j] == 0) {
            alarm_device_info.push("jamming not triggerd ");
          } else {
            alarm_device_info.push("jamming  alarm triggerd");
          }
        case j == 4:
          if (binary_status[j] == 0) {
            alarm_device_info.push("geo-fence not triggerd");
          } else {
            alarm_device_info.push("geo-fence alarm triggerd");
          }
        case j == 5:
          if (binary_status[j] == 0) {
            alarm_device_info.push("towing alarm not triggerd");
          } else {
            alarm_device_info.push("towing alarm triggerd");
          }
        case j == 6:
          if (binary_status[j] == 0) {
            alarm_device_info.push("not triggerd");
          } else {
            alarm_device_info.push("alarm triggerd ");
          }
        case j == 7:
          if (binary_status[j] == 0) {
            alarm_device_info.push("input low alarm  not triggerd");
          } else {
            alarm_device_info.push("input low alarm triggerd");
          }
        case j == 8:
          if (binary_status[j] == 0) {
            alarm_device_info.push("input high alarm  not triggerd ");
          } else {
            alarm_device_info.push("input high alarm triggerd");
          }
        case j == 9:
          if (binary_status[j] == 0) {
            alarm_device_info.push("not triggerd");
          } else {
            alarm_device_info.push("alarm triggerd");
          }
        case j == 10:
          if (binary_status[j] == 0) {
            alarm_device_info.push("panic button alarm not triggerd ");
          } else {
            alarm_device_info.push("panic button alarm triggerd ");
          }
        case j == 11:
          if (binary_status[j] == 0) {
            alarm_device_info.push("obdII alarm not triggerd ");
          } else {
            alarm_device_info.push("obdII alarm triggerd");
          }
        case j == 12:
          if (binary_status[j] == 0) {
            alarm_device_info.push("not triggerd ");
          } else {
            alarm_device_info.push("alarm triggerd");
          }
        case j == 13:
          if (binary_status[j] == 0) {
            alarm_device_info.push("rollover alaram not triggerd");
          } else {
            alarm_device_info.push("rollover alarm triggerd ");
          }
        case j == 14:
          if (binary_status[j] == 0) {
            alarm_device_info.push("accedient alarm not triggerd");
          } else {
            alarm_device_info.push("accident alarm triggerd");
          } //Domestic roaming judged by MNC
        case j == 15:
          if (binary_status[j] == 0) {
            alarm_device_info.push("power low alarm triggerd");
          } else {
            alarm_device_info.push("power low alarm triggerd");
          } //International Roaming judeg by MCC
      }
      j++;
    }

    console.log("STT information  alarm info ", alarm_device_info);
    return obj;
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
    let ad_arr = l.split(";");
    let para_id = ad_arr[0];
    console.log("para_id", para_id);
    j = 1;
    while (j < ad_arr.length) {
      switch (ad_arr[j]) {
        case ad_arr[j] == 0:
          let external_power_supply_voltage = ad_arr[j + 1];
          obj.external_power_supply_voltage = external_power_supply_voltage;
          console.log("external power : ", external_power_supply_voltage, "V");
        case ad_arr[j] == 1:
          let device_tempreture = ad_arr[j + 1];
          obj.device_tempreture = device_tempreture;
          console.log("Temertaure : ", device_tempreture);
        case ad_arr[j] == 2:
          let device_backup_battery_voltage = ad_arr[j + 1];
          obj.device_backup_battery_voltage = device_backup_battery_voltage;
          console.log(
            "Backup Battery Voltage : ",
            device_backup_battery_voltage,
            "V"
          );
        case ad_arr[j] == 3:
          let analog_input_voltage = ad_arr[j + 1];
          obj.analog_input_voltage = analog_input_voltage;
          console.log(" Analog input voltage : ", analog_input_voltage);
        case ad_arr[j] == 4:
          let device_backup_battery_percent = ad_arr[j + 1];
          obj.device_backup_battery_percent = device_backup_battery_percent;
          console.log(
            "Device backup battery : ",
            device_backup_battery_percent
          );
        case (ad_arr[j] >= 5) | (ad_arr[j] <= 9):
          let fuel_sensor_height = ad_arr[j + 1];
          console.log("Fuel Height : ", fuel_sensor_height);
          obj.fuel_sensor_height = fuel_sensor_height;
          console.log("obj: ", this.obj);
      }
      j++;
    }
    return obj;
  },
  //EVENT DATA
  EventData: async (l, obj) => {
    console.log("EVT: ", l);
    evt_data = l.replace("EVT:", "").split(";");
    event_code = evt_data[0];
    switch (event_code) {
      case event_code === "00":
        obj.event_code = "Non event triggered";
        break;
      case event_code === "01":
        obj.event_code =
          "Interval triggered : Time uploading event trigger uploads";
        break;
      case event_code === "02":
        obj.event_code =
          "Angle triggered : Angle change reaches the set value trigger uploads";
        break;
      case event_code === "03":
        obj.event_code =
          "Distance triggered Distance change reaches the set value trigger uploads";
        break;
      case event_code === "04":
        obj.event_code =
          "Request triggered : Command requests trigger uploads ";
        break;
      case event_code === "10":
        obj.event_code =
          "RFID reader triggered :  RFID card swiping trigger uploads ";
        break;
      case event_code === "11":
        obj.event_code =
          "iBeacon triggered : Find or lose iBeacon device trigger uploads";
        break;
      case event_code === "20":
        obj.event_code =
          "Firmware upgraded : Firmware upgraded trigger uploads ";
        break;
      case event_code === "28":
        obj.event_code =
          "OBDII scanner detected : OBDII scanner detected trigger uploads ";
        break;
      case event_code === "80":
        obj.event_code =
          "Geo-fence triggered :  Geo-fence state change trigger uploads";
        break;
      case event_code === "90":
        obj.event_code =
          "driver behavior triggered : Detected bad driver behavior trigger uploads.";
        break;
      case event_code === "F0":
        obj.event_code =
          "Status changed triggered Device state change trigger uploads";
        break;
      case event_code === "F8":
        obj.event_code = "Alarm triggered : Alarm trigger uploads";
        break;
     /*  default:
        obj.event_code = "Non definition"; */
    }
    event_code_mask = parseInt(parseInt(evt_data[1]), 16)
      .toString(2)
      .toString();
    // device status (first array )
    i = 0;
    while (i < event_code_mask.length) {
      switch (i) {
        case i == 0:
          if (event_code_mask[i] == 0) {
            // 210
            obj.event_mask = "powered with external power";
          } else {
            //211
            obj.event_mask = "powered with internal power";
          }
        case i == 1:
          if (event_code_mask[i] == 0) {
            //11000
            obj.event_mask = "stop";
          } else {
            //11010
            obj.event_mask = "move";
          }
        case i == 2:
          if (event_code_mask[i] == 0) {
            //11100
            obj.event_mask = "not over speed ";
          } else {
            //11400
            obj.event_mask = "over speed ";
          }
        case i == 3:
          if (event_code_mask[i] == 0) {
            obj.event_mask = "no jamming ";
          } else {
            obj.event_mask = "jamming ";
          }
        case i == 4:
          if (event_code_mask[i] == 0) {
            obj.event_mask = "no alarm geo-fence";
          } else {
            obj.event_mask = "alarm geo-fence";
          }
        case i == 5:
          if (event_code_mask[i] == 0) {
            obj.event_mask = "immobilize status on";
          } else {
            obj.event_mask = "immobilize status off";
          }
        case i == 6:
          if (event_code_mask[i] == 0) {
            obj.event_mask = "acc status off";
          } else {
            obj.event_mask = "acc status on ";
          }
        case i == 7:
          if (event_code_mask[i] == 0) {
            //
            obj.event_mask = "input level is low";
          } else {
            obj.event_mask = "input level is high";
          }
        case i == 8:
          if (event_code_mask[i] == 0) {
            obj.event_mask = "input not in middle level ";
          } else {
            obj.event_mask = "input in middle level";
          }
        case i == 9:
          if (event_code_mask[i] == 0) {
            //1100
            obj.event_mask = "engine status off";
          } else {
            //1110
            obj.event_mask = "engine status on";
          }
        case i == 10:
          if (event_code_mask[i] == 0) {
            obj.event_mask = "panic button off ";
          } else {
            obj.event_mask = "panic button on ";
          }
        case i == 11:
          if (event_code_mask[i] == 0) {
            //10700
            obj.event_mask = "obdII no alarm ";
          } else {
            //10710
            obj.event_mask = "obdII alarm";
          }
        case i == 12:
          if (event_code_mask[i] == 0) {
            obj.event_mask = "angle rapid changed no alert ";
          } else {
            obj.event_mask = "angle rapid changed alert";
          }
        case i == 13:
          if (event_code_mask[i] == 0) {
            obj.event_mask = "speed rapid  no changed  alert";
          } else {
            obj.event_mask = "speed rapid changed alert ";
          }
        case i == 14:
          if (event_code_mask[i] == 0) {
            obj.event_mask = "not roaming";
          } else {
            obj.event_mask = "roaming";
          } //Domestic roaming judged by MNC
        case i == 15:
          if (event_code_mask[i] == 0) {
            obj.event_mask = "not roaming";
          } else {
            obj.event_mask = "roaming ";
          } //International Roaming judeg by MCC
      }
      i++;
    }
    // Alarm triggered list (second array )
 /*    let j = 0;
    while (j < alaram_triggered.length) {
      switch (j) {
        case j == 0:
          if (event_code_mask[j] == "0") {
            alarm_obj.event_mask = "external power alarm not triggered";
          } else {
            alarm_obj.event_mask = "external power alarm  triggered";
          }
        case j == 1:
          if (event_code_mask[j] == 0) {
            alarm_obj.event_mask = "Motion not triggerd";
          } else {
            alarm_obj.event_mask = "Motion alarm triggerd";
          }
        case j == 2:
          if (event_code_mask[j] == 0) {
            alarm_obj.event_mask = "over speed not triggerd";
          } else {
            alarm_obj.event_mask = "over speed alarm triggerd ";
          }
        case j == 3:
          if (event_code_mask[j] == 0) {
            alarm_obj.event_mask = "jamming not triggerd ";
          } else {
            alarm_obj.event_mask = "jamming  alarm triggerd";
          }
        case j == 4:
          if (event_code_mask[j] == 0) {
            alarm_obj.event_mask = "geo-fence not triggerd";
          } else {
            alarm_obj.event_mask = "geo-fence alarm triggerd";
          }
        case j == 5:
          if (event_code_mask[j] == 0) {
            alarm_obj.event_mask = "towing alarm not triggerd";
          } else {
            alarm_obj.event_mask = "towing alarm triggerd";
          }
        case j == 6:
          if (event_code_mask[j] == 0) {
            alarm_obj.event_mask = "not triggerd";
          } else {
            alarm_obj.event_mask = "alarm triggerd ";
          }
        case j == 7:
          if (event_code_mask[j] == 0) {
            alarm_obj.event_mask = "input low alarm  not triggerd";
          } else {
            alarm_obj.event_mask = "input low alarm triggerd";
          }
        case j == 8:
          if (event_code_mask[j] == 0) {
            alarm_obj.event_mask = "input high alarm  not triggerd ";
          } else {
            alarm_obj.event_mask = "input high alarm triggerd";
          }
        case j == 9:
          if (event_code_mask[j] == 0) {
            alarm_obj.event_mask = "not triggerd";
          } else {
            alarm_obj.event_mask = "alarm triggerd";
          }
        case j == 10:
          if (event_code_mask[j] == 0) {
            alarm_obj.event_mask = "panic button alarm not triggerd ";
          } else {
            alarm_obj.event_mask = "panic button alarm triggerd ";
          }
        case j == 11:
          if (event_code_mask[j] == 0) {
            alarm_obj.event_mask = "obdII alarm not triggerd ";
          } else {
            alarm_obj.event_mask = "obdII alarm triggerd";
          }
        case j == 12:
          if (event_code_mask[j] == 0) {
            alarm_obj.event_mask = "not triggerd ";
          } else {
            alarm_obj.event_mask = "alarm triggerd";
          }
        case j == 13:
          if (event_code_mask[j] == 0) {
            alarm_obj.event_mask = "rollover alaram not triggerd";
          } else {
            alarm_obj.event_mask = "rollover alarm triggerd ";
          }
        case j == 14:
          if (event_code_mask[j] == 0) {
            alarm_obj.event_mask = "accedient alarm not triggerd";
          } else {
            alarm_obj.event_mask = "accident alarm triggerd";
          } //Domestic roaming judged by MNC
        case j == 15:
          if (event_code_mask[j] == 0) {
            alarm_obj.event_mask = "power low alarm triggerd";
          } else {
            alarm_obj.event_mask = "power low alarm triggerd";
          } //International Roaming judeg by MCC
      }
      j++;
    } */
    return obj;
  },
  //GFS Geo-fence data
  GFS: async (l, obj) => {
    console.log("GFS :", l);
    obj.GFS = l;
    geofence_data = l.split(";");
    gfs_status = geofence_data[0].replace("GFS:", "");
    gfs_alarm_status = geofence_data[1];
    cnv_gfss = parseInt(gfs_status, 16).toString(2).toString();
    let i = 0;
    gfs_arr = [];
    while (i < cnv_gfss.length) {
      if (cnv[i] == "1") {
        console.log("geo-fence ", i + 1, "inside the fence");
        gfs_arr.push(`geo-fence ${i + 1} inside the fence`);
      } else if (cnv_gfss[i] == "0") {
        console.log("geo-fence ", i + 1, " out the fence or no fence is set");
        gfs_arr.push(`geo-fence ${i + 1} inside the fence`);
      }
      i++;
    }
    cnv_gfsa = parseInt(gfs_alarm_status, 16).toString(2).toString();
    let j = 0;
    gfsa_arr = [];
    while (j < cnv_gfsa.length) {
      if (cnv[j] == "1") {
        console.log("geo-fence ", j + 1, "alarm triggered here");
        gfsa_arr.push(`geo-fence ${j + 1} alarm triggered here`);
      } else if (cnv_gfsa[j] == "0") {
        console.log("geo-fence ", j + 1, " no alarm triggered here");
        gfsa_arr.push(`geo-fence ${j + 1} no alarm triggered here`);
      }
      i++;
    }
  },
  //Engine run time data
  EngineRunTime: async (l,obj) => {
    console.log("Engine Run Time : ", l);
    egt_value = l.replace("EGT:", "");
    obj.egt_value =egt_value;
    return obj;
  },
  //RFID data
  Rfid: async (l, obj) => {
    console.log("RFID", l);
    rfid = l.replace("RFI:", "").split(";");
    rfid_card_id = rfid[0];
    obj.rfid_card_id = rfid_card_id;
    rfid_authStatus = rfid[1];
    if (parseInt(rfid_authStatus) == 1) {
      obj.rfid_authStatus = "Authorized ";
    } else if (parseInt(rfid_authStatus) == 0) {
      obj.rfid_authStatus = "-Unauthorized ";
    }
    return obj;
  },
  //Vehicle identification number(VIN) data
  VIN: async (l, obj) => {
    console.log("VIN: ", l);
    obj.VIN = l.replace("VIN:", "");
    return obj;
  },
  //OBDII alarm DATA
  OAL: async (l, obj) => {
    console.log("OAL: ", l);
    let obd_alarm_data = l.replace("OAL:", "");
    //block 1
    blk1 = obd_alarm_data.substring(0.6);
    data_blk1 = blk1.match(/.{1,2}/g);
    length_service_blk1 = data_blk1[0];
    obj.alarmdata_blk1ID = length_service_blk1;
    long_term_fuel_bank = parseInt(parseInt(data_blk1[1]), 16)
      .toString(2)
      .toString();
    obj.alarmdata_longtermfuelbank = long_term_fuel_bank;
    parseInt(parseInt(data_blk1[3]), 16).toString(2).toString(); // name var not menntionned ?
    //block 2
    blk2 = obd_alarm_data.substring(6, 14);
    length_service_blk2 = blk2.substring(0, 2);
    obj.alarmdata_blk2ID = length_service_blk2;
    engine_rpm = parseInt(parseInt(blk2.substring(2, 4)), 16)
      .toString(2)
      .toString();
    obj.alarmdata_engine_rpm = engine_rpm;
    parseInt(parseInt(blk2.substring(5, 8)), 16)
      .toString(2)
      .toString(); // name var not menntionned ?
    //block 3
    blk3 = obd_alarm_data.substring(14, 21);
    length_service_blk3 = blk3.substring(0, 2);
    obj.alarmdata_blk3ID = length_service_blk3;
    vehicle_speed = parseInt(parseInt(blk3.substring(2, 4)), 16)
      .toString(2)
      .toString();
    obj.alarmdata_vehicle_speed = vehicle_speed;
    parseInt(parseInt(blk3.substring(4, 6)), 16)
      .toString(2)
      .toString(); // name var not menntionned ?
    //block 4
    blk4 = obd_alarm_data.substring(20, 34);
    length_service_blk4 = blk4.substring(0, 2);
    obj.alarmdata_blk4ID = length_service_blk4;
    error1 = blk4.substring(2, 6);
    obj.alarmdata_blk4_error1 = error1; //DTC#1 P0100
    error2 = blk4.substring(6, 10);
    obj.alarmdata_blk4_error2 = error2; //DTC#2 P0200
    error3 = blk4.substring(10, 14);
    obj.alarmdata_blk4_error3 = error3; //DTC#3 P0300
    return obj;
  },
  //Fuel Consumption Data
  Fuel: async (l, obj) => {
    console.log("Fuel ", l);
    ve = 1;
    ed = 1.4;
    afr = 1.43;
    density = 748.9;
    real_fuel_consumption = 0;
    if (l.indexOf("FUL1") > -1) {
      //we will use the formula of algorithm 1
      ful=l.replace('FUL1:','');console.log('fuel',ful);
      fuel_value = parseInt(ful);
      real_fuel_consumption =(((fuel_value * ve * ed) / 10) / afr) / density;
      console.log('fuelConsumption',real_fuel_consumption);
     obj.fuelConsumption = real_fuel_consumption;
      
    } //we will use the algorithm 0
    else if (l.indexOf("FUL1") == -1) {
      fuel_value = parseInt(l.replace("FUL:", "")); // to check
      real_fuel_consumption = fuel_value / 10 / afr / density;
    obj.fuelConsumption = real_fuel_consumption;
    }
    return obj;
  },
  //OBDII DATA
  OBD: async (l, obj) => {
    console.log("OBD :", l);
    obj.OBDII = l;
    let obd_data = l.replace("OBDII", "");
    console.log("OBD DATA ", obd_data);
    return obj;
  },
  //Harsh Driver behavior data
  HDB: async (l, obj) => {
    console.log("Harsh driver behavior data :", l);
    hdb_satus = parseInt(parseInt(l.replace("HDB:", "")), 16)
      .toString(2)
      .toString();
    let i = 0;
    while (i < 7) {
      switch (i) {
        case i == 0:
          if (!(typeof hdb_satus[i] == "undefined"))
            rapid_acceleration = hdb_satus[i];
          obj.hdb_rapid_acceleration = "rapid acceleration";
          break;
        case i == 1:
          if (!(typeof hdb_satus[i] == "undefined"))
            rough_braking = hdb_satus[i];
          obj.hdb_rough_braking = "rough braking";
          break;
        case i == 2:
          if (!(typeof hdb_satus[i] == "undefined"))
            harsh_course = hdb_satus[i];
          obj.hdb_harsh_course = "harsh course";
          break;
        case i == 3:
          if (!(typeof hdb_satus[i] == "undefined")) no_warm_up = hdb_satus[i];
          obj.hdb_no_warm_up = "no warm up";
          break;
        case i == 4:
          if (!(typeof hdb_satus[i] == "undefined")) long_idle = hdb_satus[i];
          obj.hdb_long_idle = " long idle";
          break;
        case i == 5:
          if (!(typeof hdb_satus[i] == "undefined"))
            fatigue_driving = hdb_satus[i];
          obj.hdb_fatigue_driving = "fatigue driving";
          break;
        case i == 6:
          if (!(typeof hdb_satus[i] == "undefined"))
            rough_terrain = hdb_satus[i];
          obj.hdb_rough_terrain = "rough terrain";
          break;
        case i == 7:
          if (!(typeof hdb_satus[i] == "undefined")) high_rpm = hdb_satus[i];
          obj.hdb_high_rpm = "high rpm";
          break;
      }
      i++;
    }
    return obj;
  },
  //
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
};
