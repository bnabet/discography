import React from 'react';

import Aux from '../../hoc/Aux';
import SubTitle from '../../components/UI/SubTitle/SubTitle';

import './style.css';

const home = () => {
    return (
        <Aux>
            <SubTitle>Actualités</SubTitle>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </Aux>
    );
};

export default home;