import React from 'react';
import {LoginForm} from './login/login-form';
import {LoginStyle} from './login/styled';

export function LoginScreen() {
  return (
    <LoginStyle>
      <div className="img" />
      <div className="login-area">
        <LoginForm />
      </div>
    </LoginStyle>
  );
}
