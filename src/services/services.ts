import { Auth } from '../model/auth';

const BASE_URL = 'http://192.168.1.60:5001';

const userRegister = (data: Auth) => {
  return fetch(`${BASE_URL}/register/user`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(data => {
      return data.json();
    })
    .catch(error => {
      console.error('ERROR', error);
    });
};

const validateHash = (hash: string) => {
  return fetch(`${BASE_URL}/validate/${hash}`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.error('ERROR', error);
    });
};

const loginUser = (data: Auth) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(data => {
      return data.json();
    })
    .catch(error => {
      console.error('ERROR', error);
    });
};

const changeStateLed = (state: number) => {
  const token = localStorage.getItem('token');
  return fetch(`${BASE_URL}/change_led_status/${state}`, {
    method: 'POST',
    headers: {
      Authorization: token!
    }
  })
    .then(data => {
      return data.json();
    })
    .catch(error => {
      console.error('ERROR', error);
    });
};

export { userRegister, validateHash, loginUser, changeStateLed };
