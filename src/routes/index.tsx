import React, { FC } from 'react';

import Test from '@/components/test';
import List from '@/pages/list';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const routes: FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/test" component={Test} />
        <Route path="/list" component={List} />
      </Switch>
    </Router>
  );
};

export default routes;
