import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Board from "../components/board/Board";
import Dice, { DiceRef } from "../components/dice/Dice";
import Modal from "../components/modal/Modal";
import tilesData from "../data/tiles.json";

import abuelo from "../assets/abuelo_writing.png";

import "./BoardGame.css";
import ReactMarkdown from "react-markdown";

function BoardGame() {
    // States
    const [targetPosition, setTargetPosition] = useState(1);
    const [displayPosition, setDisplayPosition] = useState(1);
    const [currentTileTitle, setCurrentTileTitle] = useState<string>("");
    const [currentTileDescription, setCurrentTileDescription] = useState<string>("");
    const [currentTileEffectText, setCurrentTileEffectText] = useState<string | undefined>(undefined);
    const [currentTileEffect, setCurrentTileEffect] = useState<string | null | undefined>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const diceRef = useRef<DiceRef>(null);

    // Token animation: step one tile toward target every 150ms, then open modal
    useEffect(() => {
        if (displayPosition === targetPosition) {
            const tile = tilesData.tiles.find(t => t.id === displayPosition);
            if (tile) {
                setCurrentTileTitle(tile.title);
                setCurrentTileDescription(tile.description);
                setCurrentTileEffectText(tile.effectDescription);
                setCurrentTileEffect(tile.effect);
                setIsModalOpen(true);
            }
            return;
        }
        const dir = targetPosition > displayPosition ? 1 : -1;
        const timer = setTimeout(() => setDisplayPosition(prev => prev + dir), 150);
        return () => clearTimeout(timer);
    }, [displayPosition, targetPosition]);

    // Methods
    const handleDiceRoll = (rollValue: number) => {
        setTargetPosition((prev) => Math.min(prev + rollValue, 100));
    };

    const handleTileEvent = useCallback((effect: string | null | undefined) => {
        if (effect) {
            const [action, value] = effect.split(":");
            switch (action) {
                case "forward":
                    setTargetPosition((prev) => Math.min(prev + parseInt(value, 10), 100));
                    break;
                case "backward":
                    setTargetPosition((prev) => Math.max(prev - parseInt(value, 10), 1));
                    break;
                case "skip":
                    break;
                case "finish":
                    break;
                default:
                    break;
            }
        }
    }, []);

    const closeModal = useCallback(() => {
        const effect = currentTileEffect;

        setIsModalOpen(false);
        setCurrentTileTitle("");
        setCurrentTileDescription("");
        setCurrentTileEffect(null);

        handleTileEvent(effect);
    }, [currentTileEffect, handleTileEvent]);

    // Keyboard navigation
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.code === "Escape" && isModalOpen) {
                closeModal();
            } else if ((e.code === "Space" || e.code === "Enter") && !isModalOpen && displayPosition === targetPosition) {
                e.preventDefault();
                diceRef.current?.roll();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isModalOpen, closeModal, displayPosition, targetPosition]);

    const isAnimating = displayPosition !== targetPosition;

    return (
        <div className="BoardGame">
            <div className="back-button">
                <Link to="/" className="back-link">⬅</Link>
            </div>
            <div className="info-container" >
                <div>
                    <p className="tag-title">Bukit Selidang</p>
                    <h2>"El Nido de donde proviene <br />la luz de la Luna"</h2>
                    <p className="subtitle">Travesía por la meseta del Usun Apau <br /> Sarawak, Borneo. 1992</p>
                </div>

                <div>
                    <Dice ref={diceRef} onRoll={handleDiceRoll} disabled={isModalOpen || isAnimating} />
                </div>

                <img className='abuelo' src={abuelo} alt="abuelo" />
            </div>

            <div className="board-wrapper">
                <Board playerPosition={displayPosition} />
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="event-message markdown-content">
                    <p className="journal-page-title">{currentTileTitle}</p>
                    <ReactMarkdown>{currentTileDescription}</ReactMarkdown>
                    {currentTileEffectText && (
                        <div className={`effect-badge${currentTileEffect ? ` effect-badge--${currentTileEffect.split(":")[0]}` : ""}`}>
                            <ReactMarkdown>{currentTileEffectText}</ReactMarkdown>
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
}

export default BoardGame;
