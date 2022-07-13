import { useAtomValue } from 'jotai';
import moment from 'moment';
import React from 'react';
import { Description } from '../../components/description';
import { Panel } from '../../components/panel';
import { dashErrorsAtom } from './atom';
import { CenterDash } from './styles';

export const PanelErro = () => {
  const dashErros = useAtomValue(dashErrorsAtom);

  if (!dashErros.length) {
    return <></>;
  }

  const errorMsg = (nome: string, qtdErros?: number) =>
    `O equipamento ${nome} fez ${qtdErros} leitura fora da tolerância`;

  return (
    <Panel title="Leitura fora da tolerância nas últimas 24 horas">
      <CenterDash>
        {dashErros.map(({ hora, temperatura, nome, qtdErros }) => (
          <Description
            key={hora + temperatura}
            title={`${temperatura.toLocaleString()}°C`}
            subtitle={`${moment(hora).format(
              'HH:mm:ss',
            )} última leitura fora da tolerância`}
            error>
            {errorMsg(nome, qtdErros)}
          </Description>
        ))}
      </CenterDash>
    </Panel>
  );
};
