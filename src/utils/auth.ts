import Cookies from 'js-cookie';

import appConfig from '@/config';

const TOKEN_KEY: string = appConfig.token || '$_cloud_doc_token';

export function setToken(val: string) {
  Cookies.set(TOKEN_KEY, val);
}

export function getToken() {
  return Cookies.get(TOKEN_KEY);
}

export function removeToken() {
  return Cookies.remove(TOKEN_KEY);
}
