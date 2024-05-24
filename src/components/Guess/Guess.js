import React from 'react';
import Cell from "../Cell";
import styles from "../../styles.css";

function Guess({letters}) {
  console.log(letters)
  return (
    <div className={styles.guess}>
      {letters.map((letter, index) => (
          <Cell letter={letter} index={index} />
      ))}
    </div>
  );
}

export default Guess;
