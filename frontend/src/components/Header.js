import React from 'react';
import headerLogo from '../images/__logo.svg';
import { Link, Switch, Route } from 'react-router-dom';

function Header({ email, onLogout }) {
  return (
    <div className='header'>
      <img className="header__logo" src={headerLogo} alt='Логотип' />
      <Switch>
        <Route exact path="/">
          <div className="header__info">{email}
            <button className="header__button" onClick={onLogout}>Выйти</button>
          </div>
        </Route>
        <Route path="/sign-up">
          <Link className="header__link" to='sign-in'>Войти</Link>
        </Route>
        <Route path="/sign-in">
          <Link className="header__link" to='sign-up'>Регистрация</Link>
        </Route>
      </Switch>
    </div>
  );
}

export default Header;
