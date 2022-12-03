import React from 'react';
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [state, setState] = React.useState({
        email: '',
        password: ''
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
        onLogin(email, password)
    };

    return (
        <div className="auth">
            <form className="auth__form" name="login" onSubmit={handleSubmit}>
                <h2 className="auth__title">Вход</h2>
                <input type="email" className="auth__input" name="email"
                    value={state.email} onChange={handleChange} placeholder="Email" required />
                <input type="password" className="auth__input" name="password"
                    value={state.password} onChange={handleChange} placeholder="Пароль" required />
                <button type="submit" className="auth__button">Войти</button>
            </form>
            <div className="auth__signin">
                <p className="auth__subtitle">Ещё не зарегистрированы?</p>
                <Link to="/sign-up" className="auth__login-link">Зарегистрироваться</Link>
            </div>
        </div>
    );
}

export default Login;