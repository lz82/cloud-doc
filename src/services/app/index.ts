import { AppGet, AppPost } from '@/utils/request';

// 查询通知
export function getNoticeList() {
  return AppGet('/common/notice', null);
}

// 获取图片验证码
export function getPicCode() {
  return AppGet('/common/pic', null);
}
