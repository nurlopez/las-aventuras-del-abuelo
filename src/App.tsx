import { useState } from "react";
import Board from "./components/board/Board";
import Dice from "./components/dice/Dice";

function App() {
    const [playerPosition, setPlayerPosition] = useState(1);
    const [currentEvent, setCurrentEvent] = useState("");

    const handleDiceRoll = (rollValue: number) => {
        setPlayerPosition((prev) => Math.min(prev + rollValue, 40));
    };

    const handleTileEvent = (event: string) => {
        setCurrentEvent(event);
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
