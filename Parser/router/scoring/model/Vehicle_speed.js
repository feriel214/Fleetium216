async function Vehicle_speed(dt,carId){
    let j = 0;
    evt = carId +"_Vehicle_speed"
    for (i = 0; i < dt.entries.length ; i ++){
      if(dt.entries[i].PartitionKey._ == evt){
        j++;
      }
    }
    return j;
  }

module.exports = {
  Vehicle_speed
}