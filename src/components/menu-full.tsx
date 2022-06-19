import {useAtom} from 'jotai';
import React from 'react';
import {useHistory} from 'react-router-dom';
import {showMenuAtom} from '../screens/atoms';
import {menuData} from './menu-data';
import {MenuFullItem, MenuFullStyle} from './styles';

export const MenuFull = () => {
  const history = useHistory();

  const [showMenu, setShowMenu] = useAtom(showMenuAtom);

  if (!showMenu) {
    return <></>;
  }

  return (
    <MenuFullStyle>
      {menuData.map(({title, className, icon, path}) => (
        <MenuFullItem
          key={title}
          className={className}
          onClick={() => {
            setShowMenu(false);
            history.push(path);
          }}
          role="button"
        >
          <div className="icon">{icon}</div>
          <div className="title">{title}</div>
        </MenuFullItem>
      ))}
    </MenuFullStyle>
  );
};
