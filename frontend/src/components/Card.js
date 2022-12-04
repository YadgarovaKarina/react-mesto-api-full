import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = ({ data, onClick, onLike, onDelete }) => {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = data.owner === currentUser._id;
    const isLiked = data.likes.some(id => id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__like-button ${isLiked ? 'element__like-button_active' : ''}`
    );

    function handleLikeClick() {
        onLike(data);
    }

    function handleDeleteClick() {
        onDelete(data);
    }

    return (
        <li className="element">
            <img className="element__image" alt="Изображение" src={data.link} onClick={() => onClick(data)} />
            {isOwn && <button type="button" className='element__delete-button' onClick={handleDeleteClick}></button>}
            <div className="element__info">
                <p className="element__title">{data.name}</p>
                <div className="element__like-container">
                    <button type="button" className={cardLikeButtonClassName} onClick={() => handleLikeClick()}></button>
                    <span className='element__like-counter'>{data.likes.length}</span>
                </div>
            </div>
        </li>
    );
}

export default Card;