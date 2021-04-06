require('dotenv').config();

// AccNerveuse //
const acceleration_threshold1_exceed = require("../model/AccNerveuseModel");
// AccRisquee //
const acceleration_threshold2_exceed = require("../model/AccRisqueeModel");
// AccDangereuse //
const acceleration_threshold3_exceed = require("../model/AccDangereuseModel");
// DecExisif //
const deceleration_threshold1_exceed = require("../model/FreinageEx");
// DecRisquee //
const deceleration_threshold2_exceed = require("../model/FreinageRis");
// DecDangeruese //
const deceleration_threshold3_exceed = require("../model/FreinageDan");
// Cornering //
const angle_rapid_changed_alert = require("../model/CorneringModel");
// Azure //
const InsertScore = require("../model/InsertScoreToAzure")


async function RoadTime(param) {
  let score = "";
  switch (true) {
    case param > 45 && param < 50:
      score = 1;
      break;
    case param > 40 && param < 45:
      score = 2;
      break;
    case param > 35 && param < 40:
      score = 3;
      break;
    case param > 30 && param < 35:
      score = 4;
      break;
    case param > 25 && param < 30:
      score = 5;
      break;
    case param > 20 && param < 25:
      score = 6;
      break;
    case param > 15 && param < 20:
      score = 7;
      break;
    case param > 10 && param < 15:
      score = 8;
      break;
    case param > 5 && param < 10:
      score = 9;
      break;
    case param < 5:
      score = 10;
      break;
    default:
      score = 10;
  }
  return score;
}

async function RoadSpeed(param) {
  let score = "";
  switch (true) {
    case param > 4.5 && param < 5:
      score = 1;
      break;
    case param > 4 && param < 4.5:
      score = 2;
      break;
    case param > 3.5 && param < 4:
      score = 3;
      break;
    case param > 3 && param < 3.5:
      score = 4;
      break;
    case param > 2.5 && param < 3:
      score = 5;
      break;
    case param > 2 && param < 2.5:
      score = 6;
      break;
    case param > 1.5 && param < 2:
      score = 7;
      break;
    case param > 1 && param < 1.5:
      score = 8;
      break;
    case param > 0.5 && param < 1:
      score = 9;
      break;
    case param < 0.5:
      score = 10;
      break;
    default:
      score = 10;
  }
  return score;
}

async function AccNerveuse(carId, param) {
  const number_Acc = await acceleration_threshold1_exceed.acceleration_threshold1_exceed(carId);
  console.log("Acc ner "+number_Acc)
  result = param / number_Acc;
  
  if (isNaN(result))
  {
    return 10
  }else
  {
    let score = "";
  switch (true) {
    case result >= 0 && result < 50:
      score = 1;
      break;
    case result >= 50 && result < 100:
      score = 2;
      break;
    case result >= 100 && result < 200:
      score = 3;
      break;
    case result >= 200 && result < 300:
      score = 4;
      break;
    case result >= 300 && result < 400:
      score = 5;
      break;
    case result >= 400 && result < 500:
      score = 6;
      break;
    case result >= 500 && result < 600:
      score = 7;
      break;
    case result >= 600 && result < 700:
      score = 8;
      break;
    case result >= 700 && result < 800:
      score = 9;
      break;
    case result >= 800 && result < 1000:
      score = 10;
      break;
    default:
      score = 10;
  }
  return score;
  }
  
}

async function AccRisquee(carId,param) {
  const number_Acc = await acceleration_threshold2_exceed.acceleration_threshold2_exceed(carId);
  console.log("Acc Ris " + number_Acc)
  result = param / number_Acc ;
  if (isNaN(result))
  {
    return 10;
  }else{
    let score = "";
    switch (true) {
      case result >= 0 && result < 1000:
        score = 1;
        break;
      case result >= 1000 && result < 2000:
        score = 2;
        break;
      case result >= 2000 && result < 3000:
        score = 3;
        break;
      case result >= 3000 && result < 4000:
        score = 4;
        break;
      case result >= 4000 && result < 5000:
        score = 5;
        break;
      case result >= 5000 && result < 6000:
        score = 6;
        break;
      case result >= 6000 && result < 7000:
        score = 7;
        break;
      case result >= 7000 && result < 8000:
        score = 8;
        break;
      case result >= 8000 && result < 9000:
        score = 9;
        break;
      case result >= 9000 && result < 10000:
        score = 10;
        break;
      default:
        score = 10;
    }
    return score;
  }
 
}

async function AccDangereuse(carId,param) {
  const number_Acc = await acceleration_threshold3_exceed.acceleration_threshold3_exceed(carId);
  console.log("Acc Dan "+ number_Acc)
  result = param / number_Acc ;
  if (isNaN(result))
  {
    return 10
  }else
  {
    let score = "";
  switch (true) {
    case result > 0 && result < 2000:
      score = 1;
      break;
    case (result > 2000) & (result < 4000):
      score = 2;
      break;
    case (result > 4000) & (result < 6000):
      score = 3;
      break;
    case (result > 6000) & (result < 8000):
      score = 4;
      break;
    case result > 8000 && result < 10000:
      score = 5;
      break;
    case result > 10000 && result < 12000:
      score = 6;
      break;
    case result > 12000 && result < 14000:
      score = 7;
      break;
    case result > 14000 && result < 16000:
      score = 8;
      break;
    case result > 16000 && result < 18000:
      score = 9;
      break;
    case result > 18000 && result < 20000:
      score = 10;
      break;
    default:
      score = 10;
  }
  return score;

  }
  
}

async function FreExcessif(carId,param) {
  const number_Dec = await deceleration_threshold1_exceed.deceleration_threshold1_exceed(carId);
  console.log("Fre Ex "+ number_Dec);
  result = param / number_Dec;
  if(isNaN(result)){
    return 10;
  }else{
    let score = "";
  switch (true) {
    case result >= 0 && result < 5:
      score = 1;
      break;
    case result >= 5 && result < 10:
      score = 2;
      break;
    case result >= 10 && result < 15:
      score = 3;
      break;
    case result >= 15 && result < 20:
      score = 4;
      break;
    case result >= 20 && result < 25:
      score = 5;
      break;
    case result >= 25 && result < 30:
      score = 6;
      break;
    case result >= 30 && result < 35:
      score = 7;
      break;
    case result >= 35 && result < 40:
      score = 8;
      break;
    case result >= 40 && result < 45:
      score = 9;
      break;
    case result >= 45 && result < 50:
      score = 10;
      break;
    default:
      score = 10;
  }
  return score;
  }
  }

async function FreRisquee(carId,param) {
  const number_Dec = await deceleration_threshold2_exceed.deceleration_threshold2_exceed(carId);
  console.log("Fre Ris "+ number_Dec);
  result = param / number_Dec;
  if(isNaN(result)){
    return 10;
  }else{
    let score = "";
  switch (true) {
    case result >= 0 && result < 20:
      score = 1;
      break;
    case result >= 20 && result < 40:
      score = 2;
      break;
    case result >= 40 && result < 60:
      score = 3;
      break;
    case result >= 60 && result < 80:
      score = 4;
      break;
    case result >= 80 && result < 100:
      score = 5;
      break;
    case result >= 100 && result < 120:
      score = 6;
      break;
    case result >= 120 && result < 140:
      score = 7;
      break;
    case result >= 140 && result < 160:
      score = 8;
      break;
    case result >= 160 && result < 180:
      score = 9;
      break;
    case result >= 180 && result < 200:
      score = 10;
      break;
    default:
      score = 10;
  }
  return score;
  }
  
}

async function FreDangereux(carId,param) {
  const number_Dec = await deceleration_threshold3_exceed.deceleration_threshold3_exceed(carId);
  console.log("Fre Dan "+ number_Dec);
  result = param / number_Dec;
  if(isNaN(result)){
    return 10;
  }else{
    let score = "";
  switch (true) {
    case result >= 0 && result < 50:
      score = 1;
      break;
    case result >= 50 && result < 100:
      score = 2;
      break;
    case result >= 100 && result < 200:
      score = 3;
      break;
    case result >= 200 && result < 300:
      score = 4;
      break;
    case result >= 300 && result < 400:
      score = 5;
      break;
    case result >= 400 && result < 500:
      score = 6;
      break;
    case result >= 500 && result < 600:
      score = 7;
      break;
    case result >= 600 && result < 700:
      score = 8;
      break;
    case result >= 700 && result < 800:
      score = 9;
      break;
    case result >= 800 && result < 1000:
      score = 10;
      break;
    default:
      score = 10;
  }
  return score;
  }
  
}

async function Cornering(carId,param) {
  const number_Cor = await angle_rapid_changed_alert.angle_rapid_changed_alert(carId)
  console.log("Cor "+number_Cor);
  result = param / number_Cor;
  if (isNaN(result))
  {
    return 10;
  }else
  {
    let score = "";
    switch (true) {
      case result >= 0 && result < 50:
        score = 1;
        break;
      case result >= 50 && result < 100:
        score = 2;
        break;
      case result >= 100 && result < 200:
        score = 3;
        break;
      case result >= 200 && result < 300:
        score = 4;
        break;
      case result >= 300 && result < 400:
        score = 5;
        break;
      case result >= 400 && result < 500:
        score = 6;
        break;
      case result >= 500 && result < 600:
        score = 7;
        break;
      case result >= 600 && result < 700:
        score = 8;
        break;
      case result >= 700 && result < 800:
        score = 9;
        break;
      case result >= 800 && result < 1000:
        score = 10;
        break;
      default:
        score = 10;
    }
    return score;
  }
 
}



async function calcScore() {
  carId = 1;
  TAccNerveuse = await AccNerveuse(carId, 27000)
  TAccRisquee = await AccRisquee(carId,1212)
 
  TAccDang = await AccDangereuse(carId, 210)
  
  TFreEx = await FreExcessif(carId,3)
  TFreRis = await FreRisquee(carId,80);
  TFreDan = await FreDangereux(carId,20);
  TCor = await Cornering(carId,50000);
  
  console.log("Acc Nerveuse score " +TAccNerveuse);
  console.log("Acc Risquee score " +TAccRisquee);
  console.log("Acc Dang score " + TAccDang);
  console.log("Fre Exessif "+ TFreEx);
  console.log("Fre Risque "+ TFreRis);
  console.log("Fre Dangereuse "+ TFreDan);
  console.log("Corenering "+ TCor);
  ScoreFinal = Math.round((  (TAccNerveuse *2)+TAccRisquee + TAccDang + (TFreEx * 2) + TFreRis + TFreDan + TCor) / 11);
  console.log("Your final score is "+ScoreFinal)
  result = InsertScore.InsertScore(1,ScoreFinal);
  if(result){
    console.log("Score inserted succesfully");
    }else{
    console.log("Something went wrong")
    }

}

calcScore()

/*AccRisquee = AccRisquee();
AccDangereuse = AccDangereuse();
FreExcessif = FreExcessif(12);
FreRisquee = FreRisquee(254);
FreDangereux = FreDangereux(762);
Cornering = Cornering(762);

function FinalScore(RoadTime,RoadSpeed,AccNerveuse,AccRisquee,AccDangereuse,FreExcessif,FreRisquee,FreDangereux,Cornering){
    let FinalScore = (RoadTime + RoadSpeed + (AccNerveuse * 2) +  + AccRisquee + AccDangereuse + (FreExcessif * 2) + FreRisquee + FreDangereux + Cornering)/11
    return FinalScore;
}
console.log(FinalScore(RoadTime,RoadSpeed,AccNerveuse,AccRisquee,AccDangereuse,FreExcessif,FreRisquee,FreDangereux,Cornering));**/
