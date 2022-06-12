import React from 'react';
import {useHistory} from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import {ConfiguracaoIcon} from './icons/configuracao';
import {EquipamentoIcon} from './icons/equipamento';
import {GraficoIcon} from './icons/grafico';
import {HomeIcon} from './icons/home';
import {RelatorioIcon} from './icons/relatorio';
import {UserIcon} from './icons/user';
import {MenuItem, MenuStyle} from './styles';

export const Menu = () => {
  const history = useHistory();

  return (
    <MenuStyle>
      <MenuItem
        data-tip="Usuário"
        data-for="tooltip"
        className="user"
        onClick={() => history.push(`/usuario`)}
        role="button"
      >
        <UserIcon />
      </MenuItem>
      <MenuItem
        data-tip="Dashboard"
        data-for="tooltip"
        onClick={() => history.push(`/`)}
        role="button"
      >
        <HomeIcon />
      </MenuItem>
      <MenuItem
        data-tip="Relatórios"
        data-for="tooltip"
        onClick={() => history.push(`/relatorio`)}
        role="button"
      >
        <RelatorioIcon />
      </MenuItem>
      <MenuItem
        data-tip="Gráficos"
        data-for="tooltip"
        onClick={() => history.push(`/grafico`)}
        role="button"
      >
        <GraficoIcon />
      </MenuItem>
      <MenuItem
        data-tip="Equipamentos"
        data-for="tooltip"
        onClick={() => history.push(`/equipamento`)}
        role="button"
      >
        <EquipamentoIcon />
      </MenuItem>
      <MenuItem
        data-tip="Configurações"
        data-for="tooltip"
        onClick={() => history.push(`/configuracao`)}
        role="button"
      >
        <ConfiguracaoIcon />
      </MenuItem>
      <ReactTooltip id="tooltip" type="dark" effect="solid" place="right" />
    </MenuStyle>
  );
};
