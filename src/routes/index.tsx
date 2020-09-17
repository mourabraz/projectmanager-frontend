import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignInSignUp from '../pages/SignInSignUp';
import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';
import ContainerBoard from '../pages/Board';
import Projects from '../pages/Projects';
import Invitations from '../pages/Invitations';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/login" component={SignInSignUp} />

    <Route path="/profile" component={Profile} isPrivate />
    <Route path="/boards" component={ContainerBoard} isPrivate />
    <Route path="/projects" component={Projects} isPrivate />
    <Route path="/invitations" component={Invitations} isPrivate />
  </Switch>
);

export default Routes;
