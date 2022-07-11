import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { Bold, Button } from '../../components/styles';
import { LoginFormStyled } from './styled';

export const LoginForm = () => {
  const navigate = useNavigate();

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
          <Button onClick={() => navigate('')}>Entrar</Button>
        </div>
      </div>
    </LoginFormStyled>
  );
};
