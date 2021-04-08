const { v1 } = require("uuid");

let nbJour=0;
let fonctionnement_moteur=0;
let idling=0;
let distance =0;
let arret=0;

/*************************************** RoadTime 2 *****************************/
//RoadTime Trip 1 & 2 & 3 
function RoadTimeTrip(ignition_on,ignition_off){
    let roadTime1=0;
    let roadTime2=0;
    let roadTime3=0;
    //Trip in plage 1   02h================>16h
    if(ignition_on>02 && ignition_off<=16){
        roadTime1= RoadTime1(ignition_on,ignition_off);    }
    //Trip in plage 2   16h================>20h
    if(ignition_on>16 && ignition_off<=20){
        roadTime2= RoadTime2(ignition_on,ignition_off)
    }
    //Trip in plage 3   20h================>02h
    if(ignition_on>20 && ignition_off<=02){
        roadTime3 = RoadTime3(ignition_on,ignition_off);
    }

    //Between plage 1 and plage 2
    if(ignition_on>02 && ignition_off <=20){
        console.log('trip betwwen plage 1 and plage 2 ')
    }
    //Between plage 2 and plage 3
    if(ignition_on>16 && ignition_off <=02){
        console.log('trip betwwen plage 1 and plage 2 ')
    }
    //Between plage 3 and plage 1
    if(ignition_on>20 && ignition_off <=16){
        console.log('trip betwwen plage 1 and plage 2 ')
    }
    //in all plage 1 & 2 & 3       wstart 1=========> ends 3
    if( ignition_on>2 && ignition_on<= 16 && ignition_off >20 && ignition_off <=02  ){
        console.log('trip into 3 plage   start 1=========> ends 3')
    } 
    //start 2=========> ends 1
    if(ignition_on>16 && ignition_on<=20 && ignition_off >02 && ignition_off <=16  ){
        console.log('trip into 3 plage   start 2=========> ends 1')
    } 
    //start 3=========> ends 2
    if(ignition_on>20 && ignition_on<=02 && ignition_off >16 && ignition_off <=20  ){
        console.log('trip into 3 plage   start 3=========> ends 2 ')
    } 
    
   
   
}

function RoadTime1(ignition_on,ignition_off){
    console.log('ignition_on',ignition_on)
    console.log('ignition_off',ignition_off)
    console.log("Trip in plage 1 start in  ",ignition_on," ends in : ",ignition_off);
}
function RoadTime2(ignition_on,ignition_off){
    console.log('ignition_on',ignition_on)
    console.log('ignition_off',ignition_off)
    console.log("Trip in plage 2 start in  ",ignition_on," ends in : ",ignition_off);
}
function RoadTime3(ignition_on,ignition_off){
    console.log('ignition_on',ignition_on)
    console.log('ignition_off',ignition_off)
    console.log("Trip in plage 3 start in  ",ignition_on," ends in : ",ignition_off);
}



RoadTimeTrip(8,22);

















































/*************************************** Scoring V3 *****************************/
// Vitesse for each trip 
//v1 between 0-90 km/h 
function vitesse1(){}
//v2 between 90-120 km/h 
function vitesse2(){}
//v3 gretaer than 120km/h 
function vitesse3(){}

/*************************************** Acceleration *****************************/
// Acceleration nerveuse C2 
// Acceleration risquée
// Acceleration dangereuse


/*************************************** Deceleration *****************************/
// Freinage excessif C2 
// Freinage risqué
// Freinage dangereux

/*************************************** Cornering *****************************/



function FinalScore(){

}