import {fromJS} from 'immutable';
var Entities = require('html-entities').XmlEntities;
entities = new Entities();

export function setLocations(state, locations) {
  return state.set('location', locations);
}

export function setPosition(state, userLatLong) {
  return state.set('position', userLatLong);
}

export function updateAnnotations(state, newState) {
  console.log(newState);
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
  console.log(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleapi}`);
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

