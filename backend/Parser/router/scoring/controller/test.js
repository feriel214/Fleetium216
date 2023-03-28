let t = [1,3,2,3,6,5,4,4,4,4,4,7];
let test;
let number = 0;
let a = []
t.sort();
console.log(t);
for (i = 0 ; i < t.length-1; i++){
  test = 0;
  for(j = i+1 ; j < t.length ; j++){
    if(t[i] == t[j]){
      test = test +1;
    }
    if(t[i-1] == t[j]){
      test = test +1;
    }
  }
  if(test == 1){
    a.push(t[i]);
  }
}
console.log(a);