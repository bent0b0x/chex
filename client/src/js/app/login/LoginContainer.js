import { connect } from 'react-redux';
import Login from './Login';
import * as ActionCreators from './LoginActionCreators';
import * as UserActionCreators from '../user/UserActionCreators';
import config from '../../util/config';
import { browserHistory } from 'react-router';
import request from 'superagent';

const mapStateToProps = (state) => {
    return {
      submitting: state.login.submitting,
      success: state.login.success,
      fail: state.login.fail,
      email: state.login.email,
      gamertag: state.login.gamertag,
      password: state.login.password
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEmailChange: (event) => {
      dispatch(ActionCreators.updateEmail(event.target.value.trim()));
    },
    onPasswordChange: (event) => {
      dispatch(ActionCreators.updatePassword(event.target.value.trim()));
    },
    submit: ({ email, password }) => {
      event.preventDefault();
      dispatch(ActionCreators.submit());
      request
        .post(`${config.api_url}/login`)
        .send({
          email,
          password
        })
        .end((err, res) => {
          if (err) {
            return dispatch(ActionCreators.fail());
          }
          localStorage.setItem('token', res.body.token);
          localStorage.setItem('gamertag', res.body.gamertag);
          dispatch(ActionCreators.success());
          dispatch(UserActionCreators.login({
            gamertag: res.body.token,
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
        password: stateProps.password
      });
    }
  });
};

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Login);

export default LoginContainer;