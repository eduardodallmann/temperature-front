import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { EquipamentoScreen } from './screens/equipamento';
import { RelatorioScreen } from './screens/relatorio-screen';
import { Screen404 } from './screens/errors/screen-404';
import { HomeScreen } from './screens/home-screen';
import { ConfiguracaoScreen } from './screens/configuracao-screen';
import { GraficoScreen } from './screens/grafico-screen';
import { UsuarioScreen } from './screens/usuario-screen';
import { LeitoresScreen } from './screens/leitores';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/usuario" element={<UsuarioScreen />} />

      <Route path="/" element={<HomeScreen />} />

      <Route path="/relatorio" element={<RelatorioScreen />} />

      <Route path="/grafico" element={<GraficoScreen />} />

      <Route path="/equipamento" element={<EquipamentoScreen />} />

      <Route path="/equipamento/:id" element={<LeitoresScreen />} />

      <Route path="/configuracao" element={<ConfiguracaoScreen />} />

      <Route path="*" element={<Screen404 />} />
    </Routes>
  );
};
