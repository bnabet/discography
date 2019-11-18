import React, { Component } from 'react';

import { AuthContext } from '../../components/AuthContext';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import UserForm from '../../components/UserForm';
import './style.css';

class Layout extends Component {
    render() {
        let _context = this.context;
        let page = null;

        if (!_context.loading) {
            page = (
                <div className="page noUser">
                    <UserForm
                        signUp={_context.signUp}
                        logIn={_context.logIn}
                        signInGoogle={_context.signInGoogle}
                        authMessage={_context.authMessage}
                    />
                </div>
            );

            if (_context.user.id) {
                page = (
                    <div className="page">
                        <Header
                            user={_context.user}
                            logOut={_context.logOut}
                        />
                        <Sidebar user={_context.user} />
                        <div className="page-area">
                            <div className="page-content">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                );
            }
        }

        return page;
    }
};

Layout.contextType = AuthContext;

export default Layout;