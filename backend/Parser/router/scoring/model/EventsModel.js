async function get_events(dt,carId){
    let events = {
      speed : 0,
      freinage : 0,
      cornering :0
    };
    evt1 = carId + "_Vehicle_speed";
    evt2 = carId + "_undefined";
    evt3 = carId + "_angle_triggered:angle_change_reaches_the_set_value_trigger_uploads";
    for (i = 0; i < dt.entries.length ; i ++){
      if(dt.entries[i].PartitionKey._ == evt1){
        events.speed++;
      }
      if(dt.entries[i].PartitionKey._ == evt2){
        events.freinage++;
      }
      if(dt.entries[i].PartitionKey._ == evt3){
        events.cornering++;
      }
    }
    return events;
  }

module.exports = {
  get_events
}