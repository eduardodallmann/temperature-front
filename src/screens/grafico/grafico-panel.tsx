import React from 'react';
import {ChartArea, ChartData, ChartOptions, ScriptableContext} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {useAtomValue} from 'jotai';
import moment from 'moment';
import {
  AnnotationPluginOptions,
  PartialEventContext,
} from 'chartjs-plugin-annotation';
import {LineSeverity} from '../../components/table/types';
import {Panel} from '../../components/panel';
import {filtrosAtom, limitesAtom, tabelaAtom} from '../relatorio/atoms';
import {Empty} from '../../components/empty';
import {_DeepPartialObject} from './types';

export const GraficoPanel = () => {
  const vermelho = '#EE4057';
  const medioVerm = '#9A6B7F';
  const azul = '#359FAF';
  const dados = useAtomValue(tabelaAtom);
  const {limiteToleranciaMaxima, toleranciaMaxima} = useAtomValue(limitesAtom);
  const {equipamentoNome} = useAtomValue(filtrosAtom);

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

  const defineDotColor = (value: number) => {
    if (value >= limiteToleranciaMaxima) {
      return vermelho;
    }
    if (value >= toleranciaMaxima) {
      return medioVerm;
    }

    return azul;
  };

  const anotations: _DeepPartialObject<AnnotationPluginOptions>['annotations'] =
    dados.map((d, i) => ({
      type: 'point',
      backgroundColor: () => defineDotColor(d.temperatura),
      borderColor: () => defineDotColor(d.temperatura),
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
          label: ({label, formattedValue}) => `${label} - ${formattedValue} °C`,
        },
      },
      legend: {display: false},
      title: {display: false},
      annotation: {
        clip: false,
        annotations: {
          ...(anotations.reduce(
            (a, v, i) => ({...a, [`annotation${i}`]: v}),
            {},
          ) as _DeepPartialObject<AnnotationPluginOptions>['annotations']),
          ...(anotationsSub.reduce(
            (a, v, i) => ({...a, [`annotationSub${i}`]: v}),
            {},
          ) as _DeepPartialObject<AnnotationPluginOptions>['annotations']),
        },
      },
    },
  };

  const labels = dados.map((d) => moment(d.hora).format('HH:mm:ss'));

  let width: number;
  let height: number;
  let gradient: CanvasGradient;

  const getGradient = (
    severity: LineSeverity,
    ctx: CanvasRenderingContext2D,
    chartArea: ChartArea,
  ) => {
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