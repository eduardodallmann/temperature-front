import React from 'react';
import {Modal} from '../components/modal';
import {RelatorioFiltro} from './relatorio/filtro';
import {RelatorioTable} from './relatorio/table';

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
      <RelatorioFiltro />
      <RelatorioTable />
    </>
  );
}
