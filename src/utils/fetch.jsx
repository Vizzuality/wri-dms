import 'whatwg-fetch';

let headers = {
  Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
};

export function setToken(token) {
  headers = {
    Authorization: `Bearer ${token}`,
  };
  window.sessionStorage.setItem('token', token);
}

export function removeToken() {
  headers = new Headers({});
}

export default function doFetch(url, options) {
  const newHeaders = new Headers(Object.assign({}, headers, options.headers));
  return fetch(url, Object.assign({}, options, { headers: newHeaders, credentials: 'include' }));
}
