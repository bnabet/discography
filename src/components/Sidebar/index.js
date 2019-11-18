import React from 'react';
import { NavLink } from "react-router-dom";

import { SIDEBAR } from '../../config';
import './style.css';

const Sidebar = props => {
    const publicLinks = (
        SIDEBAR.links.map(link => {
            if (link.show) {
                return (
                    <li key={link.path}>
                        <NavLink
                            exact
                            to={link.path}
                            activeClassName="active"
                            className={"sidebar-link sidebar-link--" + link.icon}
                        >
                            {link.title}
                        </NavLink>
                    </li>
                );
            }
        })
    );

    return (
        <div className="sidebar">
            <div className="sidebar-group">
                <nav className="sidebar-list">
                    {publicLinks}
                </nav>
            </div>
            
            <div className="sidebar-group">
                <span className="sidebar-title">Private</span>
                <nav className="sidebar-list">
                    <li>
                        <NavLink
                            exact
                            to={`/${props.user.id}/mon-compte`}
                            activeClassName="active"
                            className={"sidebar-link sidebar-link--lock"}
                        >Mon compte</NavLink>
                    </li>

                    {props.user.isAdmin &&
                        <li>
                            <NavLink
                                exact
                                to="/ajouter"
                                activeClassName="active"
                                className={"sidebar-link sidebar-link--lock"}
                            >Ajouter</NavLink>
                        </li>
                    }
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;