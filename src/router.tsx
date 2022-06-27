import {Route, Switch} from 'react-router-dom';
import React from 'react';
import {EquipamentoScreen} from './screens/equipamento';
import {RelatorioScreen} from './screens/relatorio-screen';
import {Screen404} from './screens/errors/screen-404';
import {HomeScreen} from './screens/home-screen';
import {ConfiguracaoScreen} from './screens/configuracao-screen';
import {GraficoScreen} from './screens/grafico-screen';
import {UsuarioScreen} from './screens/usuario-screen';
import {LeitoresScreen} from './screens/leitores';

export const AppRouter = () => {
  return (
    <Switch>
      <Route exact path="/usuario">
        <UsuarioScreen />
      </Route>

      <Route exact path="/">
        <HomeScreen />
      </Route>

      <Route exact path="/relatorio">
        <RelatorioScreen />
      </Route>

      <Route exact path="/grafico">
        <GraficoScreen />
      </Route>

      <Route exact path="/equipamento">
        <EquipamentoScreen />
      </Route>

      <Route exact path="/equipamento/:id">
        <LeitoresScreen />
      </Route>

      <Route exact path="/configuracao">
        <ConfiguracaoScreen />
      </Route>

      <Route path="*">
        <Screen404 />
      </Route>
    </Switch>
  );
};
