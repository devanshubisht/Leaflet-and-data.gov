import axios from "axios";

const TEMP = "air-temperature";
const RAINFALL = "rainfall";
const HUMIDITY = "relative-humidity";
const WINDDIR = "wind-direction";
const WINDSPEED = "wind-speed";

export default async function getRealTimeWeather(
  type: string,
  datetime?: string
): Promise<void> {
  const apiUrl = "https://api.data.gov.sg/v1/environment/" + type;
  let url = `${apiUrl}?`;

  if (datetime) {
    if (datetime.includes("T")) {
      // Input is in the format YYYY-MM-DDTHH:mm:ss
      url += `date_time=${datetime}`;
    } else {
      // Input is in the format YYYY-MM-DD
      url += `date=${datetime}`;
    }
  }

  try {
    const response = await axios.get(url);
    const data = response.data;

    //Getting the Name of the respective StationID for each respective reading. [can make the faster in the future my creating a hashmap of ID->Name]
    const stationValues = data.items.map((item: any) => {
      const timestamp = item.timestamp;
      const readings = item.readings.map((reading: any) => {
        const station = data.metadata.stations.find(
          (station: any) => station.id === reading.station_id
        );
        return {
          stationId: station.id,
          stationName: station.name,
          stationValue: reading.value,
          stationLat: station.location.latitude,
          stationLong: station.location.longitude,
        };
      });

      return { timestamp, readings };
    });

    // Printing the results
    stationValues.forEach((entry) => {
      console.log(`Timestamp: ${entry.timestamp}`);
      entry.readings.forEach((reading) => {
        console.log(
          `StationID: ${reading.stationId}, Station: ${reading.stationName}, ${type}: ${reading.stationValue}, ${reading.stationLat}, ${reading.stationLong}`
        );
      });
      console.log("------------------");
    });
  } catch (error) {
    throw new Error(
      error.response && error.response.data
        ? error.response.data.message
        : error.message
    );
  }
}


// const datetime1 = "2023-06-05T13:00:00";

// getRealTimeWeather(TEMP).catch((error) => {
//   console.error(error);
// });
