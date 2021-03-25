const { response } = require("express");

try {
    var azure = require("azure-storage");
    var connectionString =
      "DefaultEndpointsProtocol=https;AccountName=pfe2021;AccountKey=4MudxJfKGSTpZBFzu8AozK9x47mGpvsFOdF2iPnobcJTRlOd7X7jwSFFvppr4atXQoQL07upQHbBzZhd37xBNg==;EndpointSuffix=core.windows.net";
    var tableSvc = azure.createTableService(connectionString);
} catch (error) {
    console.log("can not connect to azure table storage");
}
function RoadTime(param){
    let score ='';
switch(true){
    case param>45 && param < 50 : score = 1
    break;
    case param>40 && param <45 :  score = 2
    break;
    case param>35 && param <40 : score = 3
    break;
    case param>30 && param <35 : score = 4
    break;
    case param>25 && param<30 : score = 5
    break;
    case param>20 && param < 25 : score = 6
    break;
    case param>15 && param <20 : score = 7
    break;
    case param>10 && param <15 : score = 8
    break;
    case param>5 && param < 10 : score = 9
    break;
    case param < 5 : score = 10
    break;
    default: score = 10
}
return score;
}

function RoadSpeed(param){
let score ='';
switch(true){
    case param>4.5 && param < 5 : score = 1
    break;
    case param>4 && param <4.5 :  score = 2
    break;
    case param>3.5 && param <4 : score = 3
    break;
    case param>3 && param <3.5 : score = 4
    break;
    case param>2.5 && param<3 : score = 5
    break;
    case param>2 && param < 2.5 : score = 6
    break;
    case param>1.5 && param <2 : score = 7
    break;
    case param>1 && param <1.5 : score = 8
    break;
    case param>0.5 && param < 1 : score = 9
    break;
    case param < 0.5 : score = 10
    break;
    default: score = 10
}
return score;
}

var arr=[];
function AccNerveuse(carId,test){
    let gg;
    PartitionKey = carId + "_" + "acceleration_threshold1_exceed";
    let query = new azure.TableQuery()
    .select(['*'])
    .where('PartitionKey eq?', PartitionKey);
     tableSvc.queryEntities('eventsdata',query,null,function (error, result , response){
        if(!error){
            gg = result.entries[0].obd_distance_travled_value._ / test;    
            console.log(gg);
            return arr.push(gg);
        }else{
            console.log("error");
        }
    });
  console.log('arr',arr)
    console.log('gg',gg)
    
let score = '';
    switch(true){
        case test >0 && test < 50 : score = 1
        break;
        case test >50 && test < 100 : score = 2
        break;
        case test >100 && test <200 : score = 3
        break;
        case test > 200 && test<300 : score = 4
        break;
        case test >300 && test< 400 : score= 5
        break;
        case test > 400 && test < 500 : score= 6
        break;
        case test >500 && test <600 : score = 7
        break;
        case test > 600 && test < 700 : score = 8
        break;
        case test > 700 && test < 800 : score = 9
        break;
        case test > 800 && test < 1000 : score = 10
        break;
        default: score = 10
    }
    return score;
}

function AccRisquee(param){
let score = '';
    switch(true){
        case param >0 && param < 1000 : score = 1
        break;
        case param > 1000 & param < 2000 : score = 2
        break;
        case param > 2000 & param < 3000 : score = 3
        break;
        case param > 3000 & param <4000 : score = 4
        break;
        case param > 4000 && param < 5000 : score = 5
        break;
        case param > 5000 && param < 6000 : score = 6
        break;
        case param > 6000 && param < 7000 : score = 7
        break;
        case param > 7000 && param < 8000 : score = 8
        break;
        case param > 8000 && param < 9000 : score = 9
        break;
        case param > 9000 && param < 10000 : score = 10
        break;
        default: score = 10
    }
    return score;    
}

function AccDangereuse(param){
    let score = '';
    switch(true){
        case param >0 && param < 2000 : score = 1
        break;
        case param > 2000 & param < 4000 : score = 2
        break;
        case param > 4000 & param < 6000 : score = 3
        break;
        case param > 6000 & param <8000 : score = 4
        break;
        case param > 8000 && param < 10000 : score = 5
        break;
        case param > 10000 && param < 12000 : score = 6
        break;
        case param > 12000 && param < 14000 : score = 7
        break;
        case param > 14000 && param < 16000 : score = 8
        break;
        case param > 16000 && param < 18000 : score = 9
        break;
        case param > 18000 && param < 20000 : score = 10
        break;
        default: score = 10
    }
    return score; 
}

function FreExcessif(param){
    let score = '';
    switch(true){
        case param > 0 && param < 5 : score = 1
        break;
        case param > 5  && param < 10 : score = 2
        break;
        case param > 10 && param < 15 : score = 3
        break;
        case param > 15 && param < 20 : score = 4
        break;
        case param > 20 && param < 25 : score = 5
        break;
        case param > 25 && param < 30 : score = 6
        break;
        case param > 30 && param < 35 : score = 7
        break;
        case param > 35 && param < 40 : score = 8
        break;
        case param > 40 && param < 45 : score = 9
        break;
        case param > 45 && param < 50 : score = 10
        break;
        default: score = 10
    }
    return score;
}


function FreRisquee(param){
let score = '';
    switch(true){
        case param > 0 && param < 20 : score = 1
        break;
        case param > 20 && param < 40 : score = 2
        break;
        case param > 40 && param < 60 : score = 3
        break;
        case param > 60 && param < 80 : score = 4
        break;
        case param > 80 && param < 100 : score = 5
        break;
        case param > 100 && param < 120 :score = 6
        break;
        case param > 120 && param < 140 : score = 7
        break;
        case param > 140 && param < 160 : score = 8 
        break;
        case param > 160 && param < 180 : score = 9
        break;
        case param > 180 && param < 200 : score = 10
        break;
        default: score = 10

    }
    return score;
}

function FreDangereux (param){
let score = ''
    switch(true){
        case param > 0 && param <50 : score = 1
        break;
        case param > 50 && param < 100 : score = 2
        break;
        case param > 100 && param < 200 : score = 3
        break;
        case param > 200 && param < 300 :score = 4
        break;
        case param > 300 && param < 400 : score = 5
        break;
        case param > 400 && param < 500 :score = 6
        break;
        case param > 500 && param < 600 : score = 7
        break;
        case param > 600 && param < 700 : score = 8
        break;
        case param > 700 && param < 800 : score = 9
        break;
        case param > 800 && param < 1000 : score = 10
        break;
        default: score = 10

    }
    return score;
}

function Cornering (param){
    let score = ''
        switch(true){
            case param > 0 && param <50 : score = 1
            break;
            case param > 50 && param < 100 : score = 2
            break;
            case param > 100 && param < 200 : score = 3
            break;
            case param > 200 && param < 300 :score = 4
            break;
            case param > 300 && param < 400 : score = 5
            break;
            case param > 400 && param < 500 :score = 6
            break;
            case param > 500 && param < 600 : score = 7
            break;
            case param > 600 && param < 700 : score = 8
            break;
            case param > 700 && param < 800 : score = 9
            break;
            case param > 800 && param < 1000 : score = 10
            break;
            default: score = 10
    
        }
        return score;
    }


/*RoadTime = RoadTime(24.98);
RoadSpeed = RoadSpeed(0.79);**/


AccNerveuse = AccNerveuse(1,34);
console.log("Your score is " +AccNerveuse);

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