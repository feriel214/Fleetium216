





var redis = require("redis")
var client = redis.createClient({ host: 'redis-15701.c9.us-east-1-4.ec2.cloud.redislabs.com', port: 15701, password: "G2u3mLtpJ7lqmyMZRzrX1YWlZ9DO7EIg",db:0});
var Tile38 = require('tile38');
var client1 =  new Tile38({host: 'redis-15701.c9.us-east-1-4.ec2.cloud.redislabs.com', port: 15701, password: "G2u3mLtpJ7lqmyMZRzrX1YWlZ9DO7EIg", debug: false});

/*
 client.hmset('call', [
  'name',"8",
  'company', "6",
  'phone', "5",
  'time', "2",
 ], function(error, reply){
  if(error){
   console.log(error);
  }
  console.log(reply);
  return res.redirect('/');
 });

return;
client.on("error", function(error) {
  console.error(error);
});*/
console.log(client);
client.hmset('fffff', [33.5123, -112.2693]);
client.getPoint(0, 'fffff').then(obj => {
    // will print:  { point: { lat: 33.5211, lon: -112.271 } }
    console.dir(obj);
}).catch(err => {
    console.error(err);
});
return;
client.hmset('frameworks', 'javascript', 'AngularJS', 'css', 'Bootstrap', 'node', 'Express');

client.hgetall('frameworks', function(err, object) {
    console.log(object);
});
return;
client.hmset('truck1', 'truck2', '33.5123', -112.2693);












//https://nominatim.openstreetmap.org/search/36.4112,10.1891?format=json&addressdetails=1&limit=1&polygon_svg=1

/*
var t = "M 10.1917934 -36.4067125 L 10.1919141 -36.4068896 10.1921287 -36.4072436 10.1923701 -36.40763 10.1925901 -36.4079711 10.1927698 -36.408256 10.1929656 -36.4085712 10.1931131 -36.4088539 10.1931936 -36.4090547 10.1932338 -36.4092749 10.1932465 -36.4094147 10.19327 -36.4095291 10.1933156 -36.4096489 10.1933659 -36.4097487 10.1934215 -36.4098852 10.1934477 -36.4100056 10.1934443 -36.4100954 10.193438 -36.4101551 10.1934215 -36.410229 10.1933853 -36.4103542 10.1933357 -36.4105463 10.1933055 -36.4106915 10.1932744 -36.410774 10.1932261 -36.4108693 10.1931634 -36.4109494 10.1930688 -36.4110406 10.1929522 -36.411127 10.192753 -36.4112392 10.1924989 -36.4113801 10.192232 -36.4115322 10.1920141 -36.4116337 10.191607 -36.4117929 10.1914025 -36.4118657 10.191019 -36.4120239 10.1908775 -36.4120892 10.1906689 -36.4121755 10.1897469 -36.4125473 10.1893526 -36.4127292 10.1891595 -36.4128506 10.1890133 -36.4129402 10.1889148 -36.4129823 10.1888417 -36.4130017 10.1886767 -36.4130308 10.1885547 -36.4130502 10.1884031 -36.4130783 10.1883079 -36.413101 10.1882147 -36.4131382 10.1881041 -36.4131916 10.1880001 -36.4132272 10.1878633 -36.4132763";
t.replace("M","");
t.replace("L","");

t = t.split(" ");

var data=[];
data['lat']=[];
data['lng']=[];

for(var i in t){
	i % 2 == 0 ? data['lat'] = t[i] : data['lng'] = t[i];
}
console.log(data);
*/

//connection s
/*var redis = require('redis');
var Tile38 = require('tile38');
var client =  new Tile38({host: 'redis-15701.c9.us-east-1-4.ec2.cloud.redislabs.com', port: 15701, password: "G2u3mLtpJ7lqmyMZRzrX1YWlZ9DO7EIg", debug: false, logger: myLogger });
//var client = new Tile38({port:9851});

const myLogger = {
   log: function(msg) { console.log("Log:"+msg);},
   warn: function(msg) { console.log("warn:"+msg); },
   error: function(msg) { console.log("error:"+msg); }
}



//console.log(client);
//client.intersectsQuery('fleet').bounds(33.462, -112.268, 33.491 -112.245)
client.set("fleet", 'truck1', [33.5123, -112.2693]).then(() => {
    console.log("done");
}).catch(err => {
    console.error(err);
});*/

/*client.get(6000, 'truck1').then(data => {
  console.log(data); // prints coordinates in geoJSON format

}).catch(err =>{
  console.log(err); // id not found  
});*/

// save a location

// save a location with additional fields
//client.set('fleet', 'truck2', [33.5123, -112.2693], { value: 10, othervalue: 20});


/*
console.log("#########################################################");

client.get('fleet', 'truck1').then(data => {
  console.log(data); // prints coordinates in geoJSON format

}).catch(err =>{
  console.log(err); // id not found  
});*/