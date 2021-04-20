const collectSData = require('./collectSData');
const Point = require('./Points');
/*carId = '1';
debut =  '2021-03-14';
fin =  '2021-04-17';*/

async function calcScore(carId,debut,fin){
    result = await collectSData.collectSData(carId,debut,fin);
    if(result == null)
    {
        return null;
    }else
    {
        SCornering = Point.Cornering((result.Cornering));
        SFreinage = Point.Freinage(result.Freinage);
        SRoadSpeed = Point.RoadSpeed((result.roadspeed_3)/100);
        SAcceleration = Point.Acceleration(result.Acceleration);
        Score = Math.round((SCornering + (SFreinage * 2) + SRoadSpeed + (SAcceleration * 2)) / 7);
        collectSData.insertFS(carId,debut,fin,Score);
        return Score;

    } 
    
}
module.exports = {
    calcScore
}