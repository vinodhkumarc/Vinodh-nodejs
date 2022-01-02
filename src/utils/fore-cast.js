const request = require("request");

const foreCast = (latitude, longitude, callBack) => {
  const params = `${latitude},${longitude}`;
  const url =
    "http://api.weatherstack.com/current?access_key=8394695957c38e5e63672bb2ab3c2f6b&query=" +
    params +
    "&units=f";
  request({ url, json: true }, (err, response) => {
    const { current, error } = response.body;
    if (err) callBack("unable to connect the internet");
    else if (error) callBack(error.info);
    else {
      const logMsg = `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out. But it feels like ${current.feelslike} degrees out.`;
      callBack(undefined, logMsg);
    }
  });
};

module.exports = foreCast;
