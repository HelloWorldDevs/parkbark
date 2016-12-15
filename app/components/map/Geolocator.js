import {Map} from 'immutable';
import {PermissionsAndroid, Alert} from 'react-native';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";



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
    function requestLocationPermission() {
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message: "<h2>Park Bark Needs Your Location</h2>This app would like to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/>",
        ok: "OK",
        cancel: "No Thank You"
      }).then(function(success) {
        console.log(success); // success => "enabled"
      }).catch((error) => {
        console.log(error.message); // error.message => "disabled"
      });
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
