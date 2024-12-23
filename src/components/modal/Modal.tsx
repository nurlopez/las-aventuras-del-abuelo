import React from "react";
import "./Modal.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
                {/* Wrap the children in a scrollable container */}
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
