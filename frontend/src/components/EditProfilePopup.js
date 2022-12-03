import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState(currentUser.name);
    const [about, setAbout] = React.useState(currentUser.about);

    React.useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser, isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangAbout(e) {
        setAbout(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about,
        });
    }

    return (
        <PopupWithForm
            name="edit-profile"
            title="Редактировать профиль"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            >
            <input type="text" name="name" placeholder="Имя" className="popup__form-input"
                required minLength="2" maxLength="40" value={name} onChange={handleChangeName} />
            <span className="popup__form-input-error popup__item-name-error"></span>
            <input type="text" name="about" placeholder="О себе" className="popup__form-input"
                required minLength="2" maxLength="200" value={about} onChange={handleChangAbout} />
            <span className="popup__form-input-error popup__item-job-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;