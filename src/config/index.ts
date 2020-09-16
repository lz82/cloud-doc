const env = process.env;

const { REACT_APP_URL_TYPE, REACT_APP_AUTH_TOKEN } = env;

const getUrl = () => {
  switch (REACT_APP_URL_TYPE) {
    case 'dev':
      return {
        baseUrl: 'http://rap2.taobao.org:38080/app/mock/249164/',
        uploadUrl: 'http://10.12.0.91:8088/file/file/upload'
      };
    case 'qa':
      return {
        baseUrl: 'http://rap2.taobao.org:38080/app/mock/249164/',
        uploadUrl: 'http://apigate.test.sstir.cn/cms/activity/upload'
      };
    case 'prod':
      return {
        baseUrl: 'http://rap2.taobao.org:38080/app/mock/249164/',
        uploadUrl: 'http://apigate.test.sstir.cn/cms/activity/upload'
      };
    default:
      return {
        baseUrl: 'http://rap2.taobao.org:38080/app/mock/249164/',
        uploadUrl: 'http://apigate.test.sstir.cn/cms/activity/upload'
      };
  }
};

export default {
  token: REACT_APP_AUTH_TOKEN,
  baseUrl: getUrl().baseUrl,
  uploadUrl: getUrl().uploadUrl
};
