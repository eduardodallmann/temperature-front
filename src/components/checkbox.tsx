import React from 'react';
import {CheckboxStyled} from './styles';

export const Checkbox = ({
  label,
  ...rest
}: {label?: React.ReactNode} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) => {
  return (
    <CheckboxStyled>
      <input type="checkbox" {...rest}></input>
      {label}
    </CheckboxStyled>
  );
};
