import React from 'react';
import {store} from "./store";
import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";
import {Route, Switch} from 'react-router-dom';
import {history} from './store';
import GameSection from "./components/GameSection";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import CreateGameForm from "./components/game/create/CreateGameForm";
import MainSection from "./components/layout/MainSection";
import ConnectionIndicator from "./components/toast/ConnectionIndicator";

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Navbar />
        <MainSection>
          <Switch>
            <Route exact path={'/'} component={CreateGameForm} />
            <Route exact path={'/game/:gameId'} component={GameSection} />
          </Switch>
        </MainSection>
        <ConnectionIndicator />
        <Footer />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
