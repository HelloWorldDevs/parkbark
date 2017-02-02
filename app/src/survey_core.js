
export function setParkSurvey(state, selectedParkTitle) {
  return state.merge({'park_form': {'title': selectedParkTitle}});
}

export function updateParkSurvey(state, updateValue) {
    var update = {};
    update[updateValue.title] = updateValue.value;
    return state.setIn(['park_form', updateValue.title], updateValue.value);
}


export function sendSurveyResponses(formData) {
    return fetch('http://parkbark-api.bfdig.com/entity/node', {
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
              "field_survey_type":[{"value": formData.type}],
              "field_notes":[{"value": formData.notes}],
              "field_number_of_dogs":[{"value": formData.num_dogs}],
              "field_device_id":[{"value": formData.deviceId}],
              "field_park_address_suggested":[{"value": formData.address}],
              "field_park_amenities": [
                {"target_id": formData.drinking_water},
                {"target_id": formData.agility_course},
                {"target_id": formData.covered_area},
                {"target_id": formData.fenced_area},
                {"target_id": formData.hiking_trails},
                {"target_id": formData.off_leash},
                {"target_id": formData.poop_bags},
                {"target_id": formData.restrooms},
                {"target_id": formData.shade},
                {"target_id": formData.small_dogs},
                {"target_id": formData.benches}
              ]
          })
    })
    .then((response) => response.json())
    .then((responseData) => {
        if (__DEV__) {
            console.log(responseData)
        }
    })
}
