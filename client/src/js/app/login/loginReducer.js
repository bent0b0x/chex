import initialState from '../initialState';
import * as Actions from './LoginActions';

export default (state = initialState.login, action) => {
  switch (action.type) {
    case Actions.SUBMIT:
        return Object.assign({}, state, {
            submitting: true,
            fail: false,
            success: false
        });
    case Actions.FAIL:
        return Object.assign({}, state, {
            submitting: false,
            fail: true,
            success: false
        });
    case Actions.SUCCESS:
        return Object.assign({}, state, {
            submitting: false,
            fail: false,
            success: true
        });
    case Actions.PASSWORD:
        return Object.assign({}, state, {
            password: action.password
        });
    case Actions.EMAIL:
        return Object.assign({}, state, {
            email: action.email
        });
    default:
      return state;
  }
};