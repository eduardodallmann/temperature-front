import React from 'react';
import {useHistory} from 'react-router-dom';
import {ConfiguracaoIcon} from './icons/configuracao';
import {EquipamentoIcon} from './icons/equipamento';
import {GraficoIcon} from './icons/grafico';
import {HomeIcon} from './icons/home';
import {RelatorioIcon} from './icons/relatorio';
import {UserIcon} from './icons/user';
import {MenuStyle} from './styles';

export const Menu = () => {
  const history = useHistory();

  return (
    <MenuStyle>
      <div
        className="user"
        onClick={() => history.push(`/usuario`)}
        role="button"
      >
        <UserIcon />
      </div>
      <div onClick={() => history.push(`/`)} role="button">
        <HomeIcon />
      </div>
      <div onClick={() => history.push(`/relatorio`)} role="button">
        <RelatorioIcon />
      </div>
      <div onClick={() => history.push(`/grafico`)} role="button">
        <GraficoIcon />
      </div>
      <div onClick={() => history.push(`/equipamento`)} role="button">
        <EquipamentoIcon />
      </div>
      <div onClick={() => history.push(`/configuracao`)} role="button">
        <ConfiguracaoIcon />
      </div>
    </MenuStyle>
  );
};
