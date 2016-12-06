import {Map} from 'immutable';

class Geolocator {
  constructor(store) {
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
