import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from "./views/Dashboard";

export default function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}
