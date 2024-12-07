import React from "react";
import tiles from "../../data/tiles.json";
import "./Board.css";

const Board = ({
    playerPosition,
}: {
    playerPosition: number;
}) => {
    return (
        <div className="board-container">
            {tiles.tiles.map((tile) => (
                <div
                    key={tile.id}
                    className={`tile ${tile.type} ${tile.id === playerPosition ? "active" : ""
                        }`}
                >
                    <span>{tile.id}</span>
                    {tile.id === playerPosition && (
                        <div
                            className="player-token"
                        >
                            🦧
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};


export default Board;
