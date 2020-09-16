import React, { FC } from 'react';

import Login from '@/pages/login';

import LayoutMain from '@/layout/main';
import Home from '@/pages/home';
import UploadList from '@/pages/upload-list';
import CompleteList from '@/pages/complete-list';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

const routes: FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route
          path="/admin"
          render={(routeProps) => (
            <LayoutMain>
              <Switch>
                <Route path="/admin/home" {...routeProps} component={Home} />
                <Route path="/admin/upload" {...routeProps} component={UploadList} />
                <Route path="/admin/complete" {...routeProps} component={CompleteList} />
              </Switch>
            </LayoutMain>
          )}
        />
        <Redirect to="/login" from="/" exact />
      </Switch>
    </Router>
  );
};

export default routes;
