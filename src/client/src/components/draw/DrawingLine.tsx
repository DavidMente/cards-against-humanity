import React, {FunctionComponent} from "react";
import {Line} from "../../store/drawGame/types";

type DrawingLineProps = {
  line: Line
}

const DrawingLine: FunctionComponent<DrawingLineProps> = ({line}) => {
  const pathData = "M " + line.points.map((point) => point.x + ' ' + point.y).join(" L ");
  return <path d={pathData} fill={"transparent"} stroke={line.color} />;
};

export default DrawingLine;
