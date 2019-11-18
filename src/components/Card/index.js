import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { songsRef } from '../../firebase';
import { AuthContext } from '../AuthContext';
import Player from '../Player';
import SongModal from '../SongModal';
import { ACTIONS, MODAL } from '../../config';
import './style.css';

const classNames = require('classnames');

class Card extends Component {
    state = {
        isFav: false,
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
                this.handleModal(MODAL.mode.alert, MODAL.message.favAdded);
                break;
            case ACTIONS.remove:
                this.props.removeFromBoard(song);
                this.handleModal(MODAL.mode.alert, MODAL.message.favRemoved);
                break;
            default:
                this.closeModal();
        }

        setTimeout(() => {
            this.closeModal();
        }, 1000)
    }

    closeModal = () => {
        this.setState({
            modal: {
                show: false
            }
        });
    }

    editSongHandler = song => {
        this.props.history.push({
            pathname: '/ajouter',
            songToEdit: song
        });
    }

    deleteSong = async (songId) => {
        await songsRef
            .doc(songId)
            .delete()
            .then(() => {
                console.log("Document successfully deleted!");
            }).catch(error => {
                console.error("Error removing document: ", error);
            })
    }

    getTime = time => {
        console.log(time, '%')
        // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({
            playerTime: time
        })
    }

    componentDidMount() {
        this.setState({ isFav: this.props.song.favourite });
    }

	render() {
        const { song, position } = this.props;
        const { modal } = this.state;

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
                                    onClick={(event) => song.favourite
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
                                    modal={this.state.modal}
                                    deleteSong={this.deleteSong}
                                    closeModal={this.closeModal}
                                    songId={this.props.song.id}
                                />
                            }
                        </div>
                    </div>
                </div>

                <div className="song-progress">
                    <div className="song-progress-bar" style={{ width: this.state.playerTime + '%' }}></div>
                </div>
            </li>
        );
	}
}

Card.contextType = AuthContext;

export default withRouter(Card);
