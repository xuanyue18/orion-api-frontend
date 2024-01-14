import { ProLayoutProps } from '@ant-design/pro-components';
import logo from '../../../public/logo.png';
/**
 * @name
 */
const Settings: ProLayoutProps & {
    pwa?: boolean;
    logo?: string;
} = {
    navTheme: 'light',
    // 拂晓蓝
    colorPrimary: '#1890ff',
    layout: 'mix',
    contentWidth: 'Fluid',
    fixedHeader: true,
    fixSiderbar: true,
    colorWeak: true,
    title: 'Orion API',
    siderMenuType: 'sub',
    pwa: true,
    logo: "https://cdn.jsdelivr.net/gh/wzewei1024/NotePix@master/PicX/picx-logo.3ohwpgzi3bc0.png",
    iconfontUrl: '',
    token: {
        // 参见ts声明，demo 见文档，通过token 修改样式
        //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
    },
    splitMenus: false,
};
export default Settings;
