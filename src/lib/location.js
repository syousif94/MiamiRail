import Permissions from 'react-native-permissions';
import store from '~/store';
import geolib from 'geolib';

async function getPermission() {
  const response = await Permissions.requestPermission('location');
  switch (response) {
    case 'authorized':
      return;
    case 'denied':
      throw new Error('Location Permission Denied');
    default:
      throw new Error('Invalid Location Permission');
  }
}

async function openSettings() {
  await Permissions.openSettings();
  await getPermission();
}

async function checkPermission() {
  const response = await Permissions.getPermissionStatus('location');
  switch (response) {
    case 'authorized':
      return;
    case 'undetermined':
      return getPermission();
    case 'denied':
      return openSettings();
    default:
      throw new Error('Invalid Location Permission');
  }
}

function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      location => {
        resolve({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      },
      error => {
        reject(error);
      },
      {
        enableHighAccuracy: false,
      }
    );
  });
}

export async function getNearestStop() {
  await checkPermission();
  const location = await getLocation();
  const stops = store.getState().routes.stops;
  if (!stops) {
    throw new Error('No Stops');
  }
  const nearest = stops
    .map(stop => {
      const distance = geolib.getDistance(location, stop.coords);
      return { id: stop.id, distance };
    })
    .sort((a, b) => a.distance - b.distance)[0];
  return nearest;
}
