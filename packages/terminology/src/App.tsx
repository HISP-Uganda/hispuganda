import React from "react";
import ReactDOM from "react-dom";
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import {
  HashRouter as Router,
  Route, Switch
} from "react-router-dom";
import Admin from "./components/Admin";
import ConceptForm from './components/ConceptForm';
import Details from "./components/Details";
import { Home } from "./components/Home";
import "./index.less";

const queryCache = new QueryCache();
export const App = () => {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Router>
        <Switch>
          <Route path="/details/:id">
            <Details />
          </Route>
          <Route path="/form">
            <ConceptForm />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
      <ReactQueryDevtools initialIsOpen />
    </ReactQueryCacheProvider>
  )
};

ReactDOM.render(<App />, document.getElementById("app"));
