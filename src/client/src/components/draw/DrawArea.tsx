import React, {FunctionComponent, useEffect, useRef, useState} from "react";
import {Point} from "../../store/drawGame/types";
import {addLine, addPoint} from "../../store/drawGame/actions";
import {connect, ConnectedProps} from "react-redux";
import Drawing from "./Drawing";

const mapDispatch = {
  addPoint: (point: Point) => addPoint(point),
  addLine: (color: string, point: Point) => addLine(color, point)
};

const connector = connect(null, mapDispatch);

const DrawArea: FunctionComponent<ConnectedProps<typeof connector>> = ({addLine, addPoint}) => {

  const [isDrawing, setIsDrawing] = useState(false);
  const drawArea: any = useRef();

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  function handleMouseUp() {
    setIsDrawing(false);
  }

  function handleMouseDown(mouseEvent: React.MouseEvent): void {
    if (mouseEvent.button !== 0) {
      return;
    }
    setIsDrawing(true);
    const point = relativeCoordinatesForEvent(mouseEvent);
    addLine('#000000', point);
    console.log('addLine');
  }

  function relativeCoordinatesForEvent(mouseEvent: React.MouseEvent): Point {
    const boundingRect = drawArea.current.getBoundingClientRect();
    return {
      x: mouseEvent.clientX - boundingRect.left,
      y: mouseEvent.clientY - boundingRect.top,
    };
  }

  function handleMouseMove(mouseEvent: React.MouseEvent) {
    if (!isDrawing) {
      return;
    }
    const point = relativeCoordinatesForEvent(mouseEvent);
    addPoint(point);
  }

  return <div style={{width: '500px', height: '500px'}} ref={drawArea}
              onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}>
    <Drawing />
  </div>

};

export default connector(DrawArea);

