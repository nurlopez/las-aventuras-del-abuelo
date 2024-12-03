import React from "react";
import tiles from "../../data/tiles.json";
import "./Board.css";

const Board = ({
    playerPosition,
    onTileEvent,
}: {
    playerPosition: number;
    onTileEvent: (description: string, effect: string | null | undefined ) => void;
}) => {
    return (
        <div className="board-container">
            {tiles.tiles.map((tile) => (
                <div
                    key={tile.id}
                    className={`tile ${tile.type} ${tile.id === playerPosition ? "active" : ""
                        }`}
                >
                    {tile.id === playerPosition && (
                        <div
                            className="player-token"
                            onClick={() => onTileEvent(tile.description, tile.effect)}
                        >
                            🧳
                        </div>
                    )}
                    <span>{tile.id}</span>
                    <p>{tile.description}</p>
                </div>
            ))}
        </div>
    );
};


export default Board;
