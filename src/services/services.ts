import { Auth } from '../model/auth';

const userRegister = (data: Auth) => {
  return fetch('http://192.168.1.54:5001/register/user', {
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
  return fetch(`http://192.168.1.54:5001/validate/${hash}`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.error('ERROR', error);
    });
};

export { userRegister, validateHash };
