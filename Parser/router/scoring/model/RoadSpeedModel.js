  async function RoadSpeed(dt){
    var speed = {
          speed_1 : 0,
          speed_2 : 0,
          speed_3 : 0
      };
      for (i = 0; i < dt.entries.length ; i++)
            {
                if(parseInt(dt.entries[i].gps_speed._) > 0 && parseInt(dt.entries[i].gps_speed._) <= 90){
                    speed.speed_1 = speed.speed_1 + 5;
                }else
                if(parseInt(dt.entries[i].gps_speed._) > 90 && parseInt(dt.entries[i].gps_speed._) <= 120)
                {
                    speed.speed_2 = speed.speed_2 + 5;
                }else
                if(parseInt(dt.entries[i].gps_speed._) > 120)
                {
                    speed.speed_3 = speed.speed_3 + 5;
                }
            }
            speed.speed_1 = Math.round(speed.speed_1 / 60);
            speed.speed_2 = Math.round(speed.speed_2 / 60);
            speed.speed_3 = Math.round(speed.speed_3 / 60);
           return speed;
  }

 module.exports = {
     RoadSpeed
}