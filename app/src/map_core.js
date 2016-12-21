import {fromJS} from 'immutable';

var Entities = require('html-entities').XmlEntities;
entities = new Entities();

export function setLocations(state, locations) {
  return state.set('location', locations);
}

export function recordLocation(state, newCoords) {
  return state.set('new_coords', newCoords);
}

export function setPosition(state, userLatLong) {
  return state.set('position', userLatLong);
}

export function updateAnnotations(state, newState) {
  return state.updateIn(['location','parks'], 0,  parks => parks = newState);
}

export function mapHide(state, hideState) {
  return state.set('hide', hideState)
}

export function updateRegion(state, newState) {
  return state.updateIn(['location', 'coords'], 0, coords => coords = newState);
}

export function updateSearch(state, search) {
  return state.set('search', search);
}

export function updateParksAction(coords, dist){
  // console.log('updateParksAction');
  return fetch('http://parkbark-api.bfdig.com/parks?loc=' + coords + '<=' + dist + 'miles', {
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
          park.proximity = item.field_park_address_proximity;
          park.title = entities.decode(item.title);
          park.image = item.field_park_image;
          park.address = item.field_park_address;
          park.address_display = entities.decode(item.field_park_address_display);
          park.amenities = item.field_park_amenities;
          park.details = entities.decode(item.field_park_details);
          var latitude = parseFloat(item.field_park_address.split(',')[0]);
          var longitude = parseFloat(item.field_park_address.split(',')[1]);
          park.latlng = {
            latitude: latitude,
            longitude: longitude
          };
          park.distance = 'apx. ' + parseFloat(item.field_park_address_proximity).toFixed(1) + 'mi';
          parks.push(park);
        });
        return parks;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
}


export function getDistance(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
          Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = (R * c) * 0.62; // Distance in miles
  return d.toFixed(1);
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
