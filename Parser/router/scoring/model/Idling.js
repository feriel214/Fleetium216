async function Idling(speed,on,off){
    
        duration = Math.round((off - on)/ 60000);
        speedTime = speed.speed_1 + speed.speed_2 + speed.speed_3;
        return duration-speedTime;
    }

module.exports = {
    Idling
}
