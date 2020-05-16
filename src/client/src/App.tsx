import React from 'react';
import {store} from "./store";
import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";
import {Route, Switch} from 'react-router-dom';
import {history} from './store';
import CreateGameButton from "./components/CreateGameButton";
import GameSection from "./components/GameSection";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Navbar />
        <section className="section main-section">
          <div className={'container'}>
            <Switch>
              <Route exact path={'/'} component={CreateGameButton} />
              <Route exact path={'/game/:gameId'} component={GameSection} />
            </Switch>
          </div>
        </section>
        <Footer />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
