import React, {FunctionComponent} from "react";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../store";
import LoaderComponent from "../loader/LoaderComponent";
import './toast.scss';

const mapState = (state: RootState) => ({
  isConnected: state.webSocket.connected
});

const connector = connect(mapState);

const ConnectionIndicator: FunctionComponent<ConnectedProps<typeof connector>> = ({isConnected}) =>
  <div className={'fixed-notification'}>
    {!isConnected ?
      <div className={'notification is-warning is-light'}><LoaderComponent text={'connecting ...'} /></div> : ''}
  </div>;

export default connector(ConnectionIndicator);
