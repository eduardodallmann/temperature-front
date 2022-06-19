import React from 'react';
import {ConfiguracaoIcon} from './icons/configuracao';
import {EquipamentoIcon} from './icons/equipamento';
import {GraficoIcon} from './icons/grafico';
import {HomeIcon} from './icons/home';
import {RelatorioIcon} from './icons/relatorio';
import {UserIcon} from './icons/user';

export const menuData = [
  {title: 'Usuário', className: 'user', path: '/usuario', icon: <UserIcon />},
  {title: 'Dashboard', path: '/', icon: <HomeIcon />},
  {title: 'Relatórios', path: '/relatorio', icon: <RelatorioIcon />},
  {title: 'Gráficos', path: '/grafico', icon: <GraficoIcon />},
  {title: 'Equipamentos', path: '/equipamento', icon: <EquipamentoIcon />},
  {title: 'Configurações', path: '/configuracao', icon: <ConfiguracaoIcon />},
];
