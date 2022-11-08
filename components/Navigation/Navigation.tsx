import React from 'react';
import Link from 'next/link';

import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import styles from './Navigation.module.scss'

type Props = {};

export default function Navigation(params:Props) {

    return(
        <div>
            <nav className={`${styles['header-navigation']}`}>
                <ul>
                    <li><Link href={'/roulette'}>Rulette</Link></li>
                    <li><Link href={'/match-betting'}>Match Betting</Link></li>
                    <li><Link href={'/coinflip'}>Coinflip</Link></li>
                    <li className={`${styles['login-button']}`}><a href="/api/auth/steam">Login</a></li>
                </ul>
            </nav>
            <Avatar size={64} icon={<UserOutlined />} />
        </div>
    )
}