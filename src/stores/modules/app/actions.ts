import { appApi } from '@/services';
import { setToken, removeToken } from '@/utils/auth';

export const actionTypes = {
  CLEAR_ERROR: 'app/clear_error',
  SET_TOKEN: 'app/set_token',
  CLEAR_TOKEN: 'app/clear_token',
  SET_USER_INFO: 'app/set_user_info',
  SET_NOTICE: 'app/set_notice'
};

export const actionCreators = {
  clearError() {
    return {
      type: actionTypes.CLEAR_ERROR
    };
  },

  setToken(token: string) {
    return {
      type: actionTypes.SET_TOKEN,
      payload: token
    };
  },

  clearToken() {
    return {
      type: actionTypes.CLEAR_TOKEN
    };
  },

  setUserInfo(userInfo: any) {
    return {
      type: actionTypes.SET_USER_INFO,
      payload: userInfo
    };
  },

  checkLogin(data: any) {
    return async (dispatch: Function) => {
      try {
        console.log(data);
        const res = await appApi.login(data);
        console.log(res)
        setToken(new Date() + '');
        dispatch(actionCreators.setToken(new Date() + ''));
      } catch (err) {
        dispatch({
          type: 'error',
          errorMsg: err
        });
      }
    };
  },

  logout() {
    return (dispatch: Function) => {
      removeToken();
      dispatch(actionCreators.clearToken());
    };
  },

  setNotice(val: any) {
    return {
      type: actionTypes.SET_NOTICE,
      payload: val
    };
  },

  getNotice() {
    return async (dispatch: Function) => {
      try {
        const res: any = await appApi.getNoticeList();
        dispatch(actionCreators.setNotice(res.list));
      } catch (err) { }
    };
  }
};
