import { connect } from 'react-redux';
import Space from './Space';


const mapStateToProps = (state, ownProps) => {
  return {
    content: state.game.board[ownProps.row][ownProps.col],
    color: ownProps.color
  };
};


const SpaceContainer = connect(
  mapStateToProps
)(Space);

export default SpaceContainer