import React, { Component } from 'react';

import './style.css';

class UserForm extends Component {
    state = {
        showLogin: true
    };

    toggleForm = () => {
        this.setState({
            showLogin: !this.state.showLogin
        });
    }

    reset = () => {
        this.setState({
            showLogin: ''
        });
    }

    nameInput = React.createRef();
    emailInput = React.createRef();
    passwordInput = React.createRef();

    render() {
        let contentForm = (
            <form className="sign-up-form">
                <input
                    ref={this.nameInput}
                    type="text"
                    name="name"
                    placeholder="Pseudo"
                />
                <input
                    ref={this.emailInput}
                    type="email"
                    name="email"
                    placeholder="Adresse mail"
                />
                <input
                    ref={this.passwordInput}
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                />
                <button
                    className="btn btn-default"
                    onClick={event => this.props.signUp(
                        this.nameInput.current.value,
                        this.emailInput.current.value,
                        this.passwordInput.current.value,
                        event
                    )}
                >
                    S'inscrire
                </button>
            </form>
        );

        if (this.state.showLogin) {
            contentForm = (
                <form className="sign-up-form">
                    <input
                        ref={this.emailInput}
                        type="email"
                        name="email"
                        placeholder="Adresse mail"
                    />
                    <input
                        ref={this.passwordInput}
                        type="password"
                        name="password"
                        placeholder="Mot de passe"
                    />
                    <button
                        className="btn btn-default"
                        onClick={event => this.props.logIn(
                            this.emailInput.current.value,
                            this.passwordInput.current.value,
                            event
                        )}
                    >
                        Connexion
                    </button>
                </form>
            );
        }

        return (
            <div className="content-form">
                <h1 className="form-title">
                    {this.state.showLogin ? 'Connexion' : 'Inscription'}
                </h1>

                {this.state.showLogin &&
                    <div className="form-google-wrapper">
                        <button className="btn btn--icon btn--google" onClick={this.props.signInGoogle}>Connexion Google</button>
                    </div>
                }

                <hr className="form-separator-1" />

                {contentForm}

                {this.props.authMessage &&
                    <span className="form-error">{this.props.authMessage}</span>
                }

                <hr />
                <div>
                    <span>{this.state.showLogin ? 'Pas encore membre ?' : 'Déjà membre ?'}</span>
                    <button className="btn-login" onClick={this.toggleForm}>
                        {this.state.showLogin ? 'S\'inscrire' : 'Connexion'}
                    </button>
                </div>
            </div>
        )
    }
}

export default UserForm;