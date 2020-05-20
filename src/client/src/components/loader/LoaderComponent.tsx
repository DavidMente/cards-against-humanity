import React, {FunctionComponent} from "react";
import './loader.scss';

type LoaderProps = {
  text?: string
}

const LoaderComponent: FunctionComponent<LoaderProps> = ({text}) =>
  <div className={'loader-container'}>
    <div className={'loader is-loading'} />
    <div className={'loader-text'}>{text}</div>
  </div>;

export default LoaderComponent;
