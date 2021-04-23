p1 = 0;
p2 = 0;
p3 = 0;
 
function Calcul(starttrip,endTrip){

  let diff = parseInt(endTrip.substr(0,9))-parseInt(starttrip.substr(0,9));
  let x = parseInt(starttrip.substr(0,9));
console.log(diff / 3600);
while (diff != 0 && diff > 0) {
  let hours = new Date(x * 1000).getHours(); 
  if (hours > 2 && hours <= 16) {
    console.log("condition 1 ", hours);
      x += (hours+1 - hours) * 3600;
      p1 += (hours+1 - hours) * 3600;
      diff -= (hours+1 - hours) * 3600;
  } else if (hours > 16 && hours <= 20) {
    console.log("condition 2", hours);
    x += (hours+1 - hours) * 3600;
    p2 += (hours+1 - hours) * 3600;
    diff -= (hours+1 - hours) * 3600;
  } else {
    console.log("condition 3", hours);
    if (hours > 20 && hours <= 23) {
      x += (hours+1 - hours) * 3600;
      p3 += (hours+1- hours) * 3600;
      diff -= (hours+1 - hours) * 3600;
    } else if (hours >= 0 && hours <= 2) {
      x += (hours+1 - hours) * 3600;
      p3 += (hours+1 - hours) * 3600;
      diff -= (hours+1 - hours) * 3600;
    }
  }
}

    let ts= new Date(parseInt(starttrip.substr(0,9)) * 1000);
    let te= new Date(parseInt(endTrip.substr(0,9)) * 1000)
    let ts_hours =ts.getHours();
    let te_hours = te.getHours();
    console.log('******** ts_hours **********',ts_hours);
    console.log('******** te_hours **********',te_hours)

   if(!(ts.getMinutes()==te.getMinutes())){
     if(ts.getMinutes()>0 &&te.getMinutes()==0){
      console.log(" Minutes time end equal 0  and  minutes time start  greater than 0 ")
      timestartProcess(ts_hours,ts);
     }else if(ts.getMinutes()== 0 && te.getMinutes()>0){
      console.log(" Minutes tsequal 0  and  minutes time end greater than 0 ")
      timeendProcess(te_hours,te);
    }else if(ts.getMinutes() > te.getMinutes()){
      console.log(" Minutes ts greater than minutes time end ") 
      ts_hours > 2 && ts_hours <= 16  ? p1-=te. getMinutes()*60 :p1;
      ts_hours > 16 && ts_hours <= 20 ? p2-=te. getMinutes()*60:p2;
      ts_hours > 20 && ts_hours <= 02 ? p3-=te. getMinutes()*60:p3;
      te_hours > 2 && te_hours <= 16  ? p1+=(te .getMinutes())*60: p1;
      te_hours > 16 && te_hours <= 20 ? p2+=(te .getMinutes())*60 :p2;
      te_hours > 20 && te_hours <= 23 ||  te_hours >= 0 && te_hours <= 2 ?p3+=(te .getMinutes())*60:p3;
      }else if(te.getMinutes()> ts.getMinutes()){
        console.log(" Minutes time end  greater than minutes time start ")
        timestartProcess(ts_hours,ts);
        timeendProcess(te_hours,te)
   
      }
   }
   
   console.log(new Date(parseInt(starttrip.substr(0,9))*1000)) 
   console.log(new Date(parseInt(endTrip.substr(0,9))*1000))
   return { roadTime1: p1 /60, roadTime2: p2 / 60, roadTime3: p3 / 60 };
}



res=Calcul(	1584518355,1584540410);

console.log('res',res)




function timeendProcess(te_hours,te){
  te_hours > 2 && te_hours <= 16  ? p1-=(60-te .getMinutes())*60: p1;
  te_hours > 16 && te_hours <= 20 ? p2-=(60-te .getMinutes())*60 :p2;
  te_hours > 20 && te_hours <= 23 ||  te_hours >= 0 && te_hours <= 2 ?p3-=(60-te .getMinutes())*60:p3;
}
function timestartProcess(ts_hours,ts){
  ts_hours > 2 && ts_hours <= 16  ? p1-=ts .getMinutes()*60:p1;
  ts_hours > 16 && ts_hours <= 20 ? p2-=ts .getMinutes()*60:p2;
  ts_hours > 20 && ts_hours <= 02 ? p3-=ts .getMinutes()*60:p3;
}
module.exports = {
  Calcul
}