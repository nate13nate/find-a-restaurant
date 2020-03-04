import React from 'react';
import { connect } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';

import { mapStateToProps } from '../functions';
import GetLocation from './GetLocation';
import history from '../history';
import ListOfRestaurants from './ListOfRestaurants';
import RestaurantInfo from './RestaurantInfo';
import '../stylesheets/index.css';

class App extends React.Component {
  render() {
    return (
      <div id='appDiv'>
        <Router history={history}>
          <Switch>
            <Route path='/' component={ListOfRestaurants} exact />
            <Route path='/GetLocation' component={GetLocation} exact />
            <Route path='/RestaurantInfo/:id' component={RestaurantInfo} exact />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
