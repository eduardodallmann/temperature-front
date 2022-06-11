import React from 'react';
import {Button} from '../components/styles';
import {Panel} from '../components/panel';
import {Line} from '../components/table/line';
import {Table} from '../components/table/table';
import {Modal} from '../components/modal';

export function RelatorioScreen() {
  return (
    <>
      <Modal
        title="fd"
        visible={false}
        onCancel={() => {
          console.log('close');
        }}
      />
      <Panel title="Filtro" footer={<Button>Filtrar</Button>}>
        campos de filtros
      </Panel>
      <Panel
        title="Relatório - Equipamento Geladeira Fundos"
        footer={<Line data={['a', 'b', 'c']} />}
      >
        <Table header={['d', 'e', 'f']} data={[{values: ['1', '2', '3']}]} />
      </Panel>
    </>
  );
}
