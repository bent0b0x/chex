import { connect } from 'react-redux';
import Signup from './Signup';
import * as ActionCreators from './SignupActionCreators';
import * as UserActionCreators from '../user/UserActionCreators';
import config from '../../util/config';
import { browserHistory } from 'react-router';
import request from 'superagent';

const mapStateToProps = (state) => {
    return {
      submitting: state.signup.submitting,
      success: state.signup.success,
      fail: state.signup.fail,
      email: state.signup.email,
      gamertag: state.signup.gamertag,
      password: state.signup.password
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEmailChange: (event) => {
      dispatch(ActionCreators.updateEmail(event.target.value.trim()));
    },
    onGamertagChange: (event) => {
      dispatch(ActionCreators.updateGamertag(event.target.value.trim()));
    },
    onPasswordChange: (event) => {
      dispatch(ActionCreators.updatePassword(event.target.value.trim()));
    },
    submit: ({ email, gamertag, password }) => {
      event.preventDefault();
      dispatch(ActionCreators.submit());
      request
        .post(`${config.api_url}/signup`)
        .send({
          email,
          gamertag,
          password
        })
        .end((err, res) => {
          if (err) {
            return dispatch(ActionCreators.fail());
          }
          localStorage.setItem('token', res.body.token);
          localStorage.setItem('gamertag', gamertag);
          dispatch(ActionCreators.success());
          dispatch(UserActionCreators.login({
            gamertag,
            email,
            token: res.body.token
          }));
          browserHistory.push('/game');
        });
    }
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, ownProps, stateProps, dispatchProps, {
    onSubmit: (event) => {
      event.preventDefault();
      dispatchProps.submit({
        email: stateProps.email,
        gamertag: stateProps.gamertag,
        password: stateProps.password
      });
    }
  });
};

const SignupContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Signup);

export default SignupContainer;