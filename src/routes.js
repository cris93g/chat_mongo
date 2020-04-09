import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Screens/Home/Home";
import Landing from "./Screens/Landing/Landing"
export default (
  <Switch>
    <Route component={Home}  path="/home" />
    <Route component={Landing} exact path="/" />
  </Switch>
);
