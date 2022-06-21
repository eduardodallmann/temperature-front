import React from 'react';
import {getNodeText} from './methods';
import {LineStyled} from './styles';
import {LineSeverity} from './types';

export const Line = ({
  data,
  severity,
  ellipsis,
}: {
  data: Array<React.ReactNode>;
  severity?: LineSeverity;
  ellipsis?: boolean;
}) => {
  return (
    <LineStyled severity={severity} $ellipsis={ellipsis}>
      {data.map((d) => (
        <div
          key={Math.random().toString()}
          title={ellipsis ? getNodeText(d) : ''}
        >
          {d}
        </div>
      ))}
    </LineStyled>
  );
};
