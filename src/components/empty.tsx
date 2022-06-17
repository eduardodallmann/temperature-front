import React from 'react';
import {Inbox} from '@mui/icons-material';
import {EmptyStyled} from './styles';

export const Empty = ({
  title = 'Nenhum registro encontrado',
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) => {
  return (
    <EmptyStyled>
      <Inbox sx={{fontSize: 80}} />
      <div className="title">{title}</div>
      <div className="subtitle">{subtitle}</div>
    </EmptyStyled>
  );
};
