import React from 'react';
import { ChartData, ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useAtomValue } from 'jotai';
import moment from 'moment';
import {
  AnnotationPluginOptions,
  PartialEventContext,
} from 'chartjs-plugin-annotation';
import { Panel } from '../../components/panel';
import { filtrosAtom, limitesAtom, tabelaAtom } from '../relatorio/atoms';
import { Empty } from '../../components/empty';
import { _DeepPartialObject } from './types';

export const GraficoPanel = () => {
  const vermelho = '#EE4057';
  const medioVerm = '#9A6B7F';
  const azul = '#359FAF';
  const dados = useAtomValue(tabelaAtom);
  const {
    limiteToleranciaMaxima,
    toleranciaMaxima,
    limiteToleranciaMinima,
    toleranciaMinima,
  } = useAtomValue(limitesAtom);
  const { equipamentoNome } = useAtomValue(filtrosAtom);

  if (!dados.length) {
    return <Empty subtitle="Use os filtros acima para ver resultados" />;
  }

  const defineDotPosition = (
    ctx: PartialEventContext,
    index: number,
    prop: 'x' | 'y',
  ) => {
    if (prop === 'x') {
      return index;
    }

    return ctx.chart.scales.y.min;
  };

  const anotations: _DeepPartialObject<AnnotationPluginOptions>['annotations'] =
    dados.map((_, i) => ({
      type: 'point',
      backgroundColor: () => azul,
      borderColor: () => azul,
      radius: 3,
      xValue: (ctx: PartialEventContext) => defineDotPosition(ctx, i, 'x'),
      yValue: (ctx: PartialEventContext) => defineDotPosition(ctx, i, 'y'),
    }));

  const anotationsSub: _DeepPartialObject<AnnotationPluginOptions>['annotations'] =
    dados
      .filter((_, i) => !!i)
      .map((_, i) => ({
        type: 'point',
        backgroundColor: '#C4C4C4',
        borderColor: '#C4C4C4',
        radius: 2,
        xValue: (ctx: PartialEventContext) =>
          defineDotPosition(ctx, i, 'x') + 0.5,
        yValue: (ctx: PartialEventContext) => defineDotPosition(ctx, i, 'y'),
      }));

  const anotationCommum = {
    display: true,
    type: 'line' as const,
    borderWidth: 1,
    borderDash: [10],
  };
  const labelCommum = {
    enabled: true,
    backgroundColor: 'rgba(102, 102, 102, 0.5)',
    position: 'start',
    font: { size: 10 },
    padding: 3,
  };

  const anotationsTolMax: _DeepPartialObject<AnnotationPluginOptions>['annotations'] =
    [
      {
        ...anotationCommum,
        yMin: toleranciaMaxima,
        yMax: toleranciaMaxima,
        borderColor: medioVerm,
        label: {
          ...labelCommum,
          content: 'Tolerância',
        },
      },
      {
        ...anotationCommum,
        yMin: toleranciaMinima,
        yMax: toleranciaMinima,
        borderColor: medioVerm,
        label: {
          ...labelCommum,
          content: 'Tolerância',
        },
      },
      {
        ...anotationCommum,
        yMin: limiteToleranciaMaxima,
        yMax: limiteToleranciaMaxima,
        borderColor: vermelho,
        label: {
          ...labelCommum,
          content: 'Limite tolerância',
        },
      },
      {
        ...anotationCommum,
        yMin: limiteToleranciaMinima,
        yMax: limiteToleranciaMinima,
        borderColor: vermelho,
        label: {
          ...labelCommum,
          content: 'Limite tolerância',
        },
      },
    ];

  const options: ChartOptions<'line'> = {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          callback(_, index) {
            // eslint-disable-next-line react/no-this-in-sfc
            const [h, m] = this.getLabelForValue(index).toString().split(':');
            return `${h}:${m}`;
          },
        },
      },
      y: {
        grid: {
          drawBorder: false,
        },
        ticks: {
          callback: (value) => `${value}°`,
          maxTicksLimit: 5,
        },
      },
    },
    plugins: {
      tooltip: {
        displayColors: false,
        yAlign: 'bottom',
        caretPadding: () => 10,
        callbacks: {
          title: () => '',
          label: ({ label, formattedValue }) =>
            `${label} - ${formattedValue} °C`,
        },
      },
      legend: { display: false },
      title: { display: false },
      annotation: {
        clip: false,
        annotations: {
          ...(anotations.reduce(
            (a, v, i) => ({ ...a, [`annotation${i}`]: v }),
            {},
          ) as _DeepPartialObject<AnnotationPluginOptions>['annotations']),
          ...(anotationsSub.reduce(
            (a, v, i) => ({ ...a, [`annotationSub${i}`]: v }),
            {},
          ) as _DeepPartialObject<AnnotationPluginOptions>['annotations']),
          ...anotationsTolMax,
        },
      },
    },
  };

  const labels = dados.map((d) => moment(d.data).format('HH:mm:ss'));

  const data: ChartData<'line'> = {
    labels,
    datasets: [
      {
        data: dados.map((d) => d.temperatura),
        borderColor: azul,
        pointRadius: 5,
        pointBackgroundColor: azul,
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
