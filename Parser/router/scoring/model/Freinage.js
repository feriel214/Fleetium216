
async function Freinage(dt,carId){
  let j = 0;
  evt = carId + "_undefined"
  for (i = 0 ; i < dt.entries.length; i++){
    if(dt.entries[i].PartitionKey._ == evt){
      j++;
    }
  }
  return j;
  
}


module.exports = { 
  Freinage
}