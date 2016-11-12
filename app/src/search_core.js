
export function updateSearch(state, search) {
  return state.set('search', search);
}


export function fetchLocationAction(address, googleapi) {
    console.log(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleapi}`);
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleapi}`)
        .then(function(res) {
          return res.json();
        })
        .then(function(resJson) {
          if(resJson.status != 'ZERO_RESULTS') {
            var region = {};
            region.latitude = resJson.results[0].geometry.location.lat;
            region.longitude = resJson.results[0].geometry.location.lng;
            region.latitudeDelta = .1;
            region.longitudeDelta = .1;
            return region;
          } else {
            return 'no location alert';
          }
        })
        .catch((error) => {
          console.error(error);
        })
}

