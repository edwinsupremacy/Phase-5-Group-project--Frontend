import React from 'react';
import './ImageModal.css'; // Ensure your refined styles are saved in this CSS file

const ImageModal = ({ imageUrl, onClose }) => {
    if (!imageUrl) return null;

    return (
        <div className="image-modal-overlay" onClick={onClose}>
            <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
                <img src={imageUrl} alt="Large view" />
                <button className="close-button" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>
            </div>
        </div>
    );
};

export default ImageModal;
