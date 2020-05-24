import React, {FunctionComponent, useEffect} from "react";
import {Route, Switch} from "react-router-dom";
import CreateGameForm from "./game/create/CreateGameForm";
import GameSection from "./GameSection";
import {connectWebSocket, RootState} from "../store";
import {connect, ConnectedProps} from "react-redux";
import {reactConfig} from "../reactConfig";
import ConnectionIndicator from "./toast/ConnectionIndicator";

const mapState = (state: RootState) => {
  return {
    isConnected: state.webSocket.connected,
    url: state.webSocket.url
  }
};

const connector = connect(mapState);

type GamePageProps = {
  path: string
} & ConnectedProps<typeof connector>

const GamePage: FunctionComponent<GamePageProps> = ({path, isConnected, url}) => {

  useEffect(() => {
    const webSocketUrl = `${reactConfig.WEBSOCKET}/${path}`;
    if (url !== webSocketUrl) {
      connectWebSocket(path);
    }
  }, [path, url]);

  return <div>
    <Switch>
      <Route exact path={`/${path}`} component={CreateGameForm} />
      <Route exact path={`/${path}/:gameId`} component={GameSection} />
    </Switch>
    <ConnectionIndicator />
  </div>
};

export default connector(GamePage);
