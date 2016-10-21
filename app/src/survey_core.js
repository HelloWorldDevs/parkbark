
export function setParkSurvey(state, selectedParkTitle) {
    console.log('set park survey')
  return state.merge({'park_form': {'title': selectedParkTitle}});
}

export function updateParkSurvey(state, updateValue) {
    var update = {};
    update[updateValue.title] = updateValue.value;
    return state.setIn(['park_form', updateValue.title], updateValue.value);
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
