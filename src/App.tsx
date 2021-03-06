import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Container, makeStyles } from '@material-ui/core';
import Navbar from './Navbar';
import { PageContent, Pages } from './features/pages/components';
import { Products } from './features/products/components';
import { Categories } from './features/categories/components';

const useStyles = makeStyles(theme => ({
  content: {
    margin: `${theme.spacing(2)}px 0`,
  },
}));

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <Router>
      <Helmet>
        <title>Food diary</title>
      </Helmet>
      <Navbar></Navbar>
      <Container maxWidth="xl" className={classes.content}>
        <Switch>
          <Route exact path="/pages" component={Pages}></Route>
          <Route exact path="/pages/:id" component={PageContent}></Route>
          <Route exact path="/products" component={Products}></Route>
          <Route exact path="/categories" component={Categories}></Route>
          <Redirect exact from="/" to="/pages"></Redirect>
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
