import Footer from '@/components/Footer';
import {userLoginUsingPOST, userRegisterUsingPOST} from '@/services/orion-api-backend/userController';
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginFormPage, ProFormCheckbox, ProFormInstance, ProFormText,} from '@ant-design/pro-components';
import {useModel} from '@umijs/max';
import {message, Tabs} from 'antd';
import type {CSSProperties} from 'react';
import React, {useRef, useState} from 'react';
import OrionBackImg from '../../../../public/background.jpg';
import logo from '../../../../public/logo.png';

type LoginType = 'account' | 'register' | 'forgetPassword';


const iconStyles: CSSProperties = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};
const Login: React.FC = () => {
    const {initialState, setInitialState} = useModel('@@initialState');
    const [loginType, setLoginType] = useState<LoginType>('account');
    const formRef = useRef<ProFormInstance>();
    const [submitText, setSubmitText] = useState('登录'); // submitText状态
    // 切换标签时调用的函数
    const handleTabChange = (activeKey: string) => {
        setLoginType(activeKey as LoginType);
        if (activeKey === 'account') {
            setSubmitText('登录'); // 如果是登录标签，设置文本为"登录"
        } else if (activeKey === 'register') {
            setSubmitText('注册'); // 如果是注册标签，设置文本为"注册"
        }
    };

    const handleSubmit = async (values: API.UserRegisterRequest) => {
        const {userPassword, checkPassword} = values;

        if (checkPassword) {
            // 注册
            if (userPassword !== checkPassword) {
                message.error('两次输入密码不一致！');
                return;
            }
            const res = await userRegisterUsingPOST(values);
            if (res.code === 0) {
                // 注册成功
                const defaultRegisterSuccessMessage = '注册成功！';
                message.success(defaultRegisterSuccessMessage)
                // 切换到登录
                setLoginType('account');
                // 重置表单
                formRef.current?.resetFields();
            }

        } else {
            // 登录
            const res = await userLoginUsingPOST({
                ...values,
            });
            if (res.data) {
                const defaultLoginSuccessMessage = '登录成功！';
                message.success(defaultLoginSuccessMessage);
                // 登录成功后处理
                const urlParams = new URL(window.location.href).searchParams;
                // 重定向到 redirect 参数所在的位置
                location.href = urlParams.get('redirect') || '/';
                // 保存登录状态
                setInitialState({
                    loginUser: res.data,
                });
            } else {
                message.error(res.message);
            }
        }
    };
    return (
        <div>
            <div
                style={{
                    backgroundColor: 'white',
                    height: 'calc(100vh - 100px)',
                    margin: 0,
                }}
            >
                <LoginFormPage
                    backgroundImageUrl={OrionBackImg}
                    logo={logo}
                    title="Orion API"
                    subTitle="最好用的免费API接口平台"
                    submitter={{searchConfig: {submitText: submitText,}}}
                    initialValues={{
                        autoLogin: true,
                    }}
                    onFinish={async (values) => {
                        await handleSubmit(values as API.UserRegisterRequest);
                    }}
                >
                    {
                        <Tabs
                            centered
                            activeKey={loginType}
                            onChange={handleTabChange}
                        >
                            <Tabs.TabPane key={'account'} tab={'登录'}/>
                            <Tabs.TabPane key={'register'} tab={'注册'}/>
                        </Tabs>
                    }
                    {loginType === 'account' && (
                        <>
                            <ProFormText
                                name="userAccount"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined/>,
                                }}
                                placeholder={'请输入用户名'}
                                rules={[
                                    {
                                        required: true,
                                        message: '用户名是必填项！',
                                    },
                                ]}
                            />
                            <ProFormText.Password
                                name="userPassword"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined/>,
                                }}
                                placeholder={'请输入密码'}
                                rules={[
                                    {
                                        required: true,
                                        message: '密码是必填项！',
                                    },
                                ]}
                            />
                            <div
                                style={{
                                    marginBottom: 24,
                                }}
                            >
                                <ProFormCheckbox noStyle name="autoLogin">
                                    自动登录
                                </ProFormCheckbox>
                                <a
                                    style={{
                                        float: 'right',
                                    }}
                                    onClick={() => setLoginType("forgetPassword")}
                                >
                                    忘记密码 ?
                                </a>
                            </div>
                        </>
                    )}
                    {loginType === 'register' && (
                        <>
                            <ProFormText
                                fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined/>,
                                }}
                                name="userAccount"
                                placeholder={'请输入用户名'}
                                rules={[
                                    {
                                        required: true,
                                        message: '用户名是必填项！',
                                    },
                                    {
                                        min: 4,
                                        message: '长度不能少于4位！',
                                    },
                                ]}
                            />
                            <ProFormText.Password
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined/>,
                                }}
                                name="userPassword"
                                placeholder={'请输入密码'}
                                rules={[
                                    {
                                        required: true,
                                        message: '密码是必填项！',
                                    },
                                    {
                                        min: 8,
                                        message: '长度不能少于8位！',
                                    },
                                ]}
                            />
                            <ProFormText.Password
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined/>,
                                }}
                                name="checkPassword"
                                placeholder={'请再次输入密码'}
                                rules={[
                                    {
                                        required: true,
                                        message: '密码是必填项！',
                                    },
                                    {
                                        min: 8,
                                        message: '长度不能少于8位！',
                                    },
                                ]}
                            />
                        </>
                    )}
                    {loginType === 'forgetPassword' && (
                        <>
                            <h1 style={{ color: 'lightskyblue', fontSize: '48px', textAlign: 'center' }}>忘记密码请联系管理员😀</h1>
                        </>
                    )}
                </LoginFormPage>
            </div>
            <Footer/>
        </div>
    );
};
export default Login;
