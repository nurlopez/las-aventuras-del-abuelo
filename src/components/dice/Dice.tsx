import React, { useState } from "react";
import "./Dice.css";

const Dice = ({ onRoll }: { onRoll: (value: number) => void }) => {
    const [diceValue, setDiceValue] = useState(1);

    const rollDice = () => {
        const value = Math.floor(Math.random() * 6) + 1; // Random number between 1 and 6
        setDiceValue(value);
        onRoll(value); // Pass value to parent
    };

    return (
        <div className="dice-container">
            <button onClick={rollDice}>Roll Dice</button>
            <div className="dice-face">🎲 {diceValue}</div>
        </div>
    );
};

export default Dice;
