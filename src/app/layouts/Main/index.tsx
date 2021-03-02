import React from 'react';
import './style';

interface IProps {
    children: React.ReactNode;
}

export default ({ children }: IProps) => (
    <section data-component="Layout_Main">
        {children}
    </section>
);
