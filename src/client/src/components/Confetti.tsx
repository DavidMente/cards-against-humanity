import React, {FunctionComponent} from "react";
import ReactDomConfetti from 'react-dom-confetti';

type ConfettiProps = {
  isActive: boolean
}

const Confetti: FunctionComponent<ConfettiProps> = ({isActive}) => {

  const config = {
    angle: 90,
    spread: 100,
    duration: 5000,
    dragFriction: 0.1,
    stagger: 0,
    startVelocity: 45,
    elementCount: 100,
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
  };

  return <ReactDomConfetti active={isActive} config={config} />

};

export default Confetti;

