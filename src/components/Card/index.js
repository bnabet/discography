import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import firebase from 'firebase';
import { songsRef } from '../../firebase';
import { AuthContext } from '../../AuthContext';
import { ACTIONS, MODAL } from '../../config';
import Player from '../Player';
import SongModal from '../SongModal';

import './style.css';

const classNames = require('classnames');

class Card extends Component {
    state = {
        modal: {
            show: false,
            mode: '',
            title: ''
        },
        playerTime: 0
    };

    handleModal = (mode, title) => {
        this.setState({
            modal: {
                show: true,
                mode: mode,
                title: title
            }
        });
    }

    handleFavourite = (event, song, action) => {
        event.preventDefault();
        switch (action) {
            case ACTIONS.add:
                this.props.addToBoard(song);
                break;
            case ACTIONS.remove:
                this.props.removeFromBoard(song);
                break;
            default:
                break;
        }
    }

    closeModal = () => {
        this.setState({ modal: {show: false} });
    }

    editSongHandler = song => {
        this.props.history.push({
            pathname: '/editer',
            songToEdit: song
        });
    }

    deleteSong = song => {
        var storageRef = firebase.storage().ref();
        var fileRef = storageRef.child('songs/' + song.file);

        songsRef
            .doc(song.id)
            .delete()
            .then(() => {
                fileRef.delete();
                this.props.removeFromBoard(song);

                // Waiting redux store ...
                this.props.updateList(this.context.user.id);

                this.setState({ modal: {show: false} });
            }).catch(error => {
                console.error("Error removing document: ", error);
            })
    }

    getTime = time => {
        this.setState({ playerTime: time });
    }

	render() {
        const { song, position } = this.props;
        const { modal, playerTime } = this.state;

        return (
            <li className={classNames("songs-item", { "songs-item--favourite": song.favourite })}>
                <div className="song-area">
                    <div className="song-index column-index">
                        {position}
                    </div>

                    <div className="song-cover column-cover">
                        <Player src={song.url} handleTime={this.getTime} />
                    </div>

                    <div className="song-infos">
                        <div className="song-top">

                            <div className="song-title column-title">
                                {song.title}
                                <div className="song-artist">Ben Maker</div>
                            </div>

                            <div className="song-speed column-speed">{song.speed}</div>
                            <div className="song-note column-range">{song.range}</div>

                            <div className="song-labels">
                                {song.categories.join(', ')}
                            </div>

                            <div className="song-tools column-favourite">
                                <div
                                    className={classNames("tools-button tools-star", { "tools-star--active": song.favourite })}
                                    onClick={event => song.favourite
                                        ? this.handleFavourite(event, song, ACTIONS.remove)
                                        : this.handleFavourite(event, song, ACTIONS.add)
                                    }
                                ></div>
                            </div>
                            
                            {this.context.user.isAdmin &&
                                <div className="song-admin column-admin">
                                    <div className="tools-button tools-edit" onClick={() => this.editSongHandler(song)}></div>
                                    <div className="tools-button tools-delete" onClick={() => this.handleModal(ACTIONS.confirmAction, MODAL.message.deleteSong)}></div>  
                                </div>
                            }
                            
                            {modal.show &&
                                <SongModal
                                    modal={modal}
                                    deleteSong={this.deleteSong}
                                    closeModal={this.closeModal}
                                    song={song}
                                />
                            }
                        </div>
                    </div>
                </div>

                <div className="song-progress">
                    <div className="song-progress-bar" style={{ width: playerTime + '%' }}></div>
                </div>
            </li>
        );
	}
}

Card.contextType = AuthContext;

export default withRouter(Card);
