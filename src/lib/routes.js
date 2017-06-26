import { AsyncStorage } from 'react-native';
import { getXML } from '~/lib/xml';
import _ from 'lodash';

export async function loadRoutes() {
  const routeStr = await AsyncStorage.getItem('routes');
  if (routeStr) {
    return JSON.parse(routeStr);
  }
  return routeStr;
}

async function fetchLines() {
  const lines = await getXML(
    'https://www.miamidade.gov/transit/WebServices/TrainMapShape/'
  ).then(result => {
    return _(result.RecordSet.Record)
      .map(point => ({
        latitude: parseFloat(point.Latitude[0], 10),
        longitude: parseFloat(point.Longitude[0], 10),
        line: point.LineID[0],
        order: parseInt(point.OrderNum[0], 10),
      }))
      .groupBy('line')
      .mapValues(group => _.orderBy(group, 'order'))
      .value();
  });
  return lines;
}

async function fetchStops() {
  const stops = await getXML(
    'https://www.miamidade.gov/transit/mobile/xml/TrainStations/'
  ).then(result => {
    return _(result.StationList.Station)
      .map(station => {
        const address = `${station.Address[0]}`;
        const city = `Miami, FL ${station.Zip[0]}`;
        const latitude = parseFloat(station.StationLat[0], 10);
        const longitude = parseFloat(station.StationLong[0], 10);
        const name = station.Station[0];
        const id = station.StationID[0];
        return {
          id,
          name,
          address,
          city,
          coords: {
            latitude,
            longitude,
          },
        };
      })
      .value();
  });
  return stops;
}

export async function fetchRoutes() {
  const [lines, stops] = await Promise.all([fetchLines(), fetchStops()]);
  const routes = {
    lines,
    stops,
  };
  await AsyncStorage.setItem('routes', JSON.stringify(routes));
  return routes;
}
