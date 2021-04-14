async function get_events(dt,carId){
    let events = {
      speed : 0,
      freinage : 0
    };
    evt1 = carId +"_Vehicle_speed"
    evt2 = carId + "_undefined"
    for (i = 0; i < dt.entries.length ; i ++){
      if(dt.entries[i].PartitionKey._ == evt1){
        events.speed++;
      }
      if(dt.entries[i].PartitionKey._ == evt2){
        events.freinage++;
      }
    }
    return events;
  }

module.exports = {
  get_events
}