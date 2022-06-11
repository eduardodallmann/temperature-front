import React from 'react';
import {InputStyled} from './styles';

export const Input = ({
  icon,
  ...rest
}: {icon?: string} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) => {
  return (
    <InputStyled>
      <input {...rest}></input>
      {icon && <div className="icon">a</div>}
    </InputStyled>
  );
};
