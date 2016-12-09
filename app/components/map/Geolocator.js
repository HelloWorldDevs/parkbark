import {Map} from 'immutable';
import {PermissionsAndroid, Alert} from 'react-native';


class Geolocator {
  constructor(store) {

    //set default position
    store.dispatch({
      type: 'SET_LOCATION',
      state: Map({
        coords: {
          latitude: 45.523031,
          longitude: -122.676772,
          latitudeDelta: .1,
          longitudeDelta: .1
        },
        default_position: {
          latitude: 45.523031,
          longitude: -122.676772
        },
        parks: []
      })
    });

    ////// check for permissions on android, works with SDK API versions 23 and above
    async function requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.requestPermission(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              'title': 'Park Bark Needs Your Location',
              'message': 'Park Bark uses your location to suggest  dog parks in your area.'
            }
        );
        if (granted) {
          console.log("Location Position Allowed")
        } else {
          console.log("Location Permission Denied")
        }
      } catch (err) {
        console.warn(err)
      }
    }

    //////get current position and set users location
    navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('get current position', position);
          store.dispatch({
            type: 'SET_LOCATION',
            state: Map({
              coords: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: .1,
                longitudeDelta: .1
              },
              parks: []
            })
          });
          const userLatLng = {latitude: position.coords.latitude, longitude: position.coords.longitude};
          store.dispatch({type: 'SET_POSITION', state: userLatLng})

          ////// on success add watch to users location to update state on location change.
          navigator.geolocation.watchPosition(
              (position) => {
                store.dispatch({
                  type: 'SET_LOCATION',
                  state: Map({
                    coords: {
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude,
                      latitudeDelta: .1,
                      longitudeDelta: .1
                    },
                    parks: []
                  })
                });
              },
              (error) => {
                console.log(error);
                requestLocationPermission();
              }
          )
        },
        (error) => {
          console.log(error);
          requestLocationPermission();
        },
        {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
    );
  }
}

export default Geolocator;
