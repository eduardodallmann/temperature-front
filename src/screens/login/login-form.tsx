import React from 'react';
import {Checkbox, FormControlLabel, TextField} from '@mui/material';
import {useHistory} from 'react-router-dom';
import {Bold, Button} from '../../components/styles';
import {LoginFormStyled} from './styled';

export const LoginForm = () => {
  const {push} = useHistory();

  return (
    <LoginFormStyled>
      <div className="title">Sistema de registro de temperatura</div>
      <div className="subtitle">Faça login para entrar no sistema</div>
      <div className="field">
        <TextField fullWidth label="Login" variant="outlined" />
      </div>
      <div className="field">
        <TextField fullWidth label="Senha" type="password" variant="outlined" />
      </div>
      <div className="entrar">
        <div className="lembrar-esqueci">
          <div className="checkbox">
            <FormControlLabel
              control={<Checkbox />}
              label={<Bold>Lembrar meu login</Bold>}
            />
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
