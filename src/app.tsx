import React from 'react';
import { useLocation } from 'react-router-dom';
import { LayoutPrincipal } from './components/styles';
import { HeaderApp } from './components/header-app';
import { Menu } from './components/menu';
import './index.css';
import { AppRouter } from './router';
import { LoginScreen } from './screens/login-screen';
import { MenuFull } from './components/menu-full';
import { SnackbarsGlobal } from './components/snackbars-global';

function App() {
  const location = useLocation();

  if (location.pathname === '/login') return <LoginScreen />;

  return (
    <>
      <SnackbarsGlobal />
      <HeaderApp />
      <LayoutPrincipal>
        <MenuFull />
        <div className="menu">
          <Menu />
        </div>
        <div className="espaco">
          <AppRouter />
        </div>
      </LayoutPrincipal>
    </>
  );
}

export { App };
