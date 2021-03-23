const redis = require("redis");
require("dotenv").config();
const redis_client = redis.createClient({
  host: 'redis-15701.c9.us-east-1-4.ec2.cloud.redislabs.com',
  port: 15701,
  password: 'G2u3mLtpJ7lqmyMZRzrX1YWlZ9DO7EIg',
});

const pool = require("../SQLDatabase/db.js");


pool.connect();


