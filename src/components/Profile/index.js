import React from 'react';

import avatar from '../../images/avatars/avatar-male.png';

import './style.css';

const profile = props => {
    const style = {
        backgroundImage: `url(${props.user.photo || avatar})`
    };

    return (
        <div className="banner-profile">
            <div className="profile-photo" style={style}></div>
            {/* <div className="profile-infos">
                <div className="profile-name">{props.user.name}</div>
                <button className="profile-logout" onClick={props.logOut}>Se déconnecter</button>
            </div> */}
        </div>
    );
}

export default profile;
