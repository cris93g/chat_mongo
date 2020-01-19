import React from "react";
import logo from "./logo.svg";
import "./App.css";
import store from "./redux/store";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import routes from "./routes";
function App() {
  return (
    <Provider store={store}>
      <Router>{routes}</Router>
    </Provider>
  );
}

export default App;
