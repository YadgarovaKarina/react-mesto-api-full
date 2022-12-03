import React from 'react';

const PopupWithForm = ({ name, title, buttonText, children, isOpen, onClose, onSubmit }) => {
  const className = `popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`;

  return (
    <div className={className}>
      <div className="popup__content">
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form name={name} className="popup__form popup__form_profile" onSubmit={onSubmit} noValidate>
          {children}
          <button type="submit" name="submit" className="popup__submit-button popup__submit-button_save">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;