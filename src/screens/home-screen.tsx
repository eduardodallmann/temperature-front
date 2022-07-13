import { useUpdateAtom } from 'jotai/utils';
import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { URL } from '../environment';
import { loadDashAtom } from './home/atom';
import { PanelErro } from './home/panel-erro';
import { PanelOk } from './home/panel-ok';

export function HomeScreen() {
  const socket = io(URL);
  const loadDash = useUpdateAtom(loadDashAtom);

  socket.on('update', () => {
    loadDash();
  });

  useEffect(() => {
    loadDash();

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PanelErro />
      <PanelOk />
    </>
  );
}
