import React, { Component } from 'react';

import './style.css';

class Filters extends Component {
    state = {
        showFilters: false,
        filter: {
            mode: 'recent',
            label: 'Most recent'
        }
    };

    setFilter = (event, filter) => {
        this.setState({
            filter: {
                mode: filter.mode,
                label: event.target.textContent
            },
            showFilters: false
        });
        this.props.sortSongs(filter);
    }

    sortSongs = filter => {
        this.props.sortSongs(filter);
    }

    toggleFilters = () => {
        this.setState({ showFilters: true });
    }

	render() {
        const { filter, showFilters } = this.state;

		return (
			<div className="section-filters">
                <span className="filters-title">Filter by :</span>
                <div className="filters-list">
                    <div className="filters-selected" onClick={this.toggleFilters}>{filter.label}</div>
                    {showFilters &&
                        <ul className="filters-select">
                            <li className="select-option" onClick={(event) => this.setFilter(event, 'recent')}>Most recent</li>
                            <li className="select-option" onClick={(event) => this.setFilter(event, 'slow')}>Most slow</li>
                            <li className="select-option" onClick={(event) => this.setFilter(event, 'fast')}>Most fast</li>
                        </ul>
                    }
                </div>
            </div>
		);
	}
}

export default Filters;
