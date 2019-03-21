import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import AccountBox from '@material-ui/icons/AccountBox';

const menus = [
  {
    order: 1,
    name: 'Home',
    to: '/',
    icon: <HomeIcon />
  },
  {
    order: 2,
    name: 'Perfil',
    to: '/perfil',
    icon: <AccountBox />
  }
];

export default menus;
