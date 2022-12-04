import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import React from 'react';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import error from '../images/error.png';
import success from '../images/success.png';
import { api } from '../utils/api';
import { defaultCurrentUser, CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';

function App() {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [cards, setCards] = React.useState([]);
    const [openPopupName, setOpenPopupName] = React.useState('');
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState(defaultCurrentUser);
    const [tooltipInfo, setTooltipInfo] = React.useState({
        image: " ",
        message: " "
    });

    const history = useHistory();

    const handleLogin = (email, password) => {
        return api.authorize(email, password)
            .then(({ token }) => {
                if (!token) throw new Error('Missing jwt');
                localStorage.setItem('jwt', token);
                setLoggedIn(true);
            })
            .catch((err) => {
                showInfoPopup({
                    image: error,
                    text: 'Что-то пошло не так! Попробуйте ещё раз.'
                });
                console.log(err)
            });
    };

    const handleRegister = (email, password) => {
        return api.register(email, password)
            .then(() => {
                showInfoPopup({
                    image: success,
                    text: 'Вы успешно зарегистрировались!'
                });
                history.push('/sign-in');
            })
            .catch((err) => {
                showInfoPopup({
                    image: error,
                    text: 'Что-то пошло не так! Попробуйте ещё раз.'
                });
                console.log(err)
            });
    };

    const handleLogout = () => {
        localStorage.removeItem("jwt");
        history.push("/sign-in");
        setLoggedIn(false);
    };

    const tokenCheck = () => {
        const jwt = localStorage.getItem('jwt');
        api.setToken(jwt);
        if (!jwt) return;
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([user, cards]) => {
                if (user && user.email) {
                    setLoggedIn(true);
                    setCurrentUser(user);
                    setCards(cards.data);
                    history.push("/");
                } else {
                    handleLogout();
                }
            })
            .catch((err) => {
                handleLogout();
                console.log(err)
            });
    };

    React.useEffect(() => {
        tokenCheck();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn]);

    const handleClosePopup = () => {
        setOpenPopupName('');
    };

    const onCardClick = (card) => {
        setSelectedCard(card);
        setOpenPopupName('full-photo');
    };

    const onEditProfileClick = () => {
        setOpenPopupName('edit-profile');
    };

    const onNewPlaceClick = () => {
        setOpenPopupName('new-card');
    };

    const onAvatarClick = () => {
        setOpenPopupName('avatar');
    };

    const showInfoPopup = ({ image, text }) => {
        setOpenPopupName('infoTooltip');
        setTooltipInfo({ image, text });
    };

    function handleUpdateUser({ name, about }) {
        api.editUserInfo(name, about)
            .then((onUpdateUser) => {
                setCurrentUser(onUpdateUser);
                handleClosePopup();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleUpdateAvatar(userAvatar) {
        api.updateAvatar(userAvatar)
            .then((onUpdateAvatar) => {
                setCurrentUser(onUpdateAvatar)
                handleClosePopup();
            })
            .catch((err) => {
                console.log(err)
            });
    };

    function handleCardLike(card) {
        console.log(card)
        const isLiked = card.likes.some(id => id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err)
            });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards(cards => cards.filter((c) => c._id !== card._id));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleAddPlaceSubmit({ name, link }) {
        api.addNewCard(name, link)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                handleClosePopup();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header
                onLogout={handleLogout}
                email={currentUser.email} />
            <Switch>
                <ProtectedRoute
                    exact path="/"
                    loggedIn={loggedIn}
                    component={Main}
                    cards={cards}
                    onCardClick={onCardClick}
                    onEditProfileClick={onEditProfileClick}
                    onNewPlaceClick={onNewPlaceClick}
                    onAvatarClick={onAvatarClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete} />

                <Route path="/sign-in">
                    <Login
                        onLogin={handleLogin} />
                </Route>

                <Route path="/sign-up">
                    <Register
                        onRegister={handleRegister} />
                </Route>

                <Route path="*">
                    {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
                </Route>

            </Switch>
            <Footer />
            <EditProfilePopup
                isOpen={openPopupName === 'edit-profile'}
                onClose={handleClosePopup}
                onUpdateUser={handleUpdateUser} />
            <AddPlacePopup
                isOpen={openPopupName === 'new-card'}
                onClose={handleClosePopup}
                onAddPlace={handleAddPlaceSubmit} />
            <ImagePopup
                card={selectedCard}
                isOpen={openPopupName === 'full-photo'}
                onClose={handleClosePopup} />
            <PopupWithForm
                name="delete-card"
                title="Вы уверены?"
                buttonText="Да"
                onClose={handleClosePopup} />
            <EditAvatarPopup
                isOpen={openPopupName === 'avatar'}
                onClose={handleClosePopup}
                onUpdateAvatar={handleUpdateAvatar} />
            <InfoTooltip
                isOpen={openPopupName === 'infoTooltip'}
                onClose={handleClosePopup}
                tooltipInfo={tooltipInfo} />
        </CurrentUserContext.Provider>
    );
}

export default App;
