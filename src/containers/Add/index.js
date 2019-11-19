import React, { Component } from 'react';
import { withRouter, Redirect, NavLink } from "react-router-dom";

import Aux from '../../hoc/Aux';
import SongForm from '../../components/SongForm/SongForm';
import SubTitle from '../../components/UI/SubTitle/SubTitle';

import './style.css';

class Add extends Component {
    state = {
        addedOrUpdated: false
	};

    handleForm = value => {
        this.setState({ addedOrUpdated: value });
    }

	render() {
        const { songToEdit } = this.props.location;

        console.log(songToEdit)
        
        let content = (
            <SongForm
                songToEdit={songToEdit}
                handleForm={this.handleForm}
            />
        );

        if (this.state.addedOrUpdated) {
            if (songToEdit) {
                return <Redirect to='/beats' />;
            }

            content = (
                <Aux>
                    <p>Son ajouté !</p>
                    <div>
                        <NavLink className="btn btn-default" to="/beats">Voir les beats</NavLink>
                        <div
                            className="btn btn-default"
                            onClick={() => this.setState({ addedOrUpdated: false })}
                        >Ajouter un autre son</div>
                    </div>
                </Aux>
            );
        }

		return (
            <Aux>
                <SubTitle>
                    {songToEdit ? 'Éditer le son' : 'Ajouter un nouveau son'}
                </SubTitle>
                {content}
            </Aux>
        );
	}
}

export default withRouter(Add);
