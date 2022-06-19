import React, {useEffect, useState} from 'react';
import {Route, useLocation} from 'react-router-dom';
import {LayoutPrincipal} from './components/styles';
import {HeaderApp} from './components/header-app';
import {Menu} from './components/menu';
import './index.scss';
import {getRoute} from './router';
import {LoginScreen} from './screens/login-screen';
import {MenuFull} from './components/menu-full';

function App() {
  const location = useLocation();
  const [router, setRouter] = useState(getRoute(location.pathname));

  useEffect(() => {
    setRouter(getRoute(location.pathname));
  }, [location]);

  if (location.pathname === '/login') return <LoginScreen />;

  return (
    <>
      <HeaderApp />
      <LayoutPrincipal>
        <MenuFull />
        <div className="menu">
          <Menu />
        </div>
        <div className="espaco">
          <Route path={router.url} exact component={router.component} />
        </div>
      </LayoutPrincipal>
    </>
  );
}

export {App};
