import {Menu} from '@mui/icons-material';
import {useUpdateAtom} from 'jotai/utils';
import React from 'react';
import {toggleMenuAtom} from '../screens/atoms';
import {HeaderStyle} from './styles';

export function HeaderApp() {
  const toggleMenu = useUpdateAtom(toggleMenuAtom);

  return (
    <HeaderStyle>
      <div className="menu" role="button" onClick={toggleMenu}>
        <Menu fontSize="large" />
      </div>
      <div>Sistema de registro de temperatura</div>
    </HeaderStyle>
  );
}
