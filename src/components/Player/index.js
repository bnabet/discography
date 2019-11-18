import React, { Component } from 'react';

import './style.css';

var classNames = require('classnames');

const audio = new Audio();

class Player extends Component {
    state = {
        currentTime: 0,
        playing: false
    }

    togglePlayer = () => {
        audio.src = this.props.src;
        this.setState({
            playing: !this.state.playing
        }, () => {
            this.state.playing ? this.handlePlay() : this.handlePause();
        });

        audio.onended = () => {
            this.setState({
                playing: false
            });
        }
    }

    handlePlay = () => {
        let totalTime = 0;
        let percentTime = 0;

        audio.play();
        audio.onloadedmetadata = () => {
            totalTime = audio.duration;
        }

        this.currentTimeInterval = setInterval(() => {
            this.setState({
                currentTime: audio.currentTime
            });

            percentTime = (audio.currentTime / totalTime) * 100;
            this.props.handleTime(percentTime);
        }, 500)

        if (this.state.currentTime !== 0) audio.currentTime = this.state.currentTime;
    }

    handlePause = () => {
        audio.pause();
        clearInterval(this.currentTimeInterval);
    }

    componentWillUnmount = () => {
        this.handlePause();
    }

	render() {
        const { playing } = this.state;

		return (
			<figure className="song-figure">
                <button
                    type="button"
                    className={classNames("audiobutton", { "audiobutton--pause": playing })}
                    onClick={this.togglePlayer}
                ></button>
            </figure>
		);
	}
}

export default Player;
