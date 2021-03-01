const { Client } = require("pg");
const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  database: "Fleetium216",
  password: "fleetium",
});
 client.on("connect",()=>{
    console.log("Database connection ")
})
client.on("end",()=>{
    console.log("Connection End")
}) 
module.exports=client;

