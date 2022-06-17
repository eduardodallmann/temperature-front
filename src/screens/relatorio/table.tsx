import React from 'react';
import {useAtomValue} from 'jotai';
import moment from 'moment';
import {Bold} from '../../components/styles';
import {Line} from '../../components/table/line';
import {Panel} from '../../components/panel';
import {Table} from '../../components/table/table';
import {filtrosAtom, mediasAtom, tabelaAtom} from './atoms';
import {statusToSeverity, statusToText} from '../../services/leituras.service';
import {Leitura} from '../../types/leitura';
import {Empty} from '../../components/empty';

export const RelatorioTable = () => {
  const dados = useAtomValue(tabelaAtom);
  const {count, media: mediaTemps, status} = useAtomValue(mediasAtom);
  const {equipamentoNome} = useAtomValue(filtrosAtom);

  const formatLine = (linha: Leitura<Date>) => {
    return [
      moment(linha.data).format('DD MMM YYYY'),
      moment(linha.hora).format('HH:mm:ss'),
      `${linha.temperatura.toLocaleString()} °C`,
      statusToText(linha.status),
    ];
  };

  const media = (
    <Line
      severity={statusToSeverity(status)}
      data={[
        <Bold key="media">Média</Bold>,
        `${count} leituras no período selecionado`,
        `${mediaTemps.toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })} °C`,
        statusToText(status),
      ]}
    />
  );

  if (!dados.length) {
    return <Empty subtitle="Use os filtros acima para ver resultados" />;
  }

  return (
    <Panel title={`Relatório - Equipamento ${equipamentoNome}`} footer={media}>
      <Table
        header={['Data', 'Hora', 'Temperatura', 'Status']}
        data={dados.map((d) => ({
          severity: statusToSeverity(d.status),
          values: formatLine(d),
        }))}
      />
    </Panel>
  );
};
