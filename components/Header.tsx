
import React from 'react';

interface HeaderProps {
    title: string;
    description: string;
}

const Header: React.FC<HeaderProps> = ({ title, description }) => {
    return (
        <header>
            <h1 className="text-3xl font-bold text-white">{title}</h1>
            <p className="text-brand-text-secondary mt-1">{description}</p>
        </header>
    );
}

export default Header;
