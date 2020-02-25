import React from 'react';
import { connect } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';

import history from '../history';
import ListOfRestaurants from './ListOfRestaurants';
import RestaurantInfo from './RestaurantInfo';

class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route path='/' render={() => <ListOfRestaurants />} exact />
            <Route path='/RestaurantInfo/:id' render={() => <RestaurantInfo />} exact />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default connect()(App);
