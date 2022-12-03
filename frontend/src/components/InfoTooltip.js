import React from 'react';

const InfoTooltip = ({ tooltipInfo, isOpen, onClose }) => {
    const className = `popup popup_type_infoTooltip ${isOpen ? 'popup_opened' : ''}`;

    return (
        <div className={className}>
            <div className="popup__content popup__content-info">
                <button type="button" className="popup__close-button" onClick={onClose}></button>
                <img className="popup__image-info" src={tooltipInfo.image} alt={tooltipInfo.text}/>
                <h2 className="popup__title-info">{tooltipInfo.text}</h2>
            </div>
        </div>
    );
}

export default InfoTooltip;