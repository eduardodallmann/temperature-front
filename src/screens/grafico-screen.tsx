import React, { useEffect } from 'react';
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
import { useUpdateAtom } from 'jotai/utils';
import annotationPlugin from 'chartjs-plugin-annotation';
import { io } from 'socket.io-client';
import { RelatorioFiltro } from './relatorio/filtro';
import { buscaLeiturasAtom } from './relatorio/atoms';
import { GraficoPanel } from './grafico/grafico-panel';
import { URL } from '../environment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin,
);

export function GraficoScreen() {
  const socket = io(URL);

  const buscaLeituras = useUpdateAtom(buscaLeiturasAtom);

  socket.on('update', () => {
    buscaLeituras();
  });

  useEffect(() => {
    buscaLeituras();

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <RelatorioFiltro />
      <GraficoPanel />
    </>
  );
}
