
let ignition=[];
let ignitioff=[];
let index=[]
function startIgnition(){  
    for (i=0;i<stt.length;i++){
      if(stt[i] == '0'){
       if(stt[i+1]!=undefined && stt[i+1] != '0'){
          ignition.push(stt[i+1])
          index.push(i+1)
       }
      }
    }
 }

 function endIgnition(){
    for (i=0;i<stt.length;i++){
         if(stt[i]!='0'){
             if(stt[i+1] != undefined && stt[i+1] == '0'){
                 ignitioff.push(stt[i+1])
             }
         }
      }
     
 }
 
