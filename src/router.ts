import {EquipamentoScreen} from './screens/equipamento';
import {RelatorioScreen} from './screens/relatorio-screen';
import {Screen404} from './screens/errors/screen-404';
import {HomeScreen} from './screens/home-screen';
import {ConfiguracaoScreen} from './screens/configuracao-screen';
import {GraficoScreen} from './screens/grafico-screen';
import {UsuarioScreen} from './screens/usuario-screen';

export type Router = {
  url: string;
  component: () => JSX.Element;
};

const getRoute = (pathname: string): Router => {
  switch (pathname) {
    case '/usuario':
      return {
        url: pathname,
        component: UsuarioScreen,
      };

    case '/':
      return {
        url: pathname,
        component: HomeScreen,
      };

    case '/relatorio':
      return {
        url: pathname,
        component: RelatorioScreen,
      };

    case '/grafico':
      return {
        url: pathname,
        component: GraficoScreen,
      };

    case '/equipamento':
      return {
        url: pathname,
        component: EquipamentoScreen,
      };

    case '/configuracao':
      return {
        url: pathname,
        component: ConfiguracaoScreen,
      };

    default:
      return {
        url: pathname,
        component: Screen404,
      };
  }
};

export {getRoute};
