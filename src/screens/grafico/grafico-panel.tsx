import React from 'react';
import {ChartArea, ChartData, ChartOptions, ScriptableContext} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {useAtomValue} from 'jotai';
import moment from 'moment';
import {LineSeverity} from '../../components/table/types';
import {Panel} from '../../components/panel';
import {filtrosAtom, limitesAtom, tabelaAtom} from '../relatorio/atoms';
import {Empty} from '../../components/empty';

export const GraficoPanel = () => {
  const dados = useAtomValue(tabelaAtom);
  const {
    limiteToleranciaMaxima,
    limiteToleranciaMinima,
    toleranciaMaxima,
    toleranciaMinima,
  } = useAtomValue(limitesAtom);
  console.log(
    limiteToleranciaMaxima,
    limiteToleranciaMinima,
    toleranciaMaxima,
    toleranciaMinima,
  );
  const {equipamentoNome} = useAtomValue(filtrosAtom);

  if (!dados.length) {
    return <Empty subtitle="Use os filtros acima para ver resultados" />;
  }

  const options: ChartOptions<'line'> = {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          color: 'red',
        },
        ticks: {
          color: 'red',
        },
      },
      y: {
        grid: {
          drawBorder: false,
          color: (c) => {
            return !c.index ? 'red' : '#DDDDDD';
          },
        },
        ticks: {
          callback: (value) => `${value}°`,
          maxTicksLimit: 5,
        },
      },
    },
    plugins: {
      legend: {display: false},
      title: {display: false},
    },
  };

  const labels = dados.map((d) => moment(d.hora).format('HH:mm'));

  let width: number;
  let height: number;
  let gradient: CanvasGradient;

  const getGradient = (
    severity: LineSeverity,
    ctx: CanvasRenderingContext2D,
    chartArea: ChartArea,
  ) => {
    const vermelho = '#EE4057';
    const medioVerm = '#9A6B7F';
    const azul = '#359FAF';
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;

    if (gradient === null || width !== chartWidth || height !== chartHeight) {
      width = chartWidth;
      height = chartHeight;
      gradient = ctx.createLinearGradient(
        0,
        chartArea.bottom,
        0,
        chartArea.top,
      );

      if (severity === LineSeverity.ERROR) {
        gradient.addColorStop(0.8, vermelho);
        gradient.addColorStop(0.6, medioVerm);
        gradient.addColorStop(0.5, azul);
      } else if (severity === LineSeverity.NORMAL) {
        gradient.addColorStop(0, azul);
      } else {
        gradient.addColorStop(0.9, medioVerm);
        gradient.addColorStop(0.5, azul);
      }
    }

    return gradient;
  };

  const preColor = ({chart: {ctx, chartArea}}: ScriptableContext<'line'>) => {
    if (!chartArea) {
      return undefined;
    }

    let severity = LineSeverity.NORMAL;
    if (dados.find((d) => d.temperatura >= limiteToleranciaMaxima)) {
      severity = LineSeverity.ERROR;
    } else if (dados.find((d) => d.temperatura >= toleranciaMaxima)) {
      severity = LineSeverity.WARN;
    }
    return getGradient(severity, ctx, chartArea);
  };

  const data: ChartData<'line'> = {
    labels,
    datasets: [
      {
        data: dados.map((d) => d.temperatura),
        borderColor: preColor,
        pointRadius: 5,
        pointBackgroundColor: preColor,
        tension: 0.3,
      },
    ],
  };

  return (
    <Panel title={`Relatório - Equipamento ${equipamentoNome}`}>
      <Line options={options} data={data} height={300} />
    </Panel>
  );
};
