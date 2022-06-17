import React from 'react';
import {TextField} from '@mui/material';
import {DesktopDatePicker} from '@mui/x-date-pickers';
import {useAtom} from 'jotai';
import {useUpdateAtom} from 'jotai/utils';
import {Button} from '../../components/styles';
import {Panel} from '../../components/panel';
import {RelatorioFiltroStyled} from './styled';
import {SelectEquipamento} from '../../components/select-equipamento';
import {buscaLeiturasAtom, filtrosAtom} from './atoms';

export const RelatorioFiltro = () => {
  const [filtros, setFiltros] = useAtom(filtrosAtom);

  const buscaLeituras = useUpdateAtom(buscaLeiturasAtom);

  const button = (
    <Button disabled={!filtros.equipamento} onClick={() => buscaLeituras()}>
      Filtrar
    </Button>
  );

  return (
    <Panel title="Filtro" footer={button}>
      <RelatorioFiltroStyled>
        <div>
          <SelectEquipamento
            value={filtros.equipamento}
            onChange={(equipamento) => setFiltros({equipamento})}
          />
        </div>
        <div>
          <DesktopDatePicker
            label="Período inicial"
            value={filtros.dataInicial}
            onChange={(e) => e && setFiltros({dataInicial: e})}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </div>
        <div>
          <DesktopDatePicker
            label="Período final"
            value={filtros.dataFinal}
            onChange={(e) => e && setFiltros({dataInicial: e})}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </div>
      </RelatorioFiltroStyled>
    </Panel>
  );
};
