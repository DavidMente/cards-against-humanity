import React, {FunctionComponent} from "react";
import './mini-form.scss';

const MiniFormLayout: FunctionComponent = ({children}) =>
  <div className={'mini-form'}>
    <div className={'box button-box'}>
      {children}
    </div>
  </div>;

export default MiniFormLayout;
