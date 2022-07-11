import { useUpdateAtom } from 'jotai/utils';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { showMenuAtom } from '../screens/atoms';
import { menuData } from './menu-data';
import { MenuItem, MenuStyle } from './styles';

export const Menu = () => {
  const navigate = useNavigate();

  const setShowMenu = useUpdateAtom(showMenuAtom);

  return (
    <MenuStyle>
      {menuData.map(({ title, className, icon, path }) => (
        <MenuItem
          key={title}
          data-tip={title}
          data-for="tooltip"
          className={className}
          onClick={() => {
            setShowMenu(false);
            navigate(path);
          }}
          role="button">
          {icon}
        </MenuItem>
      ))}
      <ReactTooltip id="tooltip" type="dark" effect="solid" place="right" />
    </MenuStyle>
  );
};
