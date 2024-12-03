import React from 'react';
import tiles from '../data/tiles.json';

const Map = () => {
    return (
        <div>
            {tiles.tiles.map((tile) => (
                <div key={tile.id}>
                    Tile {tile.id}: {tile.description}
                </div>
            ))}
        </div>
    );
};

export default Map;
