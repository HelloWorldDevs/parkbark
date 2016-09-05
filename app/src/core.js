import {Map} from 'immutable';


export function setLocations(state, locations) {
  console.log('inside of setLocation');
  return state.set('location', locations);
}

export function updateAnnotations(state, newState) {
  console.log(newState);
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
        var markers = [];
        resJson.forEach((item)=> {
          var marker = {};
            marker.latitude = parseFloat(item.field_park_address.split(',')[0]);
            marker.longitude = parseFloat(item.field_park_address.split(',')[1]);
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