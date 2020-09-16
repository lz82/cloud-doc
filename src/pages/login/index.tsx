import React, { FC, useState, useRef, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import classnames from 'classnames';
import { Form, Input, Button, Select, message } from 'antd';

import css from './index.module.less';

const { Option } = Select;

type checkStatus = '' | 'success' | 'warning' | 'error' | 'validating' | undefined;

const Login: FC = (props) => {
  // const { dispatch, token } = props;
  const { state } = useLocation();

  // 登录方式
  const [loginType, setLoginType] = useState('username');
  // 手机号check状态
  const [mobileCheckStatus, setMobileCheckStatus] = useState<checkStatus>('success');
  // 倒计时计时器
  const timer = useRef<number>(0);
  // 发送验证码按钮文本
  const [smsTxt, setSmsTxt] = useState('发送验证码');
  // 倒计时
  const [countDown, setCountDown] = useState(60);

  const [humanCheckStatus, setHumanCheckStatus] = useState(false);
  const [humanCheckInfo, setHumanCheckInfo] = useState({ token: '', authenticate: '' });

  // 用户名登录form实例
  const [usernameForm] = Form.useForm();
  // 短信登录form实例
  const [smsForm] = Form.useForm();

  // history
  const history = useHistory();

  useEffect(() => {
    new window.YpRiddler({
      expired: 10,
      mode: 'dialog',
      winWidth: 400,
      lang: 'zh-cn', // 界面语言, 目前支持: 中文简体 zh-cn, 英语 en
      // langPack: LANG_OTHER, // 你可以通过该参数自定义语言包, 其优先级高于lang
      container: document.getElementById('cbox'),
      appId: 'a6fd04615de9426c8e94850b7eea0c16',
      version: 'v1',
      onError: function (param: { code: number }) {
        if (!param.code) {
          message.error('错误请求');
        } else if (parseInt((param.code / 100).toString()) === 5) {
          // 服务不可用时，开发者可采取替代方案
          // console.error('验证服务暂不可用');
          message.error('验证服务暂不可用');
        } else if (param.code === 429) {
          message.error('请求过于频繁，请稍后再试');
        } else if (param.code === 403) {
          message.error('请求受限，请稍后再试');
        } else if (param.code === 400) {
          message.error('非法请求，请检查参数');
        }
        // 异常回调
        console.error('验证服务异常');
      },
      onSuccess: function (
        { token, authenticate }: { token: string; authenticate: string },
        close: Function,
        defaultSuccess: Function
      ) {
        // 成功回调
        setHumanCheckStatus(true);
        setHumanCheckInfo({
          token,
          authenticate
        });
        // 验证成功默认样式
        defaultSuccess(true);
        close();
      },
      onFail: function (code: number, msg: string, retry: Function) {
        // 失败回调
        retry();
      }
    });
  }, []);

  // 倒计时变化的副作用
  useEffect(() => {
    if (countDown === 0) {
      clearInterval(timer.current);
      setSmsTxt('发送验证码');
    } else {
      if (countDown < 60) {
        setSmsTxt(countDown + '');
      }
    }
  }, [countDown]);

  // 清除时间戳的副作用
  useEffect(() => {
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70
        }}
      >
        <Option value="86">+86</Option>
      </Select>
    </Form.Item>
  );

  // 切换登录类型
  const handleLoginTypeSwitch = (type: string) => {
    setLoginType(type);
  };

  // 检查手机
  const checkMobile = (mobile: string) => {
    const mobileChk = /^1\d{10}$/;
    if (!mobile || !mobileChk.test(mobile)) {
      return false;
    } else {
      return true;
    }
  };

  // 检查手机的业务处理
  const handleMobileCheck = () => {
    const mobile = smsForm.getFieldValue('mobile');
    const ckResult = checkMobile(mobile);
    if (ckResult) {
      setMobileCheckStatus('success');
      return mobile;
    } else {
      setMobileCheckStatus('error');
      return false;
    }
  };

  // 发送验证码按钮
  // 1.0 检查手机号码是否正确
  // 2.0 调用api发送验证码
  // 3.0 定时器倒计时
  const onSendSmsClick = async () => {
    const mobile = handleMobileCheck();
    if (mobile) {
      try {
        // await appApi.sendSms({
        //   number: mobile,
        //   ...humanCheckInfo
        // });
        message.success('发送成功');
        timer.current = window.setInterval(() => {
          setCountDown((val) => val - 1);
        }, 1000);
      } catch (err) {
        message.error(err);
      }
    }
  };

  // 账号登录
  // 数据校验通过时拿到的值
  const onUsernameFinish = () => {
    // appActions.checkLogin({
    //   userEmail: username,
    //   userPassword: md5(pwd),
    //   type: 'pwd'
    // });
    history.push('/home');
  };

  // 短信登录
  // 数据校验通过时拿到的值
  const onSmsFinish = () => {
    // appActions.checkLogin({
    //   userPhone: mobile,
    //   ecode: sms,
    //   type: 'sms'
    // });
  };

  // 短信登录的登录按钮点击事件
  // 由于手机号码的校验没有使用form托管，因此先手动进行手机号码的校验，然后再进行form的校验
  const onLoginClick = async () => {
    if (handleMobileCheck()) {
      smsForm.submit();
    }
  };

  return (
    <div className={css['login-wrapper']}>
      <div className={css['form-wrapper']}>
        <div className={css['tab-wrapper']}>
          <div
            className={classnames(css['tab'], loginType === 'username' ? css['active'] : '')}
            onClick={() => handleLoginTypeSwitch('username')}
          >
            账号登录
          </div>
          <div
            className={classnames(css['tab'], loginType === 'sms' ? css['active'] : '')}
            onClick={() => handleLoginTypeSwitch('sms')}
          >
            短信登录
          </div>
        </div>

        <div className={classnames(css['form'], loginType === 'sms' ? css['hide'] : '')}>
          <Form
            form={usernameForm}
            name="usernameForm"
            onFinish={onUsernameFinish}
            scrollToFirstError
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入用户名'
                },
                {
                  type: 'email',
                  message: '请输入正确的邮箱地址'
                }
              ]}
            >
              <Input placeholder="请输入注册邮箱" />
            </Form.Item>

            <Form.Item
              name="pwd"
              rules={[
                {
                  required: true,
                  message: '请输入密码'
                }
              ]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" block htmlType="submit" style={{ borderRadius: 5 }}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className={classnames(css['form'], loginType === 'username' ? css['hide'] : '')}>
          <Form
            form={smsForm}
            name="smsForm"
            initialValues={{ prefix: '86' }}
            onFinish={onSmsFinish}
            scrollToFirstError
          >
            <Form.Item
              name="mobile"
              extra="绑定手机号后，即可短信登录"
              validateStatus={mobileCheckStatus}
              help={mobileCheckStatus === 'success' ? null : '请输入手机号码'}
            >
              <Input addonBefore={prefixSelector} />
            </Form.Item>
            <Form.Item>
              <div id="cbox"></div>
            </Form.Item>
            <Form.Item>
              <Form.Item
                noStyle
                name="sms"
                rules={[
                  {
                    required: true,
                    message: '请输入短信验证码'
                  }
                ]}
              >
                <Input placeholder="请输入验证码 " style={{ width: 150 }} />
              </Form.Item>
              <Button
                type="primary"
                style={{ marginLeft: 10, width: 95, borderRadius: 5 }}
                onClick={onSendSmsClick}
                disabled={smsTxt !== '发送验证码' || !humanCheckStatus}
              >
                {smsTxt}
              </Button>
            </Form.Item>

            <Form.Item>
              <Button type="primary" block onClick={onLoginClick} style={{ borderRadius: 5 }}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Login;
