try {
    var azure = require("azure-storage");
    var connectionString =  process.env.connectionString;
    var tableSvc = azure.createTableService(connectionString);
  } catch (error) {
    console.log("can not connect to azure table storage");
  }

  module.exports = {
      azure,
      tableSvc
  }