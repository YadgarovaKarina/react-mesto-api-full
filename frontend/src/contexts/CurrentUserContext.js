import React from 'react';
import avatar from '../images/__avatar.png';

export const CurrentUserContext = React.createContext();

export const defaultCurrentUser = {
    name: 'Жак Ив Кусто',
    about: 'Исследователь океана',
    avatar: avatar,
    _id: ''
}