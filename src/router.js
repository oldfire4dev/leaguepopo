import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './screens/Home';
import DashboardQuery from './screens/Dashboard';
import Dashboard from './screens/Dashboard/Dashboard';

export default function App() {
  return ( 
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={DashboardQuery} />
      </Switch>
    </Router>
  );
}
