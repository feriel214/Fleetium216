const redis = require("redis");
const fs = require("fs");
const Check = require("../model/pgModel");
require("dotenv").config();
const client = redis.createClient({
  host: process.env.host,
  port: process.env.port,
  password: process.env.password,
});

client.on("error", function (error) {
  console.error(error);
});
fs.createReadStream("demo1.txt")
  .on("data", (row) => {})
  .on("data", async (row) => {
    dataParser = row;
    row = dataParser.toString("utf8");
    var rows = row.split("\n");
    for (var j in rows) {
      var strArray = rows[j].split(",");
      // Old way to check but now were using function from pgModel //
      //console.log(strArray);
      //const query = await pool.query("SELECT * FROM cars WHERE mdmid  =$1",[strArray[1].slice(strArray[1].indexOf(":")+1)]);
      const result = await Check(
        strArray[1].slice(strArray[1].indexOf(":") + 1));
      if (result === null) {
        console.log(
          "This mdmid " +
            strArray[1].slice(strArray[1].indexOf(":") + 1) +
            " dont exist in postgres database"
        );
      } else {
        client.HMSET(
          result,
          "id_cars",
          result,
          "HEADER",
          strArray[0].slice(strArray[0].indexOf(":") + 1),
          "MDMID",
          strArray[1].slice(strArray[1].indexOf(":") + 1),
          "TS",
          strArray[2].slice(strArray[2].indexOf(":") + 1),
          "GPS",
          strArray[3].slice(strArray[3].indexOf(":") + 1),
          "STT",
          strArray[4].slice(strArray[4].indexOf(":") + 1),
          "MGR",
          strArray[5].slice(strArray[5].indexOf(":") + 1),
          "ADC",
          strArray[6].slice(strArray[6].indexOf(":") + 1),
          "OBD",
          strArray[7].slice(strArray[7].indexOf(":") + 1),
          "FUL1",
          strArray[8].slice(strArray[8].indexOf(":") + 1),
          "VIN",
          strArray[9].slice(strArray[9].indexOf(":") + 1),
          "EGT",
          strArray[10].slice(strArray[10].indexOf(":") + 1),
          "EVT",
          strArray[11].slice(strArray[11].indexOf(":") + 1)
        );
        console.log("added successfully in redis database :)");
      }
    }
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
  });