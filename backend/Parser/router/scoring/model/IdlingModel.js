async function Idling(dt){
    let idling = 0;
      for (i = 0; i < dt.entries.length ; i++)
      {
          if(dt.entries[i].gps_speed._ != undefined){
              if(parseInt(dt.entries[i].gps_speed._) == 0){
                  idling = idling +5;
                  
              }
          }    
      }   
     return Math.round(idling / 60);
    
    }
module.exports = {
    Idling
}
