import { combineReducers, createStore } from 'redux';
import * as GameActions from '../game/GameActions';
import { appReducer } from './appReducer';
import { tick, score } from '../game/Game';


let store = createStore(appReducer);



