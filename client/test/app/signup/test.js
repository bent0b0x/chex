import initialState from '../../../src/js/app/initialState';
import signupReducer from '../../../src/js/app/signup/signupReducer';
import Signup from '../../../src/js/app/signup/Signup';
import * as ActionCreators from '../../../src/js/app/signup/SignupActionCreators';
import React from 'react';
import chai from 'chai';
import TestUtils from 'react-addons-test-utils';
import * as SearchDOM from '../../util/searchShallowDOM';

const expect = chai.expect;

let state;

describe('signup', () => {
  describe('reducer', () => {
    beforeEach(() => {
      state = signupReducer(undefined, {});
    });
    it('should set the initial state when handed undefined', () => {
      state = signupReducer(undefined, {});
      expect(state).to.deep.equal(initialState.signup);
    });
    it('should set the state correctly on submit', () => {
      expect(signupReducer(state, ActionCreators.submit())).to.deep.equal(Object.assign({}, initialState.signup, {
        submitting: true,
        fail: false,
        success: false
      }));
    });
    it('should set the state correctly on success', () => {
      expect(signupReducer(state, ActionCreators.success())).to.deep.equal(Object.assign({}, initialState.signup, {
        submitting: false,
        fail: false,
        success: true
      }));
    });
    it('should set the state correctly on fail', () => {
      expect(signupReducer(state, ActionCreators.fail())).to.deep.equal(Object.assign({}, initialState.signup, {
        submitting: false,
        fail: true,
        success: false
      }));
    });
    it('should set the state correctly on gamertag update', () => {
      expect(signupReducer(state, ActionCreators.updateGamertag('chicken'))).to.deep.equal(Object.assign({}, initialState.signup, {
        gamertag: 'chicken'
      }));
    });
    it('should set the state correctly on password update', () => {
      expect(signupReducer(state, ActionCreators.updatePassword('password'))).to.deep.equal(Object.assign({}, initialState.signup, {
        password: 'password'
      }));
    });
    it('should set the state correctly on email update', () => {
      expect(signupReducer(state, ActionCreators.updateEmail('test@test.com'))).to.deep.equal(Object.assign({}, initialState.signup, {
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

      renderer.render(<Signup {...props} />);
      output = renderer.getRenderOutput();

      expect(output.type).to.equal('div');
      expect(output.props.className).to.equal('signup');

      expect(SearchDOM.forClass(output, 'signup-submitting')).to.not.be.ok;
      expect(SearchDOM.forClass(output, 'signup-success')).to.not.be.ok;
      expect(SearchDOM.forClass(output, 'signup-fail')).to.not.be.ok;

    });

    it('should render submitting correctly', () => {
      props = {
        submitting: true,
        success: false,
        fail: false
      };

      renderer.render(<Signup {...props} />);
      output = renderer.getRenderOutput();

      expect(SearchDOM.forClass(output, 'signup-submitting')).to.be.ok;
      expect(SearchDOM.forClass(output, 'signup-success')).to.not.be.ok;
      expect(SearchDOM.forClass(output, 'signup-fail')).to.not.be.ok;

    });

    it('should render success correctly', () => {
      props = {
        submitting: false,
        success: true,
        fail: false
      };

      renderer.render(<Signup {...props} />);
      output = renderer.getRenderOutput();

      expect(SearchDOM.forClass(output, 'signup-submitting')).to.not.be.ok;
      expect(SearchDOM.forClass(output, 'signup-success')).to.be.ok;
      expect(SearchDOM.forClass(output, 'signup-fail')).to.not.be.ok;

    });

    it('should render fail correctly', () => {
      props = {
        submitting: false,
        success: false,
        fail: true
      };

      renderer.render(<Signup {...props} />);
      output = renderer.getRenderOutput();

      expect(SearchDOM.forClass(output, 'signup-submitting')).to.not.be.ok;
      expect(SearchDOM.forClass(output, 'signup-success')).to.not.be.ok;
      expect(SearchDOM.forClass(output, 'signup-fail')).to.be.ok;

    });
  });
});