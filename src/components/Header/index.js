import React from 'react';
import { withRouter } from 'react-router-dom';

import Profile from '../Profile';
import { PAGES } from '../../config';
import './style.css';

const header = props => {
    let isBoard = props.location.pathname === ('/' + props.user.id + '/mon-compte');

    let page = PAGES.find(page => (
        page.path === props.location.pathname
    ));
    
    let pageTitle = '404';

    if (page) {
        pageTitle = page.title;
    } else if (isBoard) {
        pageTitle = 'Mon compte';
    }

    return (
        <header className="page-header">
            <a href="/" className="sidebar-logo">Accueil</a>
            <h1 className="banner-title">{pageTitle}</h1>
            <Profile
                user={props.user}
                logOut={props.logOut}
            />
        </header>
    );
}

export default withRouter(header);
