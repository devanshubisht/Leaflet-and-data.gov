async function getRealTimeWeather(type, datetime = undefined) {
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
      const response = await fetch(url);
      const data = await response.json();
  
      // Getting the Name of the respective StationID for each respective reading.
      const stationValues = data.items.map((item) => {
        const timestamp = item.timestamp;
        const readings = item.readings.map((reading) => {
          const station = data.metadata.stations.find(
            (station) => station.id === reading.station_id
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
  
      return stationValues; // Return the extracted data

    } catch (error) {
      throw new Error(
        error.response && error.response.data
          ? error.response.data.message
          : error.message
      );
    }
  }

export default getRealTimeWeather;