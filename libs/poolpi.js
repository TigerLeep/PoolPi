var log4js = require("log4js")
var async = require("async");
var PoolSensor = require("./sensor.js");
var PoolData = require("./pooldata.js");
var Store = require("./store.js");

var PoolPi = function()
{
    var _log  = null;
    var _store = new Store();
    
    this.InitializeLogging = function(logFile)
    {
        //log4js.clearAppenders(); // Uncomment to stop logs from going to console.
        log4js.loadAppender("file");
        log4js.addAppender(log4js.appenders.file(logFile), "poolpi");
        _log = log4js.getLogger("poolpi");
    };
    
    this.ReadSensors = function()
    {
        _log.info("PoolPi started");
        
        var airSensor = new PoolSensor("28-0000066ec38c");
        var poolSensor = new PoolSensor("28-000006a36a5b");

        async.parallel(
            [
                function(callback)
                {
                    airSensor.Read(function(err, temperature)
                    {
                        _log.info("Read Air Temperature: " + temperature);
                        callback(err, {sensor: "Air", temperature: temperature});
                    });
                },
                function(callback)
                {
                    poolSensor.Read(function(err, temperature)
                    {
                        _log.info("Read Pool Temperature: " + temperature);
                        callback(err, {sensor: "Pool", temperature: temperature});
                    });
                }
            ],
            function(err, result)
            {
                var poolData = new PoolData();
                poolData.ReadingTime = new Date();
                
                for(var index in result)
                {
                    var reading = result[index];
                    if (reading.sensor == "Air")
                    {
                        poolData.AirTemperature = reading.temperature;
                    }
                    else if(reading.sensor == "Pool")
                    {
                        poolData.PoolTemperature = reading.temperature;
                    }
                }
                _store.Save(poolData);
            }
        );
    };
};

function displayReadings(poolData)
{
    var airFahrenheit = poolData.AirTemperature * 9 / 5 + 32;
    var poolFahrenheit = poolData.PoolTemperature * 9 / 5 + 32;
    console.log("Air Temperature: " + airFahrenheit);
    console.log("Pool Temperature: " + poolFahrenheit);
}

module.exports = PoolPi;