import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import firebase from 'firebase';
import { songsRef } from '../../firebase';
import Aux from '../../hoc/Aux';
import * as actionTypes from '../../store/actions';

import './style.css';

class SongForm extends Component {
    state = {
        editMode: false,
        selectedFile: undefined,
        title: '',
        speed: '',
        range: '',
        categories: [],
        url: '',
        progress: 0
	};

    onChange = event => {
        const target = event.target;
        const categories = this.state.categories;
        const check = event.target.checked;
        const value = target.value;
        const name = target.name;

        if (name === 'categories') {
            if (check) {
                this.setState({
                    categories: [...this.state.categories, value]
                });
            } else {
                var index = categories.indexOf(value);
                if (index > -1) {
                    categories.splice(index, 1);
                    this.setState({
                        categories: categories
                    });
                }
            }
        } else {
            this.setState({
                [name]: name === 'speed' ? parseFloat(target.value) : value
            });
        }
    }

    submitForm = event => {
        event.preventDefault();
        
        var file = this.state.selectedFile;

        if (file) {
            var storageRef = firebase.storage().ref();
            var fileRef = storageRef.child('songs/' + file.name);
            var uploadTask = fileRef.put(file);

            uploadTask.on('state_changed', snapshot => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                this.setState({
                    progress: progress.toFixed(0)
                });

                if (progress === 100) {
                    this.props.fileHandler(true);
                }

                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        console.log('Upload is running');
                        break;
                }
            }, error => {
                console.error("Error uploading media: ", error);
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL().then(newUrl => {
                    this.state.editMode
                        ? this.editSong(newUrl)
                        : this.addSong(newUrl);
                })
            });
        } else {
            this.editSong(this.state.url);
        }

    }

    addSong = url => {
        songsRef
            .add({
                title: this.state.title,
                speed: this.state.speed,
                range: this.state.range,
                categories: this.state.categories,
                createdAt: new Date(),
                url: url,
                file: this.state.selectedFile.name
            })
            .catch(error => {
                console.error("Error creating song: ", error);
            })
	}

    editSong = url => {
        songsRef
            .doc(this.state.id)
            .update({
                title: this.state.title,
                speed: this.state.speed,
                range: this.state.range,
                categories: this.state.categories,
                url: url
            })
            .then(() => (
                <Redirect to='/beats' />
            ))
    }

    selectFile = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    componentDidMount() {
        if (this.props.songToEdit !== undefined) {
            const songToEdit = this.props.songToEdit;

            this.setState({
                editMode: true,
                id: songToEdit.id,
                title: songToEdit.title,
                speed: songToEdit.speed,
                range: songToEdit.range,
                categories: songToEdit.categories,
                url: songToEdit.url
            });
        }
    }

    render() {
        return (
            <Aux>
                <form
                    className="editor-content"
                    onSubmit={event => this.submitForm(event)}
                >
                    <label className="form-label">Titre</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Song title"
                        className="editor-input"
                        onChange={this.onChange}
                        value={this.state.title}
                        required
                    />
                    <div className="editor-group">
                        <div className="editor-subGroup">
                            <label className="form-label">Vitesse</label>
                            <input
                                type="number"
                                name="speed"
                                placeholder="BPM"
                                className="editor-input"
                                onChange={this.onChange}
                                value={this.state.speed}
                                required
                            />
                        </div>
                        <div className="editor-subGroup">
                            <label className="form-label">Gamme</label>
                            <input
                                pattern="^(c|c#|d|d#|e|f|f#|g|g#|a|a#|b|C|C#|D|D#|E|F|F#|G|G#|A|A#|B).*$"
                                type="text"
                                name="range"
                                maxLength="2"
                                placeholder="Gamme"
                                className="editor-input"
                                onChange={this.onChange}
                                value={this.state.range}
                                required
                            />
                        </div>
                    </div>
                    <div className="editor-group">
                        <input
                            type="checkbox"
                            name="categories"
                            value="Trap"
                            onChange={this.onChange}
                            checked={this.state.categories.indexOf('Trap') > -1}
                        />
                        <label className="form-label checkbox-label">Trap</label>
                    </div>
                    <div className="editor-group">
                        <input
                            type="checkbox"
                            name="categories"
                            value="Old school"
                            onChange={this.onChange}
                            checked={this.state.categories.indexOf('Old school') > -1}
                        />
                        <label className="form-label checkbox-label">Old school</label>
                    </div>
                    <div className="editor-group">
                        <input
                            type="checkbox"
                            name="categories"
                            value="Others"
                            onChange={this.onChange}
                            checked={this.state.categories.indexOf('Others') > -1}
                        />
                        <label className="form-label checkbox-label">Autres</label>
                    </div>
                    <div className="editor-group">
                        <input type="checkbox"
                            name="categories"
                            value="Loops"
                            onChange={this.onChange}
                            checked={this.state.categories.indexOf('Loops') > -1}
                        />
                        <label className="form-label checkbox-label">Loops</label>
                    </div>
                    <div className="editor-group">
                        <input type="checkbox"
                            name="categories"
                            value="Melodies"
                            onChange={this.onChange}
                            checked={this.state.categories.indexOf('Melodies') > -1}
                        />
                        <label className="form-label checkbox-label">Mélodies</label>
                    </div>

                    {this.state.selectedFile &&
                        <div className="editor-selectedFile">
                            <label className="form-label">Fichier : </label>{this.state.selectedFile.name}
                        </div>
                    }

                    <div className="editor-wrapper">
                        <label htmlFor="file" className="editor-label btn btn-default">Choisir un fichier</label>
                        <input
                            type="file"
                            min="50" max="200"
                            id="file"
                            onChange={this.selectFile}
                        />
                        <button type="submit" className="editor-submit btn btn-default" disabled={(this.state.selectedFile === null) && !this.state.editMode}>{this.state.editMode ? 'Mettre à jour' : 'Ajouter'}</button>
                    </div>

                    {this.state.progress > 0 &&
                        <div className="editor-progress">
                            <div
                                className={"progress-bar progress-bar--" + this.state.progress}
                                style={{ width: this.state.progress + '%' }}
                            ></div>
                        </div>
                    }
                </form>
            </Aux>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddSong: (song) => dispatch({
            type: actionTypes.ADD_SONG,
            song: song
        })
    };
}

export default connect(null, mapDispatchToProps)(SongForm);
