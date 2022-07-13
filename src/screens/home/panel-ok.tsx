import { useAtomValue } from 'jotai';
import moment from 'moment';
import React from 'react';
import { Description } from '../../components/description';
import { Panel } from '../../components/panel';
import { StatusLeitura } from '../../types/leitura';
import { dashOkAtom } from './atom';
import { CenterDash } from './styles';

export const PanelOk = () => {
  const dashOk = useAtomValue(dashOkAtom);

  if (!dashOk.length) {
    return <></>;
  }

  const msg = (nome: string, status: StatusLeitura) => {
    switch (status) {
      case StatusLeitura.DENTRO:
        return `O equipamento ${nome} está com a temperatura dentro do esperado`;
      case StatusLeitura.ACIMA:
        return `O equipamento ${nome} um pouco acima do esperado`;

      default:
        return `O equipamento ${nome} teve a última leitura fora do esperado`;
    }
  };

  return (
    <Panel title="Status atual dos equipamentos">
      <CenterDash>
        {dashOk.map(({ hora, temperatura, nome, status }, i) => (
          <Description
            key={hora + temperatura + i}
            error={status === StatusLeitura.FORA}
            title={`${temperatura.toLocaleString()}°C`}
            subtitle={`${moment(hora).format('HH:mm:ss')} última leitura`}>
            {msg(nome, status)}
          </Description>
        ))}
      </CenterDash>
    </Panel>
  );
};
