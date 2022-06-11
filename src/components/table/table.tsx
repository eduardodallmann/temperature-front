import React from 'react';
import {stringify} from 'flatted';
import {Bold} from '../styles';
import {Line} from './line';
import {TableStyled} from './styles';
import {LineSeverity} from './types';

export const Table = ({
  header,
  data,
}: {
  header: Array<string>;
  data: Array<{severity?: LineSeverity; values: Array<string>}>;
}) => {
  return (
    <TableStyled>
      <Line
        data={header.map((h) => (
          <Bold key={h}>{h}</Bold>
        ))}
        severity={LineSeverity.TITLE}
      />
      {data.map((d) => (
        <Line key={stringify(d.values)} data={d.values} severity={d.severity} />
      ))}
    </TableStyled>
  );
};
