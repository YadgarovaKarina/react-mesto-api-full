export class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    _handleStatus(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    register(email, password) {
        return fetch(`${this._url}/signup`,
          {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email, password })
          })
          .then(this._handleStatus)
    };
    
    authorize(email, password) {
        return fetch(`${this._url}/signin`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({ email, password })
        })
          .then(this._handleStatus)
    }
    
    setToken(token) {
        this._headers.Authorization = `Bearer ${ token }`
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        }).then(this._handleStatus);
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        }).then(this._handleStatus);

    }

    editUserInfo(name, about) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({name, about})
        }).then(this._handleStatus)
    }

    addNewCard(name, link) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({name, link})
        }).then(this._handleStatus)
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        }).then(this._handleStatus)
    }

    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            return fetch(`${this._url}/cards/${id}/likes`,
                {
                    method: 'PUT',
                    headers: this._headers,
                })
                .then(this._handleStatus)
        } else {
            return fetch(`${this._url}/cards/${id}/likes`,
                {
                    method: 'DELETE',
                    headers: this._headers,
                })
                .then(this._handleStatus)
        }
    }

    updateAvatar(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(avatar)
        }).then(this._handleStatus)
    }

}

export const api = new Api({
    url: 'https://yadgarovak-backend.nomoredomains.club',
    headers: {
        Authorization: '',
        'Content-Type': 'application/json'
    }
});