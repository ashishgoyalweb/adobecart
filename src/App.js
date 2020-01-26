import React from "react";
import "./App.scss";
import Header from "./header/header";
import Cartpage from "./cartpage";
import Checkout from "./checkout";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="main">
      <Route render={props => <Header {...props} />} />
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/" exact component={Cartpage} />
      </Switch>

      <footer>&copy; Copyright</footer>
    </div>
  );
}

export default App;
