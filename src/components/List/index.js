import React from 'react';

import firebase from 'firebase';
import { usersRef } from '../../firebase';
import Card from '../Card';

import './style.css';

const List = props => {
    const addToBoard = song => {
        usersRef.doc(props.user.id)
            .get()
            .then(snapshot => {
                if (snapshot.exists) {
                    usersRef.doc(props.user.id).update({
                        songs: firebase.firestore.FieldValue.arrayUnion(song.id)
                    })
                } else {
                    usersRef.doc(props.user.id).set({
                        songs: [song.id]
                    })
                }
                props.getSongs(props.user.id);
            })
            .catch(error => {
                console.error("Error adding star: ", error);
            })
    }

    const removeFromBoard = song => {
        usersRef
            .doc(props.user.id)
            .update({
                songs: firebase.firestore.FieldValue.arrayRemove(song.id)
            })
            .then(() => {
                props.getSongs(props.user.id);
            })
            .catch(error => {
                console.error("Error removing star: ", error);
            })
    }

    const renderSongs = () => {
        let sortedSongs = props.songs
            .sort((a, b) => {
                let temp;
                switch (props.currentFilter) {
                    case 'slow':
                        temp = a.speed - b.speed;
                        break;
                    case 'fast':
                        temp = b.speed - a.speed;
                        break;
                    default:
                        temp = a.createdAt - b.createdAt;
                }
                return temp;
            });

        let filteredSongs = sortedSongs
            .map((song, index) => {
                let temp;
                if ((song.categories.indexOf(props.currentTab) > -1)
                    || (props.currentTab === 'all')
                    || (props.currentTab === 'favoris' && song.favourite)) {
                    temp = (
                        <Card
                            key={song.id}
                            position={index + 1}
                            song={song}
                            addToBoard={addToBoard}
                            removeFromBoard={removeFromBoard}
                            updateList={updateList}
                        />
                    );
                }
                return temp;
            });

        return filteredSongs;
    }

    // Waiting redux store ...
    const updateList = userId => {
        props.getSongs(userId);
    }

    return (
        <ul className="section-songs">
            <li>
                <ul className="songs-labels">
                    <li className="labels-index column-index">#</li>
                    <li className="labels-title column-cover"></li>
                    <li className="labels-title column-title">Titre</li>
                    <li className="labels-speed column-speed">BPM</li>
                    <li className="labels-range column-range">Gamme</li>
                    <li className="labels-type column-type">Type</li>
                    <li className="labels-favourite column-favourite">Ajouter</li>
                    <li className="labels-admin column-admin">Admin</li>
                </ul>
            </li>
            {renderSongs()}
        </ul>
    )
}

export default List;