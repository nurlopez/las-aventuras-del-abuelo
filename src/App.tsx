import React, { useState } from "react";
import Board from "./components/board/Board";
import Dice from "./components/dice/Dice";

function App() {
    const [playerPosition, setPlayerPosition] = useState(1);
    const [currentEvent, setCurrentEvent] = useState("");
    const [skipNextTurn, setSkipNextTurn] = useState(false);

    const handleDiceRoll = (rollValue: number) => {
        if (skipNextTurn) {
            setCurrentEvent("You skipped your turn!");
            setSkipNextTurn(false);
            return;
        }

        setPlayerPosition((prev) => Math.min(prev + rollValue, 40));
    };

    const handleTileEvent = (description: string, effect: string | null | undefined) => {
        setCurrentEvent(description);

        if (effect) {
            const [action, value] = effect.split(":");
            switch (action) {
                case "forward":
                    setPlayerPosition((prev) => Math.min(prev + parseInt(value, 10), 40));
                    break;
                case "backward":
                    setPlayerPosition((prev) => Math.max(prev - parseInt(value, 10), 1));
                    break;
                case "skip":
                    setSkipNextTurn(true);
                    break;
                case "finish":
                    setCurrentEvent("Congratulations! You've completed the journey!");
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <div className="App">
            <h1>Las Aventuras del Abuelo</h1>
            <Board playerPosition={playerPosition} onTileEvent={handleTileEvent} />
            <Dice onRoll={handleDiceRoll} />
            <p>Current Position: {playerPosition}</p>
            {currentEvent && <p className="event-message">{currentEvent}</p>}
        </div>
    );
}

export default App;
