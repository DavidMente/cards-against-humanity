import React from 'react';
import {store} from "./store";
import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";
import {history} from './store';
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import MainSection from "./components/layout/MainSection";
import GamePage from "./components/GamePage";
import {Route, Switch} from "react-router-dom";

export const CAH_PATH = 'cah';

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Navbar />
        <MainSection>
          <Switch>
            <Route path={`/${CAH_PATH}`} render={() => <GamePage path={CAH_PATH} />} />
          </Switch>
        </MainSection>
        <Footer />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
