
export function setLocations(state, locations) {
  // console.log('inside of setLocation');
  // console.log(locations);
  return state.set('location', locations);
}

//TODO set navigator props and routes to redux store?
// export function setNavigatorProps(state, navigatorProps){
//   console.log('inside of setRoutes');
//   return state.set('navigator_props', navigatorProps);
// }

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
  console.log(selectedPark);
  return state.merge({'current_park': selectedPark});
}

export function setParkSurvey(state, selectedParkTitle) {
  console.log(selectedParkTitle);
  return state.merge({'park_form': {'title': selectedParkTitle}});
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
        console.log(resJson);
        var parks = [];
        resJson.forEach((item)=> {
          var park = {};
          park.title = item.title;
          park.image = item.field_park_image;
          park.address = item.field_park_address;
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
        console.log(parks);
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
            "title":[{"value": formData.title}],
            "field_notes":[{"value":formData.notes}],
            "field_number_of_dogs":[{"value":formData.num_dogs}],
            "field_device_id":[{"value": 'abc123'}],
            "field_park_address_suggested":[{"value": formData.suggested_park}],
            "field_park_amenities": [
            	{"target_id": "3"},
            	{"target_id":"2"}
            ]
        })
    })
    .then((response) => response.json())
    .then((responseData) => {
        console.log(responseData)
    })
    .done();
}
