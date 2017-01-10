
export function updateSearch(state, search) {
  return state.set('search', search);
}


export function fetchLocationAction(address, googleapi) {
     if (__DEV__) {
         console.log('fetchLocationAction: ', `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleapi}`);
     }
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleapi}`)
        .then(function(res) {
          return res.json();
        })
        .then(function(resJson) {
          if(resJson.status != 'ZERO_RESULTS' && resJson.status != 'REQUEST_DENIED') {
            if (__DEV__) {
                console.log(resJson.results);
            }
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
          if (__DEV__) {
              console.error(error);
          }
          return null;
        });
}
