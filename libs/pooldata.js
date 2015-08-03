var log4js = require("log4js")

var pooldata = function(readingTime, airTemperature, poolTemperature)
{
    var _log = log4js.getLogger("poolpi");
    this.ReadingTime = readingTime;
    this.AirTemperature = airTemperature;
    this.PoolTemperature = poolTemperature;
};

module.exports = pooldata;

