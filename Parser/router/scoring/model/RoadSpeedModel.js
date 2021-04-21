  async function RoadSpeed(dt){
      let max1 = 0;
      let min1 = 9999999999999;
      let max2 = 0;
      let min2 = 9999999999999;
      let max3 = 0;
      let min3 = 9999999999999;
      var speed = {
          speed_1 : 0,
          speed_2 : 0,
          speed_3 : 0
      };
      for (i = 0; i < dt.entries.length ; i++)
            {
                if(parseInt(dt.entries[i].gps_speed._) > 0 && parseInt(dt.entries[i].gps_speed._) <= 90){
                    if (max1 < parseInt(dt.entries[i].RowKey._)){
                        max1 = parseInt(dt.entries[i].RowKey._)
                    }
                    if (min1 > parseInt(dt.entries[i].RowKey._)){
                        min1 = parseInt(dt.entries[i].RowKey._)
                    }
                }else
                if(parseInt(dt.entries[i].gps_speed._) > 90 && parseInt(dt.entries[i].gps_speed._) <= 120)
                {
                    if (max2 < parseInt(dt.entries[i].RowKey._)){
                        max2 = parseInt(dt.entries[i].RowKey._)
                    }
                    if (min2 > parseInt(dt.entries[i].RowKey._)){
                        min2 = parseInt(dt.entries[i].RowKey._)
                    }
                }else
                if(parseInt(dt.entries[i].gps_speed._) > 120)
                {
                    console.log(dt.entries[i].RowKey._)
                    if (max3 < parseInt(dt.entries[i].RowKey._)){
                        max3 = parseInt(dt.entries[i].RowKey._)
                    }
                    if (min3 > parseInt(dt.entries[i].RowKey._)){
                        min3 = parseInt(dt.entries[i].RowKey._)
                    }
                }
            }
            speed.speed_1 = Math.round((max1 - min1)/60000)
            speed.speed_2 = Math.round((max2 - min2)/60000)
            speed.speed_3 = Math.round((max3 - min3)/60000)

            if (speed.speed_2 < 0){
                speed.speed_2 = 0
            }
            if (speed.speed_3 < 0){
                speed.speed_3 = 0
            }

            
       
            return speed;
  }

 module.exports = {
     RoadSpeed
}