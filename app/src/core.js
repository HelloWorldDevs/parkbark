import {fromJS} from 'immutable';
var Entities = require('html-entities').XmlEntities;
entities = new Entities();

export function setLocations(state, locations) {
  return state.set('location', locations);
}

export function updateAnnotations(state, newState) {
  return state.updateIn(['location','parks'], 0,  parks => parks = newState);
}

export function updateRegion(state, newState) {
  return state.updateIn(['location', 'coords'], 0, coords => coords = newState);
}

export function updateSearch(state, search) {
  return state.merge({'search': search});
}

export function updateSelectedPark(state, selectedPark) {
  return state.merge({'current_park': selectedPark});
}

export function setParkSurvey(state, selectedParkTitle) {
  return state.merge({'park_form': {'title': selectedParkTitle}});
}

export function updateParkSurvey(state, updateValue) {
    var update = {};
    update[updateValue.title] = updateValue.value;
    return state.setIn(['park_form', updateValue.title], updateValue.value);
}

export function setAmenities(state, amenities) {
  return state.set('amenities', fromJS(amenities));
}

export function addStagedFilter(state, filterIndex) {
  return state.setIn(['amenities', filterIndex, 'staged'], 'add');
}

export function removeStagedFilter(state, filterIndex) {
  return state.setIn(['amenities', filterIndex, 'staged'], 'remove');
}

export function addFilter(state, filterIndex) {
  console.log('add filter index', filterIndex)
  return state.setIn(['amenities', filterIndex, 'selected'], true);
}
export function removeFilter(state, filterIndex) {
  console.log('remove filter index', filterIndex)
  return state.setIn(['amenities', filterIndex, 'selected'], false);
}

export function clearFilters(state, filterState) {
  return state.update('amenities', amenities => amenities.map(amenity => amenity.update('selected', selected => selected = filterState)));
}

export function clearStaged(state, filterState){
  return state.update('amenities', amenities => amenities.map(amenity => amenity.update('staged', staged => staged = filterState)));
}

// export function fetchParksAction() {
//   // return (dispatch, getState) => {
//   return fetch('http://parkbark-api.bfdig.com/parks', {
//     method: 'get',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     }
//   })
//       .then(function(res) {
//         return res.json();
//       })
//       .then(function(resJson) {
//         var markers = [];
//         resJson.forEach((item)=> {
//           var marker = {};
//             var latitude = parseFloat(item.field_park_address.split(',')[0]);
//             var longitude = parseFloat(item.field_park_address.split(',')[1]);
//             marker.latlng = {
//               latitude: latitude,
//               longitude: longitude
//             }
//             marker.title = item.title;
//             markers.push(marker);
//         })
//         return markers;
//       })
//       .catch((error) => {
//         console.error(error);
//       })
//   // };
// }


export function updateParksAction(LAT, LNG, DIST){
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
        var parks = [];
        resJson.forEach((item)=> {
          var park = {};
          park.title = item.title;
          park.image = item.field_park_image;
          park.address = item.field_park_address;
          park.address_display = entities.decode(item.field_park_address_display);
          park.amenities = item.field_park_amenities;
          park.details = item.field_park_details;
          var latitude = parseFloat(item.field_park_address.split(',')[0]);
          var longitude = parseFloat(item.field_park_address.split(',')[1]);
          park.latlng = {
            latitude: latitude,
            longitude: longitude
          }
          park.distance = parseFloat(item.field_park_address_proximity).toFixed(1) + 'mi';
          parks.push(park);
        })
        // console.log(parks);
        return parks;
      })
      .catch((error) => {
        console.error(error);
      })
}

export function fetchLocationAction(address, googleapi) {
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleapi}`)
      .then(function(res) {
        return res.json();
      })
      .then(function(resJson) {
        var region = {};
        region.latitude = resJson.results[0].geometry.location.lat;
        region.longitude = resJson.results[0].geometry.location.lng;
        region.latitudeDelta = .1;
        region.longitudeDelta = .1;
        return region;
      })
      .catch((error) => {
        console.error(error);
      })
}

export function fetchAmenitiesAction() {
  return fetch('http://parkbark-api.bfdig.com/amenities', {
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
        return resJson;
      });
}


export function updateParksByFilterAction(coords, query) {
  // console.log('http://parkbark-api.bfdig.com/parks?loc=' + coords + '<=5miles&amenities=' + query);
  return fetch('http://parkbark-api.bfdig.com/parks?loc=' + coords + '<=5miles&amenities=' + query, {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
      .then(function(res) {
        // console.log(res);
        return res.json();
      }).then(function(resJson) {
        // console.log(resJson);
        var parks = [];
        resJson.forEach((item)=> {
          var park = {};
          park.title = item.title;
          park.image = item.field_park_image;
          park.address = item.field_park_address;
          park.address_display = entities.decode(item.field_park_address_display);
          park.amenities = item.field_park_amenities;
          park.details = item.field_park_details;
          var latitude = parseFloat(item.field_park_address.split(',')[0]);
          var longitude = parseFloat(item.field_park_address.split(',')[1]);
          park.latlng = {
            latitude: latitude,
            longitude: longitude
          }
          park.distance = parseFloat(item.field_park_address_proximity).toFixed(1) + 'mi';
          parks.push(park);
        })
        // console.log(parks);
        return parks;
      })
      .catch((error) => {
        console.error(error);
      })
}

export function sendSurveyResponses(formData) {
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
            "title":[{"value":'Check in at ' + formData.title}],
            "field_notes":[{"value":formData.notes}],
            "field_number_of_dogs":[{"value":formData.num_dogs}],
            "field_device_id":[{"value": formData.deviceId}],
            "field_park_address_suggested":[{"value": formData.suggested_park}],
            "field_park_amenities": [
            	{"target_id": formData.drinking_water},
            	{"target_id": formData.benches}
            ]
        })
    })
    .then((response) => response.json())
    .then((responseData) => {
        // console.log(responseData)
    })
    .done();
}
