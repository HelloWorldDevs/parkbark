import {Map} from 'immutable';

class Geolocator {
  constructor(store) {

    //set default position
    store.dispatch({
      type: 'SET_LOCATION',
      state : Map({
        coords:{
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

    //get current position and set users location
    navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('get current position', position);
          store.dispatch({
            type: 'SET_LOCATION',
            state : Map({
              coords:{
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: .1,
                longitudeDelta: .1
              },
              parks: []
            })
          });
          const userLatLng = {latitude: position.coords.latitude, longitude: position.coords.longitude};
          // console.log(userLatLng);
          store.dispatch({type: 'SET_POSITION', state: userLatLng})
        },
        (error) => {
          console.log(error);
        },
        {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
    );
  }

}

export default Geolocator;
