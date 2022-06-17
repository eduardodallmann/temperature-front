import {useAtomValue} from 'jotai';
import React from 'react';
import {Description} from '../../components/description';
import {Panel} from '../../components/panel';
import {dashOkAtom} from './atom';
import {CenterDash} from './styles';

export const PanelOk = () => {
  const dashOk = useAtomValue(dashOkAtom);

  if (!dashOk.length) {
    return <></>;
  }

  const msg = (nome: string) =>
    `O equipamento ${nome} está com a temperatura dentro do esperado`;

  return (
    <Panel title="Status atual dos equipamentos">
      <CenterDash>
        {dashOk.map(({hora, temperatura, nome}) => (
          <Description
            key={hora + temperatura}
            title={`${temperatura}°C`}
            subtitle={`${hora} última leitura`}
          >
            {msg(nome)}
          </Description>
        ))}
      </CenterDash>
    </Panel>
  );
};
