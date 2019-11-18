import React, { Component } from 'react';
import { withRouter, NavLink } from "react-router-dom";

import SongForm from '../../components/SongForm/SongForm';
import SubTitle from '../../components/UI/SubTitle/SubTitle';
import Aux from '../../hoc/Aux';
import './style.css';

class Add extends Component {
    state = {
        fileUploaded: false
	};

    fileHandler = isUploaded => {
        this.setState({
            fileUploaded: isUploaded
        });
    }

    reset = () => {
        this.setState({
            fileUploaded: false
        });
    }

	render() {
        let content = (
            <Aux>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <SongForm
                    songToEdit={this.props.location.songToEdit}
                    fileHandler={this.fileHandler}
                />
            </Aux>
        );

        if (this.state.fileUploaded) {
            content = (
                <Aux>
                    <p>Song added !</p>
                    <div>
                        <NavLink className="btn-default" to="/beats">Go to beats page</NavLink>
                        <div className="btn-default" onClick={this.reset}>Add another song</div>
                    </div>
                </Aux>
            );
        }

		return (
            <Aux>
                <SubTitle>{this.props.location.songToEdit ? 'Éditer le son' : 'Ajouter un nouveau son'}</SubTitle>
                {content}
            </Aux>
        );
	}
}

export default withRouter(Add);
