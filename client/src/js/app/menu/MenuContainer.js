import { connect } from 'react-redux';
import Menu from './Menu';

const mapStateToProps = (state) => {
  return {
    menu: state.menu
  };
};

const MenuContainer = connect(
  mapStateToProps
)(Menu);

export default MenuContainer