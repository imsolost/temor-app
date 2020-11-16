import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Temor from "./pages/Temor";
import Dots from "./pages/Dots";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import List from "./pages/List";
import Circle from "./pages/FearCircle";


const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Temor} />
        <Route exact path="/circle" component={Circle} />
        <Route exact path="/dots" component={Dots} />
        <Route exact path="/list" component={List} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
