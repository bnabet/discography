import React, { Component } from 'react';

import { MODAL, BUTTONS } from '../../config';

class SongModal extends Component {
    render() {
        const { modal, songId, deleteSong, closeModal } = this.props;
        
        return (
            <div className="song-modal">
                <div className="modal-inner">
                    {modal.mode === MODAL.mode.alert &&
                        <div className="modal-icon tools-button tools-star"></div>
                    }

                    <span>{modal.title}</span>

                    {modal.mode === MODAL.mode.confirm &&
                        <div className="modal-actions">
                            <div className="modal-btn btn btn-default" onClick={() => deleteSong(songId)}>
                                {BUTTONS.confirmLabel}
                            </div>
                            <div className="modal-btn btn btn-default" onClick={closeModal}>
                                {BUTTONS.cancelLabel}
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default SongModal;