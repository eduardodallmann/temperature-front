import React from 'react';
import {stringify} from 'flatted';
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
        <div key={stringify(d)}>{d}</div>
      ))}
    </LineStyled>
  );
};
