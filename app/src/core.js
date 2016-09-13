import {Map} from 'immutable';


export function setLocations(state, locations) {
  console.log('inside of setLocation');
  return state.set('location', locations);
}

//TODO set navigator props and routes to redux store?
// export function setNavigatorProps(state, navigatorProps){
//   console.log('inside of setRoutes');
//   return state.set('navigator_props', navigatorProps);
// }

export function updateAnnotations(state, newState) {
  // console.log(newState);
  return state.updateIn(['location','markers'], 0,  markers => markers = newState);
}

export function updateRegion(state, newState) {
  return state.updateIn(['location', 'coords'], 0, coords => coords = newState);
}


export function fetchParksAction(){
  // return (dispatch, getState) => {
  return fetch('http://parkbark-api.bfdig.com/parks', {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
      .then(function(res) {
        return res.json();
      })
      .then(function(resJson) {
        console.log(resJson);
        var markers = [];
        resJson.forEach((item)=> {
          var marker = {};
            var latitude = parseFloat(item.field_park_address.split(',')[0]);
            var longitude = parseFloat(item.field_park_address.split(',')[1]);
            marker.latlng = {
              latitude: latitude,
              longitude: longitude
            }
            marker.title = item.title;
            markers.push(marker);
        })
        return markers;
      })
      .catch((error) => {
        console.error(error);
      })
  // };
}