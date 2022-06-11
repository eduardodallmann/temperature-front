import React from 'react';
import {CloseIcon} from './icons/close';
import {PanelStyled} from './styles';

export const Panel = ({
  title,
  showClose,
  children,
  footer,
  onClickClose,
}: {
  title: string;
  showClose?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClickClose?: () => void;
}) => {
  return (
    <PanelStyled>
      <div className="title">
        <div>{title}</div>
        {showClose && (
          <div className="close" onClick={onClickClose} role="button">
            <CloseIcon />
          </div>
        )}
      </div>
      <div className="content">{children}</div>
      {footer && <div className="footer">{footer}</div>}
    </PanelStyled>
  );
};
