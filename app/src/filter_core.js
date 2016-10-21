import {fromJS} from 'immutable';

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
  return state.setIn(['amenities', filterIndex, 'selected'], true);
}
export function removeFilter(state, filterIndex) {
  return state.setIn(['amenities', filterIndex, 'selected'], false);
}

export function clearFilters(state, filterState) {
  return state.update('amenities', amenities => amenities.map(amenity => amenity.update('selected', selected => selected = filterState)));
}

export function clearStaged(state, filterState){
  return state.update('amenities', amenities => amenities.map(amenity => amenity.update('staged', staged => staged = filterState)));
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
