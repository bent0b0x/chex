import { connect } from 'react-redux';
import Signup from './Signup';
import * as ActionCreators from './SignupActionCreators';
import request from 'superagent';
import config from '../../util/config';

const mapStateToProps = (state) => {
    return {
      submitting: state.signup.submitting,
      success: state.signup.success,
      fail: state.signup.fail
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (event) => {
      event.preventDefault();
      dispatch(ActionCreators.submit());
    }
  };
};

const SignupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);

export default SignupContainer