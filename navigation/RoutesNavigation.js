import React from 'react';
import {useSelector} from 'react-redux';
import {Authenticated, NonAuthentivated} from './MainNavigation';

const RoutesNavigation = () => {
  const user = useSelector(state => state.user);
  return user.isLoggedIn ? <Authenticated /> : <NonAuthentivated />;
};

export default RoutesNavigation;
