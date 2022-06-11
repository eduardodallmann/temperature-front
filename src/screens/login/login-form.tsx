import React from 'react';
import {useHistory} from 'react-router-dom';
import {Checkbox} from '../../components/checkbox';
import {Input} from '../../components/input';
import {Bold, Button} from '../../components/styles';
import {LoginFormStyled} from './styled';

export const LoginForm = () => {
  const {push} = useHistory();

  return (
    <LoginFormStyled>
      <div className="title">Sistema de registro de temperatura</div>
      <div className="subtitle">Faça login para entrar no sistema</div>
      <div className="field">
        <Input placeholder="Login" />
      </div>
      <div className="field">
        <Input placeholder="Senha" type="password" />
      </div>
      <div className="entrar">
        <div className="lembrar-esqueci">
          <div className="checkbox">
            <Checkbox label={<Bold>Lembrar meu login</Bold>} />
          </div>
          <div className="link">Esqueci minha senha</div>
        </div>
        <div className="button">
          <Button onClick={() => push('')}>Entrar</Button>
        </div>
      </div>
    </LoginFormStyled>
  );
};
