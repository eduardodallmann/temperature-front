import React from 'react';
import {Panel} from './panel';
import {ModalStyled, Button} from './styles';

export const Modal = ({
  visible,
  title,

  okText = 'Ok',
  okDisabled,
  onOk,

  cancelText = 'Cancelar',
  cancelDisabled,
  onCancel,
}: {
  visible?: boolean;
  title: string;

  okText?: string;
  okDisabled?: boolean;
  onOk?: () => void;

  cancelText?: string;
  cancelDisabled?: boolean;
  onCancel?: () => void;
}) => {
  if (!visible) return <></>;

  const buttons = (
    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
      <Button onClick={onCancel} disabled={cancelDisabled}>
        {cancelText}
      </Button>
      <Button onClick={onOk} disabled={okDisabled} style={{marginLeft: '11px'}}>
        {okText}
      </Button>
    </div>
  );

  return (
    <ModalStyled
      data-clickable
      onClick={(e) => {
        if ((e.target as Element).hasAttributeNS(null, 'data-clickable'))
          onCancel?.();
      }}
    >
      <Panel title={title} showClose onClickClose={onCancel} footer={buttons}>
        sfs dsf sdfs sf sfsssfs dsf sdfs sf sfsssfs dsf sdfs sf sfsssfs dsf sdfs
        sf sfsssfs dsf sdfs sf sfsssfs dsf sdfs sf sfsssfs dsf sdfs sf sfss
      </Panel>
    </ModalStyled>
  );
};
