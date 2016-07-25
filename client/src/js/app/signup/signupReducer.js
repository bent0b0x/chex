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
    default:
      return state;
  }
}