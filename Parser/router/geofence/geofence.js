const redis = require("redis");
require("dotenv").config();
const redis_client = redis.createClient({
  host: 'redis-15701.c9.us-east-1-4.ec2.cloud.redislabs.com',
  port: 15701,
  password: 'G2u3mLtpJ7lqmyMZRzrX1YWlZ9DO7EIg',
});

const pool = require("../SQLDatabase/db.js");


pool.connect();




EditForm(item){
 
  console.log('item : ', item)
  console.log('posts : ', this.posts)
  let id = this.idredis
  console.log('this.newgeo',this.newgeo)
  let data ={}
  let param ='';
    if (!Object.entries(this.newgeo).length === 0) {
      //update fence and form
      data = {
        geojson: [this.newgeo],
        name: item.name,
        description: item.description,
        time_start: item.startTime,
        time_end: item.endTime,
        rang: item.range,
        cars: item.cars,
        type_fence : item.type_fence
      }
      param='ff';
    }else {
      //update fence only form
      data = {
        name: item.name,
        description: item.description,
        time_start: item.startTime,
        time_end: item.endTime,
        rang: item.range,
        cars: item.cars,
        type_fence : item.type_fence
      }
      param ='f';
    }
        axios.put(`http://localhost:3000/fences/edit/${id}/${param}`,data)
        .then((res)=>{
          console.log('res : ', res)
              this.showForm = false
              this.$toast.success(`Geofence Updated Successfully ! `)
              this.getGeo()
              this.DrawControl('ADD')
              this.clearMap(1000);
              this.geocoderInit("add")

        }).catch(function(error){
          console.log(error)
        })

}