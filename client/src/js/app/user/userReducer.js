import initialState from '../initialState';
import * as Actions from './UserActions';

export default (state = initialState.user, action) => {
    switch (action.type) {
        case Actions.LOGIN:
            return Object.assign({}, state, {
                gamertag: action.gamertag,
                email: action.email,
                token: action.token
            });
        default:
            return state;
    }
};