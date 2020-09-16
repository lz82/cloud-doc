import instance from './axios';
// import { message } from 'antd';
import qs from 'qs';

export function AppPost(url: string, data: any) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data)
      .then((res) => {
        if (res.data.code === 200) {
          resolve(res.data.data);
        } else {
          reject(res.data.msg || res.data.errMsg);
        }
      })
      .catch((err) => {
        reject(err.toString());
      });
  });
}

export function AppGet(url: string, data: any) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params: {
          ...data
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { indices: false });
        }
      })
      .then((res) => {
        if (res.data.code === 200) {
          resolve(res.data.data);
        } else {
          reject(res.data.msg || res.data.errMsg);
        }
      })
      .catch((err) => {
        reject(err.toString());
      });
  });
}
