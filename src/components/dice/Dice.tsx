import React, { useState } from "react";
import "./Dice.css";

// Import all dice images
import dice1 from "../../assets/1_dice.png";
import dice2 from "../../assets/2_dice.png";
import dice3 from "../../assets/3_dice.png";
import dice4 from "../../assets/4_dice.png";
import dice5 from "../../assets/5_dice.png";
import dice6 from "../../assets/6_dice.png";

const Dice = ({ onRoll, disabled }: { onRoll: (value: number) => void; disabled?: boolean }) => {
    const [diceValue, setDiceValue] = useState(1);
    const [isRolling, setIsRolling] = useState(false);

    const rollDice = () => {
        if (isRolling || disabled) return;

        const finalValue = Math.floor(Math.random() * 6) + 1;
        setIsRolling(true);

        let cycles = 0;
        const interval = setInterval(() => {
            setDiceValue(Math.floor(Math.random() * 6) + 1);
            cycles++;
            if (cycles >= 10) {
                clearInterval(interval);
                setDiceValue(finalValue);
                onRoll(finalValue);
                setIsRolling(false);
            }
        }, 80);
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
                        className={`dice-image ${diceValue === value ? `visible${isRolling ? " rolling" : ""}` : "hidden"}`}
                    />
                ))}
            </div>
            <button
                className="dice-button"
                onClick={rollDice}
                disabled={isRolling || disabled}
            >
                Tirar el dado!
            </button>
        </div>
    );
};

export default Dice;
