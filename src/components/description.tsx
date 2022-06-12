import React from 'react';
import {Bold, DescriptionStyled} from './styles';

export const Description = ({
  title,
  subtitle,
  children,
  error,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  error?: boolean;
}) => {
  return (
    <DescriptionStyled $error={error}>
      <div className="title-d">
        <Bold weight={700}>{title}</Bold>
      </div>
      <div className="subtitle-d">{subtitle}</div>
      <div className="content-d">{children}</div>
    </DescriptionStyled>
  );
};
