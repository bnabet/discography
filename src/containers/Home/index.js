import React from 'react';

import Wrapper from '../../hoc/Wrapper';
import SubTitle from '../../components/UI/SubTitle/SubTitle';

import './style.css';

const home = () => {
    return (
        <Wrapper>
            <SubTitle>Actualités</SubTitle>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </Wrapper>
    );
};

export default home;