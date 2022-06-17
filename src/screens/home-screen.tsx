import {useUpdateAtom} from 'jotai/utils';
import React, {useEffect} from 'react';
import {loadDashAtom} from './home/atom';
import {PanelErro} from './home/panel-erro';
import {PanelOk} from './home/panel-ok';

export function HomeScreen() {
  const loadDash = useUpdateAtom(loadDashAtom);

  useEffect(() => {
    loadDash();
  }, []);

  return (
    <>
      <PanelErro />

      <PanelOk />
    </>
  );
}
