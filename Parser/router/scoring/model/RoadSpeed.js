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
                if(parseInt(dt.entries[i].gps_speed._) <= 90){
                    if (max1 < dt.entries[i].RowKey._){
                        max1 = dt.entries[i].RowKey._
                    }
                    if (min1 > dt.entries[i].RowKey._){
                        min1 = dt.entries[i].RowKey._
                    }
                    //speed.speed_1 = (parseInt(dt.entries[i].RowKey._) - speed.speed_1);  
                    //console.log(covertTs((parseInt(dt.entries[i].RowKey._),speed.speed_1))) 
                }else
                if(parseInt(dt.entries[i].gps_speed._) > 90 && parseInt(dt.entries[i].gps_speed._) <= 120)
                {
                    if (max2 < dt.entries[i].RowKey._){
                        max2 = dt.entries[i].RowKey._
                    }
                    if (min2 > dt.entries[i].RowKey._){
                        min2 = dt.entries[i].RowKey._
                    }
                }else
                if(parseInt(dt.entries[i].gps_speed._) > 120)
                {
                    if (max3 < dt.entries[i].RowKey._){
                        max3 = dt.entries[i].RowKey._
                    }
                    if (min3 > dt.entries[i].RowKey._){
                        min3 = dt.entries[i].RowKey._
                    }
                }
            }
            console.log("max1 "+max1)
            console.log("mix1 "+min1)
            console.log("max2 "+max2)
            console.log("min2 "+min2)
            console.log("max3 "+max3)
            console.log("mix3 "+min3)
            
       
            return ;
  }
  /*function covertTs(date1,date2){
      
    var diffInSeconds = Math.abs(date1 - date2) / 1000;
    var days = Math.floor(diffInSeconds / 60 / 60 / 24);
    var hours = Math.floor(diffInSeconds / 60 / 60 % 24);
    var minutes = Math.floor(diffInSeconds / 60 % 60);
    var seconds = Math.floor(diffInSeconds % 60);
    console.log(hours+':'+minutes+':'+seconds);
  }*/
 module.exports = {
     RoadSpeed
}