import React, { Component } from 'react';

import firebase from 'firebase';
import { usersRef, songsRef } from '../../firebase';
import { AuthContext } from '../../components/AuthContext';
import Card from '../../components/Card';
import SubTitle from '../../components/UI/SubTitle/SubTitle';
import Aux from '../../hoc/Aux';
import './style.css';

class Board extends Component {
    state = {
        favourites: [],
        usersFavourites: []
    };

    getFavourites = userId => {
        usersRef.doc(userId)
            .get()
            .then(doc => {
                if (doc.exists) {
                    doc.data().songs.map(songId => (
                        songsRef
                            .where(firebase.firestore.FieldPath.documentId(), '==', songId)
                            .get()
                            .then(songs => {
                                songs.forEach(song => {
									const favouriteObj = {
										id: songId,
                                        favourite: true,
										...song.data()
									};
                                    this.setState({
                                        favourites: [...this.state.favourites, favouriteObj]
                                    });
                                })
                            })
                    ))
                }
            }).catch(error => {
                console.log("Error getting favourites songs:", error);
            })
	}

    componentDidMount() {
        this.getFavourites(this.props.match.params.userId);
    }
    
    render() {
        const { favourites } = this.state;

        let favSongs = 'Aucun favoris.';

        if (favourites.length > 0) {
            favSongs = favourites.map(song => (
                <Card
                    key={song.id}
                    song={song}
                />
            ));
        }

        return (
            <Aux>
                <SubTitle>Informations</SubTitle>
                <span>Bienvenue <b>{this.context.user.name}</b> !</span>
                <br />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <br />
                <SubTitle>Mes favoris</SubTitle>
                {favSongs}
            </Aux>
        );
    }
}

Board.contextType = AuthContext;

export default Board;