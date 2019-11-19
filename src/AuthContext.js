import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

const firebase = require('firebase');

const admins = ['ben.nabet08@gmail.com', 'ben.maker.productions@gmail.com'];

export const AuthContext = React.createContext();

class AuthProvider extends Component {
    state = {
        user: {},
        authMessage: '',
        loading: true
    };

    componentDidMount() {
        firebase
            .auth()
            .onAuthStateChanged(user => {
                if (user) {
                    this.setState({
                        user: {
                            id: user.uid,
                            email: user.email,
                            name: user.displayName,
                            photo: user.photoURL,
                            isAdmin: admins.indexOf(user.email) > -1,
                            loading: false
                        }
                    });
                } else {
                    this.setState({ user: {}, loading: false });
                }

                this.setState({
                    loading: false
                });
            })
    }

    signUp = async (name, email, password, event) => {
        event.preventDefault();

        await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(result => {
                result.user.updateProfile({
                    displayName: name
                }).then(() => {
                    this.props.history.push(`/${this.state.user.id}/mon-compte`)
                })
            })
            .catch(error => {
                this.setState({ authMessage: error.message });
            })
    }

    logIn = async (email, password, event) => {
        /*event.preventDefault();

        await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                this.props.history.push(`/${this.state.user.id}/mon-compte`)
            })
            .catch(error => {
                this.setState({ authMessage: error.message });
            })*/


        try {
            event.preventDefault();

            await firebase
                .auth()
                .signInWithEmailAndPassword(email, password);
                
            this.props.history.push(`/${this.state.user.id}/mon-compte`);
        } catch(error) {
            this.setState({
                authMessage: error.message
            });
        }
    }

    logOut = async (event) => {
        event.preventDefault();

        firebase
            .auth()
            .signOut()
            .then(() => {
                this.setState({ user: {} });
                this.props.history.push(`/`);
            })
            .catch(error => {
                this.setState({ authMessage: error.message });
            })
    }

    signInGoogle = () => {
        firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                var provider = new firebase.auth.GoogleAuthProvider();

                firebase
                    .auth()
                    .signInWithPopup(provider)
                    .then(result => {
                        // var token = result.credential.accessToken;
                        var user = result.user;
                        this.props.history.push(`/${user.uid}/mon-compte`);
                    })
            })
            .catch(error => {
                this.setState({ authMessage: error.message });
            })
    }

    render() {
        return (
            <AuthContext.Provider
                value={{
                    user: this.state.user,
                    signUp: this.signUp,
                    logIn: this.logIn,
                    signInGoogle: this.signInGoogle,
                    logOut: this.logOut,
                    authMessage: this.state.authMessage,
                    loading: this.state.loading
                }}
            >
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

export default withRouter(AuthProvider);