import React, { Component } from 'react';

import { AuthContext } from '../../AuthContext';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import UserForm from '../../components/UserForm';

import './style.css';

class Layout extends Component {
    render() {
        const { loading, signUp, logIn, logOut, signInGoogle, authMessage, user } = this.context;
        let page = null;

        if (!loading) {
            page = (
                <div className="page noUser">
                    <UserForm
                        signUp={signUp}
                        logIn={logIn}
                        signInGoogle={signInGoogle}
                        authMessage={authMessage}
                    />
                </div>
            );

            if (user.id) {
                page = (
                    <div className="page">
                        <Header user={user} logOut={logOut} />
                        <Sidebar user={user} />
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