import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
    const currentUser = React.useContext(CurrentUserContext);
    const avatarRef = React.useRef(currentUser.avatar);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    React.useEffect(() => {
        avatarRef.current.value = ''
    }, [isOpen]);

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input type="url" ref={avatarRef} id="popup__item-avatar" name="avatar" placeholder="Ссылка на изображение"
                className="popup__form-input" required />
            <span className="popup__form-input-error popup__item-avatar-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;