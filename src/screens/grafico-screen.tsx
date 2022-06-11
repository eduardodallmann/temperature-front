import React from 'react';
import {Line} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import {Panel} from '../components/panel';
import {Button} from '../components/styles';

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
  const options: ChartOptions<'line'> = {
    maintainAspectRatio: false,
    responsive: false,
    scales: {},
    plugins: {
      legend: {display: false},
      title: {display: false},
    },
  };

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];

  const data: ChartData<'line'> = {
    labels,
    datasets: [
      {
        data: [1, 2, 3, 4, 5, 6, 7],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <>
      <Panel title="Filtro" footer={<Button>Filtrar</Button>}>
        campos de filtros
      </Panel>
      <Panel title="Relatório - Equipamento Geladeira Fundos">
        <Line options={options as any} data={data} />
      </Panel>
    </>
  );
}
