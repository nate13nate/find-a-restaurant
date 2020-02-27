import React from 'react';
import { connect } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';

import GetLocation from './GetLocation';
import history from '../history';
import ListOfRestaurants from './ListOfRestaurants';
import RestaurantInfo from './RestaurantInfo';

class App extends React.Component {
  render() {
    return (
      <div>
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

const mapStateToProps = (state, props) => ({ state, properties: props });

export default connect(mapStateToProps)(App);
