import getRealTimeWeather from "./test.js";

var mymap = L.map("mapid", {}).setView(
  [1.3503881629328163, 103.85132690751749], // center is set here
  13
);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(mymap);

const markers = [];

let selection = document.getElementById("mySelect");
let time = document.getElementById("timeQuery");
let data = null;
console.log(time);
console.log(selection);

selection.addEventListener("change", async () => {
  var selectedValue = selection.value;
  let formattedDateTime = null;
  let selectedDateTime = null;
  if (time.value != "") {
     selectedDateTime = time.value;
     formattedDateTime = selectedDateTime + ':00';
  }
  // Run different scripts based on the selected value
  switch (selectedValue) {
    case "air-temperature":
      // Call the temperature script function
      data = await getRealTimeWeather("air-temperature",formattedDateTime);
      updateMarker(data, selectedValue);
      break;
    case "rainfall":
      // Call the rainfall script function
      data = await getRealTimeWeather("rainfall",formattedDateTime);
      updateMarker(data, selectedValue);
      break;
    case "relative-humidity":
      // Call the humidity script function
      data = await getRealTimeWeather("relative-humidity",formattedDateTime);
      updateMarker(data, selectedValue);
      break;
    case "wind-direction":
      // Call the wind direction script function
      data = await getRealTimeWeather("wind-direction",formattedDateTime);
      updateMarker(data, selectedValue);
      break;
    case "wind-speed":
      // Call the wind speed script function
      data = await getRealTimeWeather("wind-speed",formattedDateTime);
      updateMarker(data, selectedValue);
      break;
    default:
      data = null;
      console.log("Invalid option selected");
  }
});

time.addEventListener("change", async() => {
    const selectedDateTime = time.value;
    const formattedDateTime = selectedDateTime + ':00';

    if (selection.value == null) { // i do not need this a default value is there.
        return;
    } else {
        var selectedValue = selection.value;

        switch (selectedValue) {
            case "air-temperature":
              // Call the temperature script function
              data = await getRealTimeWeather("air-temperature",formattedDateTime );
              updateMarker(data, selectedValue);
              break;
            case "rainfall":
              // Call the rainfall script function
              data = await getRealTimeWeather("rainfall", formattedDateTime);
              updateMarker(data, selectedValue);
              break;
            case "relative-humidity":
              // Call the humidity script function
              data = await getRealTimeWeather("relative-humidity", formattedDateTime);
              updateMarker(data, selectedValue);
              break;
            case "wind-direction":
              // Call the wind direction script function
              data = await getRealTimeWeather("wind-direction", formattedDateTime);
              updateMarker(data, selectedValue);
              break;
            case "wind-speed":
              // Call the wind speed script function
              data = await getRealTimeWeather("wind-speed", formattedDateTime);
              updateMarker(data, selectedValue);
              break;
            default:
              data = null;
              console.log('No type selected');
              console.log(selectedValue);
          }
    }
})

async function removeAllMarkers() {
  markers.forEach((marker) => {
    marker.remove(); // Remove each marker from the map
  });
}

async function updateMarker(data, selectedValue) {
  await removeAllMarkers();
  data.forEach((entry) => {
    const time = entry.timestamp;
    entry.readings.forEach((reading) => {
      const marker = L.marker([reading.stationLat, reading.stationLong], {
        title: reading.stationName,
      })
        .bindPopup(`Location: ${reading.stationName}. The ${selectedValue} is ${reading.stationValue} at ${time}`)
        .addTo(mymap);
      markers.push(marker);
    });
  });
}

//add circles id you want!

//can adjust according to bounds!
