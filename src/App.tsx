import React from 'react';
import './App.css';
import TradingBlock from 'TradingBlock';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

class App extends React.Component<any> {
  render() {
    return (
      <>
        <Switch>
          <Route path="/:id?" component={TradingBlock} />
          <Redirect from="*" to="/" />
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
