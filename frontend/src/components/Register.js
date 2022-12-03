import React from 'react';
import { Link } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const [state, setState] = React.useState({
    password: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = state;
    onRegister(email, password)
  }

  return (
    <div className="auth">
      <form className="auth__form" name="register" onSubmit={handleSubmit}>
        <h2 className="auth__title">Регистрация</h2>
        <input type="email" className="auth__input" name="email"
          value={state.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" className="auth__input" name="password"
          value={state.password} onChange={handleChange} placeholder="Пароль" required />
        <button type="submit" className="auth__button">Зарегистрироваться</button>
      </form>
      <div className="auth__signin">
        <p className="auth__subtitle">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="auth__login-link">Войти</Link>
      </div>
    </div>
  );
}

export default Register;