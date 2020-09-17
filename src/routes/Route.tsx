import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

import DefaultLayout from '../pages/_layouts/default';

interface IRouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<IRouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        // eslint-disable-next-line no-nested-ternary

        if (user) {
          return (
            <DefaultLayout>
              <Component />
            </DefaultLayout>
          );
        }

        if (isPrivate && !user) {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: { from: location },
              }}
            />
          );
        }

        return <Component />;

        // if (isPrivate && !user) {
        //   ;
        // }
      }}
    />
  );
};

export default Route;
