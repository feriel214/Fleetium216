async function Idling(dt){
    let j =0;
    let array = [];
        for (i = 0 ; i < dt.entries.length ; i++){
            if(dt.entries[i].gps_speed._ == '0'){
                array[j] = parseInt(dt.entries[i].RowKey._);
                j++;
            }
        }
        return Math.round((Math.max.apply(Math,array) - Math.min.apply(Math,array)) /60000);
        
    }

module.exports = {
    Idling
}
