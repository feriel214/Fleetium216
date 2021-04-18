function RoadSpeed(param) {
    let score = "";
    switch (true) {
      case param >= 4.5 && param < 5:
        score = 1;
        break;
      case param >= 4 && param < 4.5:
        score = 2;
        break;
      case param >= 3.5 && param < 4:
        score = 3;
        break;
      case param >= 3 && param < 3.5:
        score = 4;
        break;
      case param >= 2.5 && param < 3:
        score = 5;
        break;
      case param >= 2 && param < 2.5:
        score = 6;
        break;
      case param >= 1.5 && param < 2:
        score = 7;
        break;
      case param >= 1 && param < 1.5:
        score = 8;
        break;
      case param >= 0.5 && param < 1:
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

function Acceleration(param) {
    let score = "";
  switch (true) {
    case param >= 0 && param < 50:
      score = 1;
      break;
    case param >= 50 && param < 100:
      score = 2;
      break;
    case param >= 100 && param < 200:
      score = 3;
      break;
    case param >= 200 && param < 300:
      score = 4;
      break;
    case param >= 300 && param < 400:
      score = 5;
      break;
    case param >= 400 && param < 500:
      score = 6;
      break;
    case param >= 500 && param < 600:
      score = 7;
      break;
    case param >= 600 && param < 700:
      score = 8;
      break;
    case rparam >= 700 && param < 800:
      score = 9;
      break;
    case param >= 800 && param < 1000:
      score = 10;
      break;
    default:
      score = 10;
  }
  return score; 
}

function Freinage(param) {
    let score = "";
    switch (true) {
      case param >= 0 && param < 50:
        score = 1;
        break;
      case param >= 50 && param < 100:
        score = 2;
        break;
      case param >= 100 && param < 200:
        score = 3;
        break;
      case param >= 200 && param < 300:
        score = 4;
        break;
      case param >= 300 && param < 400:
        score = 5;
        break;
      case param >= 400 && param < 500:
        score = 6;
        break;
      case param >= 500 && param < 600:
        score = 7;
        break;
      case param >= 600 && param < 700:
        score = 8;
        break;
      case param >= 700 && param < 800:
        score = 9;
        break;
      case param >= 800 && param < 1000:
        score = 10;
        break;
      default:
        score = 10;
    }
    return score;
    }

function Cornering(param) {
        let score = "";
        switch (true) {
          case param >= 0 && param < 50:
            score = 1;
            break;
          case param >= 50 && param < 100:
            score = 2;
            break;
          case param >= 100 && param < 200:
            score = 3;
            break;
          case param >= 200 && param < 300:
            score = 4;
            break;
          case param >= 300 && param < 400:
            score = 5;
            break;
          case param >= 400 && param < 500:
            score = 6;
            break;
          case param >= 500 && param < 600:
            score = 7;
            break;
          case param >= 600 && param < 700:
            score = 8;
            break;
          case param >= 700 && param < 800:
            score = 9;
            break;
          case param >= 800 && param < 1000:
            score = 10;
            break;
          default:
            score = 10;
        }
        return score;
}

module.exports = {
  Cornering,
  Freinage,
  RoadSpeed,
  Acceleration
}