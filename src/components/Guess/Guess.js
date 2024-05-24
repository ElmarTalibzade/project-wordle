import React from 'react';
import Cell from "../Cell";

function Guess({guess}) {
    return (
        <div className="guess">
            {guess.map(({letter, status}, i) => (
                <Cell key={i} letter={letter} status={status}></Cell>
            ))}
        </div>
    );
}

export default Guess;
