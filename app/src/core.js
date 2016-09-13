import {Map} from 'immutable';


export function setLocations(state, locations) {
  console.log('inside of setLocation');
  return state.set('location', locations);
}

export function setNavigatorProps(state, navigatorProps){
  console.log('inside of setRoutes');
  console.log(navigatorProps);
  return state.merge({navigator_props: navigatorProps});
}

export function updateAnnotations(state, newState) {
  // console.log(newState);
  return state.updateIn(['location','markers'], 0,  markers => markers = newState);
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