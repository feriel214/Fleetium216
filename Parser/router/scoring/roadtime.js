var startdate = 1584556200000;
var enddate = 1584595800000;

// differnce Result: 0 hours, 46 minutes and 16 seconds
	
		var dS = new Date(startdate);
		var dE = new Date(enddate);
        //plage 1
		dS.setHours(02,00,00,00);
		dE.setHours(02,00,00,00);
		pS1 = dS.getTime();
		pE1 = dE.getTime();
		//plage 2
		dS.setHours(16,00,00,00);
		dE.setHours(16,00,00,00);
		pS2 = dS.getTime();
		pE2 = dE.getTime();
		//plage 3
		dS.setHours(20,00,00,00);
		dE.setHours(20,00,00,00);
		pS3 = dS.getTime();
		pE3 = dE.getTime();

		var C1 = Calcul(startdate,enddate,pS1,pE2) > 0 ? timeDifference(Calcul(startdate,enddate,pS1,pE2)) : false;
		var C2 = Calcul(startdate,enddate,pS2,pE3) > 0 ? timeDifference(Calcul(startdate,enddate,pS2,pE3)) : false;	
		var C3 = Calcul(startdate,enddate,pS3,pE1) > 0 ? timeDifference(Calcul(startdate,enddate,pS3,pE1)) : false;
		
		console.log(new Date(startdate));
		console.log(new Date(enddate));
		console.log("C1",(C1));
		console.log("C2",(C2));
		console.log("C3",(C3));
        var roadTime1= C1 ? 840*C1.day+roadTimeTrip(C1) : 0;
        var roadTime2= C2 ? 240*C1.day+roadTimeTrip(C2) : 0;
        var roadTime3= C3 ? 360*C1.day+roadTimeTrip(C3) : 0;
        console.log('Trip roads '+'\nroadTime1 : '+roadTime1+'\nroadTime2 : '+roadTime2+'\nroadTime3 : '+roadTime3)
     

		
		
		function Calcul(startdate,enddate,p1,p2) {
			console.log(p1 ,p2);
			console.log(startdate ,enddate);
			if(startdate >= p1 && enddate <= p2){
				var C1 = enddate - startdate
				console.log(11111);
			}else if(startdate >= p1 && enddate > p2){
				var C1 =p2-startdate
				console.log(22222);
			}else if(startdate < p1 && enddate <= p2){
				var C1 = enddate-p1
				console.log(33333);
			}else if(startdate < p1 && enddate >= p2 && startdate >= p2){
				var C1 = enddate-p1
				console.log(44444);
			}else if(startdate < p1 && enddate >= p2 ){
				var C1 = p2-p1 > 0 ? p2-p1 : p1-p2;
				console.log(55555);
			}else{
				var C1 = 0;
				console.log(66666);
			}
			return C1;
		}
		function timeDifference(SSSS) {
			var difference = (SSSS);
			result = {};
			result.day = Math.floor(difference/1000/60/60/24);
			difference -= result.day *1000*60*60*24

			result.hour = Math.floor(difference/1000/60/60);
			difference -= result.hour *1000*60*60

			result.minute = Math.floor(difference/1000/60);
			difference -= result.minute*1000*60
 
			result.seconds = Math.floor(difference/1000);
			return result;
		}

        
		function roadTimeTrip(C){
           return  roadTime=C.hour*60+C.minute+C.seconds/60;
        }