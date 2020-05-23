import React, {FunctionComponent} from "react";
import {RootState} from "../../store";
import {connect, ConnectedProps} from "react-redux";
import DrawingLine from "./DrawingLine";

const mapState = (state: RootState) => {
  return {
    lines: state.drawGame.lines
  }
};

const connector = connect(mapState);

const Drawing: FunctionComponent<ConnectedProps<typeof connector>> = ({lines}) =>
  <svg style={{height: '100%', width: '100%'}}>
    {lines.map((line, index) => <DrawingLine key={index} line={line} />)}
  </svg>;

export default connector(Drawing);
