import {Map} from 'immutable';
import {googleapi} from '../api/googleapi.js';

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

export function updateSearch(state, search){
  console.log(search)
  return state.set('search', search);
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
        // console.log(resJson);
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


export function updateRegionMarkersAction(LAT , LNG, DIST){
  // return (dispatch, getState) => {
  return fetch('http://parkbark-api.bfdig.com/parks?loc='+ LAT + ',' + LNG + '<=' + DIST + 'miles', {
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
        // console.log(resJson);
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
        // console.log(markers);
        return markers;
      })
      .catch((error) => {
        console.error(error);
      })
  // };
}

export function fetchLocationAction(address, googleapi) {
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleapi}`)
      .then(function(res) {
        return res.json();
      })
      .then(function(resJson) {
        console.log(resJson);
      })
      .catch((error) => {
        console.error(error);
      })
}

export function sendSurveyResponses(deviceId, num_dogs, amenities, notes) {
    fetch('http://parkbark-api.bfdig.com/entity/node', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/hal+json',
            'Authorization': 'Basic Og== '
        },
        body: JSON.stringify({
            "_links": {
            	"type": {
            		"href":"http://parkbark-api.bfdig.com/rest/type/node/survey_responses"
            	},
            	"http://parkbark-api.bfdig.com/rest/relation/node/survey_responses/field_park_amenities": {
            		"href": "http://parkbark-api.bfdig.com/taxonomy/term/1?_format=hal_json"
            	}
            },
            "type":[{"target_id":"survey_responses"}],
            "title":[{"value":"testing-RN"}],
            "field_notes":[{"value":"How are you?"}],
            "field_number_of_dogs":[{"value":5}],
            "field_device_id":[{"value": "abc123"}],
            "field_park_amenities": [
            	{"target_id": "2"},
            	{"target_id": "4"}
            ]
        })
    })
}
