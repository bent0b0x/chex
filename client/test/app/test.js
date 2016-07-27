import initialState from '../../src/js/app/initialState';
import appReducer from '../../src/js/app/appReducer';
import App from '../../src/js/app/App';
import React from 'react';
import chai from 'chai';
import TestUtils from 'react-addons-test-utils';

const expect = chai.expect;

describe('app', () => {
  describe('reducer', () => {
    it('should set the initial state when handed undefined', () => {
      expect(appReducer(undefined, {})).to.deep.equal(initialState);
    });
  });

  describe('components', () => {
    let props;
    let output;
    let renderer;
    beforeEach(() => {
      props = {
        app_name: initialState.config.app_name
      };

      renderer = TestUtils.createRenderer();
      renderer.render(<App {...props} />);
      output = renderer.getRenderOutput();
    });
    it('should render correctly', () => {
      expect(output.type).to.equal('div');
      expect(output.props.className).to.equal('app');

      let [nav] = output.props.children;

      expect(nav.type).to.equal('nav');

      let navWrapper = nav.props.children;

      expect(navWrapper.props.className).to.equal('nav-wrapper');

      let [logo] = navWrapper.props.children;

      expect(logo.props.className).to.equal('brand-logo');
      expect(logo.props.children).to.equal(props.app_name);

    });
  });
});

