import React from 'react';
import {LineStyled} from './styles';
import {LineSeverity} from './types';

export const Line = ({
  data,
  severity,
}: {
  data: Array<React.ReactNode>;
  severity?: LineSeverity;
}) => {
  return (
    <LineStyled severity={severity}>
      {data.map((d) => (
        <div key={d?.toLocaleString() || ''}>{d}</div>
      ))}
    </LineStyled>
  );
};
