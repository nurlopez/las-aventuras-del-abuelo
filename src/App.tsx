import React, { useEffect, useState } from "react";

import Board from "./components/board/Board";
import Dice from "./components/dice/Dice";
import Modal from "./components/modal/Modal";
import tilesData from "./data/tiles.json";

import papi from "./assets/old-explorer.webp";

import "./styles/App.css";

function App() {
    // States
    const [playerPosition, setPlayerPosition] = useState(1);
    // const [skipNextTurn, setSkipNextTurn] = useState(false);
    const [currentTileDescription, setCurrentTileDescription] = useState<string>("");
    const [currentTileEffect, setCurrentTileEffect] = useState<string | null | undefined>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    // Effects 

    useEffect(() => {
        const currentTile = tilesData.tiles.find(tile => tile.id === playerPosition);
        if (currentTile) {
            setCurrentTileDescription(currentTile.description);
            setCurrentTileEffect(currentTile.effect);
            setIsModalOpen(true);
        }
    }, [playerPosition]);

    // Methods
    const handleDiceRoll = (rollValue: number) => {
        // if (skipNextTurn) {
        //     // If we skip, we just show a message in the modal and do nothing else
        //     // setCurrentTileDescription("You skipped your turn!");
        //     setCurrentTileEffect(null);
        //     setIsModalOpen(true);
        //     setSkipNextTurn(false); // (multiplayer not available yet   )
        //     return;
        // }

        setPlayerPosition((prev) => Math.min(prev + rollValue, 80));
    };

    const handleTileEvent = (description: string, effect: string | null | undefined) => {
        // This will be triggered after the modal is closed
        if (effect) {
            const [action, value] = effect.split(":");
            switch (action) {
                case "forward":
                    setPlayerPosition((prev) => Math.min(prev + parseInt(value, 10), 80));
                    break;
                case "backward":
                    setPlayerPosition((prev) => Math.max(prev - parseInt(value, 10), 1));
                    break;
                case "skip":
                    break;
                case "finish":
                    // Show finishing message in a new modal
                    setCurrentTileDescription("Congratulations! You've completed the journey!");
                    setCurrentTileEffect(null);
                    setIsModalOpen(true);
                    break;
                default:
                    break;
            }
        }
    };

    const closeModal = () => {
        // After closing the modal, trigger the tile event
        const description = currentTileDescription;
        const effect = currentTileEffect;

        console.log('holi!! closeModal',description, effect);
        // Clear modal states
        setIsModalOpen(false);
        setCurrentTileDescription("");
        setCurrentTileEffect(null);

        // Call the tile event handler
        if (description) {
            handleTileEvent(description, effect);
        }
    };

    return (
        <div className="App">
            <div className="info-container" >
                <div>
                    <h1>Las aventuras del abuelo</h1>
                    <h2>En búsqueda del tucán perdido</h2>
                </div>

                <div>
                    <div className="dice-container">
                        <Dice onRoll={handleDiceRoll} />
                    </div>
                    <p>Current Position: {playerPosition}</p>
                </div>

                <img className='papi' src={papi} alt="papi" />
            </div>

            <div className="board-container">
                <Board playerPosition={playerPosition} />
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <p className="event-message">{currentTileDescription}</p>
            </Modal>
        </div>
    );
}

export default App;
