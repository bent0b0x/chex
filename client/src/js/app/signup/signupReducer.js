import initialState from '../initialState';
import * as Actions from './SignupActions';

export default (state = initialState.signup, action) => {
  switch (action.type) {
    case Actions.SUBMIT:
      return Object.assign({}, state, {
        submitting: true,
        success: false,
        fail: false
      });
    case Actions.SUCCESS:
      return Object.assign({}, state, {
        submitting: false,
        success: true,
        fail: false
      });
    case Actions.FAIL:
      return Object.assign({}, state, {
        submitting: false,
        success: false,
        fail: true
      });
    case Actions.EMAIL:
      return Object.assign({}, state, {
        email: action.email
      });
    case Actions.GAMERTAG:
      return Object.assign({}, state, {
        gamertag: action.gamertag
      });
    case Actions.PASSWORD:
      return Object.assign({}, state, {
        password: action.password
      });
    default:
      return state;
  }
};