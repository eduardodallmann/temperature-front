import React, {useEffect} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {useUpdateAtom} from 'jotai/utils';
import {RelatorioFiltro} from './relatorio/filtro';
import {buscaLeiturasAtom} from './relatorio/atoms';
import {GraficoPanel} from './grafico/grafico-panel';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export function GraficoScreen() {
  const buscaLeituras = useUpdateAtom(buscaLeiturasAtom);

  useEffect(() => {
    buscaLeituras();
  }, []);

  return (
    <>
      <RelatorioFiltro />
      <GraficoPanel />
    </>
  );
}
