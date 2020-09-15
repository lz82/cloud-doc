import React, { FC } from 'react';

import Test from '@/components/test';
import List from '@/pages/list';
import Login from '@/pages/login';
import Home from '@/pages/home';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

const routes: FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/test" component={Test} />
        <Route path="/list" component={List} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Redirect to="/login" from="/" exact />
      </Switch>
    </Router>
  );
};

export default routes;
