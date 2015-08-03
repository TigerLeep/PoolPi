var PoolPi = require("./libs/poolpi.js");
var poolPi = new PoolPi();

poolPi.InitializeLogging("./logs/poolpi.log");
poolPi.ReadSensors();
