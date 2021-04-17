async function millage(data,on,off,carId){
    ignition_on =  carId +"_ignition_on"
    ignition_off =  carId +"_ignition_off"

    for (i=0 ; i< data.entries.length ; i++){
        if(data.entries[i].RowKey._ == on && data.entries[i].PartitionKey._ == ignition_on)
        {
            millage_on = data.entries[i].milleage._;
        }else if(data.entries[i].RowKey._ == off && data.entries[i].PartitionKey._ == ignition_off){
            millage_off = data.entries[i].milleage._;
        }
    }
    return Math.round(millage_off-millage_on);
}
module.exports = {
    millage
}