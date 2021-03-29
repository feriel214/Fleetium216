
// AccNerveuse //
const acceleration_threshold1_exceed = require("../model/AccNerveuseModel");
const acceleration_threshold2_exceed = require("../model/AccRisqueeModel");

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
  const distance = await acceleration_threshold1_exceed. acceleration_threshold1_exceed(carId);
  result = distance / param;

  let score = "";
  switch (true) {
    case result > 0 && result < 50:
      score = 1;
      break;
    case result > 50 && result < 100:
      score = 2;
      break;
    case result > 100 && result < 200:
      score = 3;
      break;
    case result > 200 && result < 300:
      score = 4;
      break;
    case result > 300 && result < 400:
      score = 5;
      break;
    case result > 400 && result < 500:
      score = 6;
      break;
    case result > 500 && result < 600:
      score = 7;
      break;
    case result > 600 && result < 700:
      score = 8;
      break;
    case result > 700 && result < 800:
      score = 9;
      break;
    case result > 800 && result < 1000:
      score = 10;
      break;
    default:
      score = 10;
  }
  return score;
}


async function AccRisquee(carId,param) {
  const distance = await acceleration_threshold2_exceed. acceleration_threshold2_exceed(carId);
  result = distance / param;
  let score = "";
  switch (true) {
    case result > 0 && result < 1000:
      score = 1;
      break;
    case (result > 1000) & (result < 2000):
      score = 2;
      break;
    case (result > 2000) & (result < 3000):
      score = 3;
      break;
    case (result > 3000) & (result < 4000):
      score = 4;
      break;
    case result > 4000 && result < 5000:
      score = 5;
      break;
    case result > 5000 && result < 6000:
      score = 6;
      break;
    case result > 6000 && result < 7000:
      score = 7;
      break;
    case result > 7000 && result < 8000:
      score = 8;
      break;
    case result > 8000 && result < 9000:
      score = 9;
      break;
    case result > 9000 && result < 10000:
      score = 10;
      break;
    default:
      score = 10;
  }
  return score;
}

async function AccDangereuse(param) {
  let score = "";
  switch (true) {
    case param > 0 && param < 2000:
      score = 1;
      break;
    case (param > 2000) & (param < 4000):
      score = 2;
      break;
    case (param > 4000) & (param < 6000):
      score = 3;
      break;
    case (param > 6000) & (param < 8000):
      score = 4;
      break;
    case param > 8000 && param < 10000:
      score = 5;
      break;
    case param > 10000 && param < 12000:
      score = 6;
      break;
    case param > 12000 && param < 14000:
      score = 7;
      break;
    case param > 14000 && param < 16000:
      score = 8;
      break;
    case param > 16000 && param < 18000:
      score = 9;
      break;
    case param > 18000 && param < 20000:
      score = 10;
      break;
    default:
      score = 10;
  }
  return score;
}

async function FreExcessif(param) {
  let score = "";
  switch (true) {
    case param > 0 && param < 5:
      score = 1;
      break;
    case param > 5 && param < 10:
      score = 2;
      break;
    case param > 10 && param < 15:
      score = 3;
      break;
    case param > 15 && param < 20:
      score = 4;
      break;
    case param > 20 && param < 25:
      score = 5;
      break;
    case param > 25 && param < 30:
      score = 6;
      break;
    case param > 30 && param < 35:
      score = 7;
      break;
    case param > 35 && param < 40:
      score = 8;
      break;
    case param > 40 && param < 45:
      score = 9;
      break;
    case param > 45 && param < 50:
      score = 10;
      break;
    default:
      score = 10;
  }
  return score;
}

async function FreRisquee(param) {
  let score = "";
  switch (true) {
    case param > 0 && param < 20:
      score = 1;
      break;
    case param > 20 && param < 40:
      score = 2;
      break;
    case param > 40 && param < 60:
      score = 3;
      break;
    case param > 60 && param < 80:
      score = 4;
      break;
    case param > 80 && param < 100:
      score = 5;
      break;
    case param > 100 && param < 120:
      score = 6;
      break;
    case param > 120 && param < 140:
      score = 7;
      break;
    case param > 140 && param < 160:
      score = 8;
      break;
    case param > 160 && param < 180:
      score = 9;
      break;
    case param > 180 && param < 200:
      score = 10;
      break;
    default:
      score = 10;
  }
  return score;
}

async function FreDangereux(param) {
  let score = "";
  switch (true) {
    case param > 0 && param < 50:
      score = 1;
      break;
    case param > 50 && param < 100:
      score = 2;
      break;
    case param > 100 && param < 200:
      score = 3;
      break;
    case param > 200 && param < 300:
      score = 4;
      break;
    case param > 300 && param < 400:
      score = 5;
      break;
    case param > 400 && param < 500:
      score = 6;
      break;
    case param > 500 && param < 600:
      score = 7;
      break;
    case param > 600 && param < 700:
      score = 8;
      break;
    case param > 700 && param < 800:
      score = 9;
      break;
    case param > 800 && param < 1000:
      score = 10;
      break;
    default:
      score = 10;
  }
  return score;
}

async function Cornering(param) {
  let score = "";
  switch (true) {
    case param > 0 && param < 50:
      score = 1;
      break;
    case param > 50 && param < 100:
      score = 2;
      break;
    case param > 100 && param < 200:
      score = 3;
      break;
    case param > 200 && param < 300:
      score = 4;
      break;
    case param > 300 && param < 400:
      score = 5;
      break;
    case param > 400 && param < 500:
      score = 6;
      break;
    case param > 500 && param < 600:
      score = 7;
      break;
    case param > 600 && param < 700:
      score = 8;
      break;
    case param > 700 && param < 800:
      score = 9;
      break;
    case param > 800 && param < 1000:
      score = 10;
      break;
    default:
      score = 10;
  }
  return score;
}



async function calcScore() {
  TAccNerveuse = await AccNerveuse(1, 34)
  TAccRisquee = await AccRisquee(1,2)
  console.log("Acc Nerveuse score " +TAccNerveuse);
  console.log("Acc Risquee score " +TAccRisquee);
  
}
calcScore();

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
