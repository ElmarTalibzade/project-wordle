import React from 'react';
import styles from '../../styles.css';

function Cell(status, letter) {
    return <div className={styles.cell}>{letter ?? ''}</div>;
}

export default Cell;
