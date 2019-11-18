import React from 'react';

import './style.css';

const subTitle = props => (
    <div className="page-title">
        <h2 className="title-label">{props.children}</h2>
    </div>
);

export default subTitle;