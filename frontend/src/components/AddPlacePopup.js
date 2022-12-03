import React from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
    const [placeName, setPlaceName] = React.useState('');
    const [placeLink, setPlaceLink] = React.useState('');

    React.useEffect(() => {
        setPlaceName('');
        setPlaceLink('');
    }, [isOpen]);

    function handleChangePlaceName(e) {
        setPlaceName(e.target.value);
    }

    function handleChangePlaceLink(e) {
        setPlaceLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: placeName,
            link: placeLink,
        });
    }

    return (
        <PopupWithForm
            name="new-card"
            title="Новое место"
            buttonText="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input type="text" id="popup__item-place" name="name" placeholder="Название" className="popup__form-input"
                required minLength="2" maxLength="30" value={placeName} onChange={handleChangePlaceName} />
            <span className="popup__form-input-error popup__item-place-error"></span>
            <input type="url" id="popup__item-link" name="link" placeholder="Ссылка на картинку"
                className="popup__form-input" required value={placeLink} onChange={handleChangePlaceLink} />
            <span className="popup__form-input-error popup__item-link-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;