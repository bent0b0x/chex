import { connect } from 'react-redux';
import { select } from './SpaceActionCreators';
import Space from './Space';


const mapStateToProps = (state, ownProps) => {
  return {
    content: state.game.board[ownProps.row][ownProps.col].piece,
    row: ownProps.row,
    col: ownProps.col,
    color: ownProps.color,
    selected: state.game.board[ownProps.row][ownProps.col].selected
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(select(ownProps.row, ownProps.col));
    }
  }
}


const SpaceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Space);

export default SpaceContainer