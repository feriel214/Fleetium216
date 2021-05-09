try {
    var azure = require("azure-storage");
    var connectionString =  process.env.connectionString;
    var tableSvc = azure.createTableService(connectionString);
  } catch (error) {
    console.log("can not connect to azure table storage");
  }

  const redis = require("redis");
  const redis_client = redis.createClient({
    host: process.env.host,
    port: process.env.port,
    password: process.env.password,
  });


  module.exports = {
      azure,
      tableSvc,
      redis_client

  }