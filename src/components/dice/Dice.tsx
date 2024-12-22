import React, { useState } from "react";
import "./Dice.css";

// Import all dice images
import dice1 from "../../assets/1_dice.png";
import dice2 from "../../assets/2_dice.png";
import dice3 from "../../assets/3_dice.png";
import dice4 from "../../assets/4_dice.png";
import dice5 from "../../assets/5_dice.png";
import dice6 from "../../assets/6_dice.png";

const Dice = ({ onRoll }: { onRoll: (value: number) => void }) => {
    const [diceValue, setDiceValue] = useState(1);

    const rollDice = () => {
        const value = Math.floor(Math.random() * 6) + 1; // Random number between 1 and 6
        setDiceValue(value);
        onRoll(value); // Pass value to parent
    };

    // Map dice value to respective images
    const diceImages: { [key: number]: string } = {
        1: dice1,
        2: dice2,
        3: dice3,
        4: dice4,
        5: dice5,
        6: dice6,
    };

    return (
        <div className="dice-container">
            <div className="dice-images">
                {[1, 2, 3, 4, 5, 6].map((value) => (
                    <img
                        key={value}
                        src={diceImages[value]}
                        alt={`Dice showing ${value}`}
                        className={`dice-image ${diceValue === value ? "visible" : "hidden"}`}
                    />
                ))}
            </div>
            <button className="dice-button" onClick={rollDice}>Tirar el dado!</button>
        </div>
    );
};

export default Dice;
