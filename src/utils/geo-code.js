const request = require("request");

const geoCodeRequest = (address, callBack) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoidmlub2RjaCIsImEiOiJja3gwazk2ZDcxOGU0Mm51cm1pamVwc25zIn0.k09WZOluGsDvLdIjOMZ6LQ&limit=1";

  request({ url, json: true }, (error, response = {}) => {
    if (error) callBack("Pls connect to your internet", undefined);
    else if (response.body.features.length === 0) {
      callBack("Unable to find the location! Please try for another location");
    } else {
      const latitude = response.body.features[0].center[1];
      const longitude = response.body.features[0].center[0];
      const location = response.body.features[0].place_name;
      callBack(undefined, { latitude, longitude, location });
    }
  });
};

module.exports = geoCodeRequest;
