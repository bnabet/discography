import React, { Component } from 'react';

import { usersRef, songsRef } from '../../firebase';
import { AuthContext } from '../../AuthContext';
import Filters from '../../components/Filters';
import List from '../../components/List';
import Wrapper from '../../hoc/Wrapper';
import { TABS } from '../../config';

import './style.css';

const classNames = require('classnames');

class Beats extends Component {
    state = {
        currentTab: 'all',
        currentFilter: 'recent',
        songs: []
    };

    getSongs = (userId) => {
        let favourites = [];

        usersRef.doc(userId)
            .get()
            .then(doc => {
                if (doc.exists) {
                    doc.data().songs.map(favourite => (
                        favourites.push(favourite)
                    ))
                }
            }).catch(error => {
                console.log("Error getting favourites songs:", error);
            })

		songsRef
			.get()
			.then(songs => {
				let tempSongs = [];
				songs.forEach(song => {
					const songObj = {
						id: song.id,
                        favourite: favourites.indexOf(song.id) > -1,
						...song.data()
					};
					tempSongs.push(songObj);
				});

				this.setState({ songs: tempSongs });
			})
			.catch(error => {
                console.log("Error getting songs: ", error);
            });
	};

    setTab = tab => {
        this.setState({
            currentTab: tab
        });
    }

    sortSongs = filter => {
        this.setState({
            currentFilter: filter
        });
    }

    renderTabs = () => {
        return (
            TABS.elements.map(tab => (
                <li
                    key={tab}
                    className={classNames("nav-item",
                        {active: tab === this.state.currentTab},
                        {highlight: tab === 'favoris'}
                    )}
                    onClick={() => this.setTab(tab)}
                >{tab}</li>
            ))
        );
    }

    componentDidMount() {
        this.getSongs(this.context.user.id);
    }
    
    render() {
        return (
            <Wrapper>
                <ul className="tabs-list">
                    {this.renderTabs()}
                </ul>
                <Filters sortSongs={this.sortSongs} />
                <List
                    user={this.context.user}
                    getSongs={this.getSongs}
                    songs={this.state.songs}
                    currentFilter={this.state.currentFilter}
                    currentTab={this.state.currentTab}
                />
            </Wrapper>
        );
    }
}

Beats.contextType = AuthContext;

export default Beats;