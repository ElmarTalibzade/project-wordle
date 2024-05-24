import React from 'react';

function Cell({letter, status}) {
    if (status) {
        return <div className={`cell ${status}`}>{letter}</div>;
    }

    return <div className="cell"></div>;
}

export default Cell;
