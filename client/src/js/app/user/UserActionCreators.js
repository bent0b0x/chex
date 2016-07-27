import * as Actions from './UserActions';

export const login = ({ gamertag, email, token }) => (
    {
        type: Actions.LOGIN,
        gamertag,
        email,
        token
    }
);