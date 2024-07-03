import React, {useEffect, useState} from 'react';
import type {MenuProps} from 'antd';
import {Avatar, Dropdown, Space} from 'antd';
import {DownOutlined, LogoutOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import {storageUtils} from "../../utils/storageUtils";
import moment from 'moment'
import {useNavigate} from "react-router-dom";
import useStore from "../../store";
import { t } from 'i18next';
import SelectLang from '../selectLang';
import { Icon } from '@iconify/react';
import './index.less'

const items = () => {
    let items: MenuProps['items'] = [
        {
            key: '1',
            label: t('menu.account.center'), 
            icon: <UserOutlined/>
        },
        {
            key: '2',
            label: t('menu.account.settings'),
            icon: <SettingOutlined/>
        },
        {
            type: 'divider',
        },
        {
            key: '3',
            label: t('menu.account.logout'),
            icon: <LogoutOutlined/>
        },
    ];
    return items;
};

interface HeaderProps {
    setTheme: (theme: 'default' | 'dark') => void;
}

const MyHeader: React.FC<HeaderProps> = ({ setTheme }) => {
    const {userName, avatar} = useStore()as any;
    const navigate = useNavigate();
    
    const [currentTime, setCurrentTime] = useState<string>(moment().format('YYYY-MM-DD HH:mm:ss'));

    const handleThemeChange = (theme: 'default' | 'dark') => {
        setTheme(theme);
        setThemeName(theme);
    };
    const [themeName, setThemeName] = useState('default');

    useEffect(() => {
        setInterval(() => {
            setCurrentTime(moment().format('YYYY-MM-DD HH:mm:ss'))
        }, 1000)
    }, []);

    const onClick: MenuProps['onClick'] = ({key}) => {
        if (key === "1") {
            navigate("/center")
        } else if (key === "2") {
            navigate("/setting")
        } else {
            storageUtils.logout()
            navigate("/login", {replace: true})
        }
    };

    
    return (
        <Space style={{ float: "right", marginRight: 30, height:'40px'}}>
            <span style={{ marginRight: 10 }}>{currentTime}</span>

            <div className='themeSwitchWrapper '>
                <div className={themeName === 'default' ? 'themeSwitch' : 'themeSwitch themeSwitchDark'}
                    title="更换主题"
                    onClick={() => handleThemeChange(themeName === 'default' ? 'dark' : 'default')}
                >
                <div className='themeSwitchInner'/>
                    <Icon icon="emojione:sun" />
                    <Icon icon="bi:moon-stars-fill" color="#ffe62e" />
                </div>
            </div>
            <SelectLang />
            
            <Dropdown menu={{items: items(), onClick}} placement="bottom" arrow>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <Avatar src={avatar} alt="avatar"/>
                        {userName}
                        <DownOutlined/>
                    </Space>
                </a>
            </Dropdown>
        </Space>
    );

};

export default MyHeader;