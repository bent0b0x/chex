import { connect } from 'react-redux';
import App from './App';

const mapStateToProps = (state) => {
  return {
    app_name: state.config.app_name
  };
};

const AppContainer = connect(
  mapStateToProps
)(App);

export default AppContainer