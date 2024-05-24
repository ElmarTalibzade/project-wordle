import React from 'react';
import Cell from "../Cell";
import styles from "../../styles.css";

function Guess({guess}) {
    return (
        <div className={styles.guess}>
            {guess.map(({letter, status}, i) => (
                <Cell key={i} letter={letter} status={status}></Cell>
            ))}
        </div>
    );
}

export default Guess;
