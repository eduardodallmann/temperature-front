import React from 'react';
import {Bold} from '../styles';
import {Line} from './line';
import {TableStyled} from './styles';
import {LineSeverity} from './types';

export const Table = ({
  header,
  data,
}: {
  header: Array<React.ReactNode>;
  data: Array<{severity?: LineSeverity; values: Array<React.ReactNode>}>;
}) => {
  return (
    <TableStyled>
      <Line
        data={header.map((h) => (
          <Bold key={Math.random().toString()}>{h}</Bold>
        ))}
        severity={LineSeverity.TITLE}
        ellipsis
      />
      {data.map((d) => (
        <Line
          key={Math.random().toString()}
          data={d.values}
          severity={d.severity}
        />
      ))}
    </TableStyled>
  );
};
