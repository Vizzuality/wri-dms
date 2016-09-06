import { LOGIN, LOGIN_FAIL, GENERATE_TOKEN, LOGOUT } from 'actionNames';
import { BASE_API_URL } from 'constants';
import fetch, { removeToken } from '../utils/fetch';

export function goToLogin() {
  window.location = `${BASE_API_URL}/auth?callbackUrl=${`${window.location.protocol}//${window.location.host}`}&token=true`;
  return { type: 'noexist' };
}

export function checkLogged() {
  return (dispatch) => {
    // debugger; // eslint-disable-line no-restricted-syntax, no-debugger
    fetch(`${BASE_API_URL}/auth/checkLogged`, {
      method: 'GET',
      credentials: 'include',
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('401');
    }).then((data) => {
      dispatch({ type: LOGIN, payload: data });
    }, () => {
      dispatch({ type: LOGIN_FAIL });
    });
  };
}

export function logout() {
  return (dispatch) => {
    removeToken();
    fetch(`${BASE_API_URL}/auth/logout`, {
      method: 'GET',
      credentials: 'include',
    }).then((response) => {
      if (response.ok) {
        dispatch({ type: LOGOUT });
        return;
      }
    });
  };
}

export function generateToken() {
  return (dispatch) => {
    fetch(`${BASE_API_URL}/auth/generate-token`, {
      method: 'GET',
      credentials: 'include',
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('401');
    }).then((data) => {
      dispatch({ type: GENERATE_TOKEN, payload: data });
    }, () => {
      // dispatch({ type: FAIL,  });
    });
  };
}
