var fs = require("fs");

var sensor = function(sensorId)
{
    var _sensorId = sensorId;
    
    var _read = function(onSensorRead)
    {
        if (onSensorRead != null && typeof(onSensorRead) == "function")
        {
            fs.readFile(
                "/sys/bus/w1/devices/" + _sensorId + "/w1_slave",
                { encoding: 'utf-8' },
                function(err, data)
                {
                    var temperatureInCelsius = 0.0;
                    if (err)
                    {
                        onSensorRead(err, null);
                    }    
                    else
                    {
                        temperatureInCelsius = parseSensorData(data);
                        onSensorRead(null, temperatureInCelsius);
                    }
                });
        }
    };
    
    return (
    {
        Read: _read
    });
};

function parseSensorData(sensorData)
{
    var temperature = NaN;
    // Example Sensor Data:
    // 84 02 4b 46 7f ff 0c 10 35 : crc=35 YES
    // 84 02 4b 46 7f ff 0c 10 35 t=40250
    //
    // Confirm first line ends in "YES".
    // Parse 40250 from second line.
    // Convert to float 40.250 and return.
    // If 185000, error.
    
    var lines = sensorData.split(/[\n\r]/);
    
    if (lines.length >= 2 && lines[0].match(/YES$/))
    {
        var matches = lines[1].match(/t=(\d*)$/);
        if (matches.length >= 2)
        {
            var temperatureText = matches[1];
            if (temperatureText != "185000")
            {
                temperature = parseFloat(temperatureText) / 1000;
            }
        }
    }
    
    return temperature;
}

module.exports = sensor;

