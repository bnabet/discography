import React, { Component } from 'react';
import { connect } from 'react-redux';

import firebase from 'firebase';
import { songsRef } from '../../firebase';
import * as actionTypes from '../../store/actions';
import Aux from '../../hoc/Aux';
import Input from '../UI/Input';

import './style.css';

class SongForm extends Component {
    state = {
        editMode: false,
        selectedFile: undefined,
        progress: 0,
        url: '',
        form: {
            title: {
                label: 'Titre',
                elementType: 'input',
                attributes: {
                    type: 'text',
                    placeholder: 'Titre',
                    className: 'editor-input'
                },
                value: '',
                validation: {
                    required: true
                }
            },
            speed: {
                label: 'Vitesse',
                elementType: 'input',
                attributes: {
                    type: 'number',
                    placeholder: 'BPM',
                    className: 'editor-input',
                    maxLength: 3
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1,
                    maxLength: 3
                }
            },
            range: {
                label: 'Gamme',
                elementType: 'input',
                attributes: {
                    type: 'text',
                    placeholder: 'C#',
                    className: 'editor-input',
                    maxLength: 2
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1,
                    maxLength: 2,
                    pattern: "^(c|c#|d|d#|e|f|f#|g|g#|a|a#|b|C|C#|D|D#|E|F|F#|G|G#|A|A#|B).*$"
                }
            },
            categories: {
                label: 'Catégories',
                elementType: 'input',
                attributes: {
                    type: 'checkbox',
                    options: [
                        { value: 'trap', displayValue: 'Trap', checked: false },
                        { value: 'old school', displayValue: 'Old school', checked: false },
                        { value: 'others', displayValue: 'Others', checked: false }
                    ]
                },
                value: [],
                validation: {}
            }
        }
	};

    onChange = (event, input) => {
        const updatedForm = {
            ...this.state.form
        };
        const updatedFormElement = {
            ...updatedForm[input.id]
        };
        if (input.id === 'categories') {
            updatedFormElement.attributes.options.map(option => {
                if (event.target.value === option.value) {
                    option.checked = !option.checked;
                }
                return option;
            })
        } else {
            updatedFormElement.value = (input.id === 'speed')
                ? parseFloat(event.target.value)
                : event.target.value;
        }
        updatedForm[input.id] = updatedFormElement;

        this.setState({ form: updatedForm });
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
                    this.props.handleForm(true);
                }

                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        console.log('Upload is running');
                        break;
                    default:
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
        const selectedCategories = this.state.form.categories.attributes.options
            .filter(option => option.checked);

        const newCategories = selectedCategories.map(category => category.value);

        songsRef
            .add({
                title: this.state.form.title.value,
                speed: this.state.form.speed.value,
                range: this.state.form.range.value,
                categories: newCategories,
                createdAt: new Date(),
                url: url,
                file: this.state.selectedFile.name
            })
            .catch(error => {
                console.error("Error creating song: ", error);
            })
	}

    editSong = url => {
        const selectedCategories = this.state.form.categories.attributes.options
            .filter(option => option.checked);

        const newCategories = selectedCategories.map(category => category.value);

        songsRef
            .doc(this.state.id)
            .update({
                title: this.state.form.title.value,
                speed: this.state.form.speed.value,
                range: this.state.form.range.value,
                categories: newCategories,
                url: url
            })
            .then(() => (
                this.props.handleForm(true)
            ))
    }

    selectFile = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    renderFormElements = () => {
        const formElements = [];
        for (let key in this.state.form) {
            formElements.push({
                id: key,
                config: this.state.form[key]
            });
        }

        return (
            formElements.map(formElement => {
                return (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        label={formElement.config.label}
                        attributes={formElement.config.attributes}
                        value={formElement.config.value}
                        onChange={event => this.onChange(event, formElement)}
                        required
                    />
                )
            })
        );
    }

    componentDidMount() {
        if (this.props.songToEdit !== undefined) {
            const songToEdit = this.props.songToEdit;

            this.setState({
                editMode: true,
                id: songToEdit.id,
                url: songToEdit.url,
                form: {
                    ...this.state.form,
                    title: { ...this.state.form.title, value: songToEdit.title },
                    speed: { ...this.state.form.speed, value: songToEdit.speed },
                    range: { ...this.state.form.range, value: songToEdit.range },
                    categories: {
                        ...this.state.form.categories,
                        attributes: {
                            ...this.state.form.categories.attributes,
                            options: this.state.form.categories.attributes.options.map(option => {
                                return {
                                    ...option,
                                    checked: songToEdit.categories.indexOf(option.value) > -1
                                }
                            })
                        }
                    }
                }
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

                    {this.renderFormElements()}

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
                        <button
                            type="submit"
                            className="editor-submit btn btn-default"
                            disabled={(this.state.selectedFile === null) && !this.state.editMode}
                        >
                            {this.state.editMode ? 'Mettre à jour' : 'Ajouter'}
                        </button>
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
