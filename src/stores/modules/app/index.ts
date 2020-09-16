import { fromJS } from 'immutable';

import { actionTypes, actionCreators } from './actions';
import { getToken as getAuth } from '@/utils/auth';

export { actionTypes as appActionTypes, actionCreators as appActionCreators };

const defaultState = {
  token: getAuth() || '',
  userInfo: {},
  errorMsg: '',
  noticeList: []
};

interface IAction {
  type: string,
  payload: any,
  errorMsg: string
}

export const getToken = (state: any) => {
  return state.getIn(['app', 'token']);
};

export const getUserInfo = (state: any) => {
  return state.getIn(['app', 'userInfo']);
};

export const getErrorMsg = (state: any) => {
  return state.getIn(['app', 'errorMsg']);
};

export const getNoticeList = (state: any) => {
  const temp = state.getIn(['app', 'noticeList']);
  return temp ? temp.toJS() : [];
};

export default (state = fromJS(defaultState), action: IAction) => {
  const { type, payload, errorMsg } = action;

  if (errorMsg) {
    return state.set('errorMsg', errorMsg);
  } else {
    switch (type) {
      case actionTypes.CLEAR_ERROR:
        return state.set('errorMsg', '');
      case actionTypes.SET_TOKEN:
        return state.set('token', payload);
      case actionTypes.SET_USER_INFO:
        return state.set('userInfo', payload);
      case actionTypes.CLEAR_TOKEN:
        return state.set('token', '');
      case actionTypes.SET_NOTICE:
        return state.set('noticeList', fromJS(payload));
      default:
        return state;
    }
  }
};
