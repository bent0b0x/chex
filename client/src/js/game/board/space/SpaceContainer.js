import { connect } from 'react-redux';
import * as Actions from './SpaceActions';
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
      dispatch({
        type: Actions.SELECT,
        row: ownProps.row,
        col: ownProps.col
      })
    }
  }
}


const SpaceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Space);

export default SpaceContainer