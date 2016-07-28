import initialState from '../../../src/js/app/initialState';
import loginReducer from '../../../src/js/app/login/loginReducer';
import Login from '../../../src/js/app/login/Login';
import * as ActionCreators from '../../../src/js/app/login/LoginActionCreators';
import React from 'react';
import chai from 'chai';
import TestUtils from 'react-addons-test-utils';
import * as SearchDOM from '../../util/searchShallowDOM';

const expect = chai.expect;

let state;

describe('login', () => {
  describe('reducer', () => {
    beforeEach(() => {
      state = loginReducer(undefined, {});
    });
    it('should set the initial state when handed undefined', () => {
      state = loginReducer(undefined, {});
      expect(state).to.deep.equal(initialState.login);
    });
    it('should set the state correctly on submit', () => {
      expect(loginReducer(state, ActionCreators.submit())).to.deep.equal(Object.assign({}, initialState.login, {
        submitting: true,
        fail: false,
        success: false
      }));
    });
    it('should set the state correctly on success', () => {
      expect(loginReducer(state, ActionCreators.success())).to.deep.equal(Object.assign({}, initialState.login, {
        submitting: false,
        fail: false,
        success: true
      }));
    });
    it('should set the state correctly on fail', () => {
      expect(loginReducer(state, ActionCreators.fail())).to.deep.equal(Object.assign({}, initialState.login, {
        submitting: false,
        fail: true,
        success: false
      }));
    });
    it('should set the state correctly on password update', () => {
      expect(loginReducer(state, ActionCreators.updatePassword('password'))).to.deep.equal(Object.assign({}, initialState.login, {
        password: 'password'
      }));
    });
    it('should set the state correctly on email update', () => {
      expect(loginReducer(state, ActionCreators.updateEmail('test@test.com'))).to.deep.equal(Object.assign({}, initialState.login, {
        email: 'test@test.com'
      }));
    });
  });

  describe('components', () => {
    let props;
    let output;
    let renderer;
    before(() => {
      renderer = TestUtils.createRenderer();
    });
    it('should render correctly', () => {
      props = {
        submitting: false,
        success: false,
        fail: false
      };

      renderer.render(<Login {...props} />);
      output = renderer.getRenderOutput();

      expect(output.type).to.equal('div');
      expect(output.props.className).to.equal('login');

      expect(SearchDOM.forClass(output, 'login-submitting')).to.not.be.ok;
      expect(SearchDOM.forClass(output, 'login-success')).to.not.be.ok;
      expect(SearchDOM.forClass(output, 'login-fail')).to.not.be.ok;

    });

    it('should render submitting correctly', () => {
      props = {
        submitting: true,
        success: false,
        fail: false
      };

      renderer.render(<Login {...props} />);
      output = renderer.getRenderOutput();

      expect(SearchDOM.forClass(output, 'login-submitting')).to.be.ok;
      expect(SearchDOM.forClass(output, 'login-success')).to.not.be.ok;
      expect(SearchDOM.forClass(output, 'login-fail')).to.not.be.ok;

    });

    it('should render success correctly', () => {
      props = {
        submitting: false,
        success: true,
        fail: false
      };

      renderer.render(<Login {...props} />);
      output = renderer.getRenderOutput();

      expect(SearchDOM.forClass(output, 'login-submitting')).to.not.be.ok;
      expect(SearchDOM.forClass(output, 'login-success')).to.be.ok;
      expect(SearchDOM.forClass(output, 'login-fail')).to.not.be.ok;

    });

    it('should render fail correctly', () => {
      props = {
        submitting: false,
        success: false,
        fail: true
      };

      renderer.render(<Login {...props} />);
      output = renderer.getRenderOutput();

      expect(SearchDOM.forClass(output, 'login-submitting')).to.not.be.ok;
      expect(SearchDOM.forClass(output, 'login-success')).to.not.be.ok;
      expect(SearchDOM.forClass(output, 'login-fail')).to.be.ok;

    });
  });
});