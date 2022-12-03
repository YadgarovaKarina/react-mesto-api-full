import React from 'react';

const ImagePopup = ({ card, isOpen, onClose }) => {
    const className = `popup popup_type_full-photo ${isOpen ? 'popup_opened' : ''}`;
    
    return (
        <div className={className}>
            <figure className="popup__content popup__content_photo">
                <button type="button" className="popup__close-button popup__close-button_photo" onClick={onClose}></button>
                <img src={card.link} alt={card.name} className="popup__image-content" />
                <figcaption className="popup__description">{card.name}</figcaption>
            </figure>
        </div>
    );
}

export default ImagePopup;