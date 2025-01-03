import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Board from "../components/board/Board";
import Dice from "../components/dice/Dice";
import Modal from "../components/modal/Modal";
import tilesData from "../data/tiles.json";

import abuelo from "../assets/explorer_sitting.png";

import "./BoardGame.css";
import ReactMarkdown from "react-markdown";

function BoardGame() {
    // States
    const [playerPosition, setPlayerPosition] = useState(1);
    const [currentTileTitle, setCurrentTileTitle] = useState<string>("");
    const [currentTileDescription, setCurrentTileDescription] = useState<string>("");
    const [currentTileEffectText, setCurrentTileEffectText] = useState<string | undefined>(undefined);
    const [currentTileEffect, setCurrentTileEffect] = useState<string | null | undefined>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    // Effects 

    useEffect(() => {
        const currentTile = tilesData.tiles.find(tile => tile.id === playerPosition);
        if (currentTile) {
            setCurrentTileTitle(currentTile.title);
            setCurrentTileDescription(currentTile.description);
            setCurrentTileEffectText(currentTile.effectDescription);
            setCurrentTileEffect(currentTile.effect);
            setIsModalOpen(true);
        }
    }, [playerPosition]);

    // Methods
    const handleDiceRoll = (rollValue: number) => {
        setPlayerPosition((prev) => Math.min(prev + rollValue, 100));
    };

    const handleTileEvent = (description: string, effect: string | null | undefined) => {
        if (effect) {
            const [action, value] = effect.split(":");
            switch (action) {
                case "forward":
                    setPlayerPosition((prev) => Math.min(prev + parseInt(value, 10), 100));
                    break;
                case "backward":
                    setPlayerPosition((prev) => Math.max(prev - parseInt(value, 10), 1));
                    break;
                case "skip":
                    break;
                case "finish":
                    setCurrentTileEffect(null);
                    setIsModalOpen(true);
                    break;
                default:
                    break;
            }
        }
    };

    const closeModal = () => {
        const description = currentTileDescription;
        const effect = currentTileEffect;

        setIsModalOpen(false);
        setCurrentTileTitle("");
        setCurrentTileDescription("");
        setCurrentTileEffect(null);

        if (description) {
            handleTileEvent(description, effect);
        }
    };

    return (
        <div className="BoardGame">
            <div className="back-button">
                <Link to="/" className="back-link">⬅</Link>
            </div>
            <div className="info-container" >
                <div>
                    <p className="tag-title">Bukit Selidang</p>
                    <h2>“El Nido de donde proviene <br />la luz de la Luna”</h2>
                    <p className="subtitle">Travesía por la meseta del Usun Apau <br /> Sarawak, Borneo. 1992</p>
                </div>

                <div>
                    <div className="dice-container">
                        <Dice onRoll={handleDiceRoll} />
                    </div>
                    <p className="subtitle">Celda número: {playerPosition}</p>
                </div>

                <img className='abuelo' src={abuelo} alt="abuelo" />
            </div>

            <div className="board-container">
                <Board playerPosition={playerPosition} />
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="event-message markdown-content">
                    <p className="journal-page-title">{currentTileTitle}</p>
                    <ReactMarkdown>{currentTileDescription}</ReactMarkdown>
                    <ReactMarkdown className="markdown-tag">{currentTileEffectText}</ReactMarkdown>
                </div>
            </Modal>
        </div>
    );
}

export default BoardGame;
