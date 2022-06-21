import React from 'react';
import {CloseIcon} from './icons/close';
import {PanelStyled} from './styles';

export const Panel = ({
  title,
  showClose,
  children,
  footer,
  scrollIn,
  onClickClose,
}: {
  title: string;
  showClose?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
  scrollIn?: number;
  onClickClose?: () => void;
}) => {
  return (
    <PanelStyled scrollIn={scrollIn}>
      <div className="title">
        <div className="text" title={title}>
          {title}
        </div>
        {showClose && (
          <div className="close" onClick={onClickClose} role="button">
            <CloseIcon />
          </div>
        )}
      </div>
      <div className="container">
        <div className="scroll">
          <div className="content">{children}</div>
          {footer && <div className="footer">{footer}</div>}
        </div>
      </div>
    </PanelStyled>
  );
};
