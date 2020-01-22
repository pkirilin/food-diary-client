import React from 'react';
import './App.scss';
import { createBrowserHistory } from 'history';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Pages from './components/Pages';
import Products from './components/Products';
import Categories from './components/Categories';

const history = createBrowserHistory();

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Navbar></Navbar>
      <Switch>
        <Route path="/pages" component={Pages}></Route>
        <Route exact path="/products" component={Products}></Route>
        <Route exact path="/categories" component={Categories}></Route>
        <Redirect exact from="/" to="/pages"></Redirect>
      </Switch>
    </Router>
  );
};

export default App;
