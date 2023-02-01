import React from 'react';
import s from './Header.module.css';

const Header = () => {
    return (
        <header className={s.header}>
            <img src="https://raw.githubusercontent.com/infinitered/dogs-n-cats/HEAD/_art/dnc_logo.png"/>
        </header>
    )
};

export default Header;