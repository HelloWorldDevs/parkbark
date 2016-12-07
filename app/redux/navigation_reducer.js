import {Map} from 'immutable';


export function updateScene(state, scene) {
  return state.set('scene', scene);
}

export default function(state = Map({}), action) {
  switch (action.type) {
    case 'UPDATE_SCENE':
      return updateScene(state, action.state);
  }
  return state;
}