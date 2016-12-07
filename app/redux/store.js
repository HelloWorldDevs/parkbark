import { Map } from 'immutable';
import {createStore, applyMiddleware} from 'redux';
import core from './core_reducer';
import navigation from './navigation_reducer';
import map from './map_reducer';
import search from './search_reducer';
import filter from './filter_reducer';
import survey from './survey_reducer';
import parkdetail from './parkdetail_reducer';
import {combineReducers} from 'redux-immutable';

const initialState = Map();
const rootReducer = combineReducers({ core, navigation, map, search, filter, survey, parkdetail });

function makeStore() {
  return createStore(rootReducer, initialState);
}

const store = makeStore();

export default store;