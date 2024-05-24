import React from 'react';

import {sample} from '../../utils';
import {WORDS} from '../../data';

import styles from '../../styles.css';
import {MAX_LETTER_COUNT, NUM_OF_GUESSES_ALLOWED} from "../../constants";
import {checkGuess} from "../../game-helpers";
import Guess from "../Guess";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({answer});

function Game() {
    const [guessCount, setGuessCount] = React.useState(0);
    const [guessInput, setGuessInput] = React.useState('');
    const [guesses, setGuesses] = React.useState(Array(NUM_OF_GUESSES_ALLOWED).fill({
        letters: Array(MAX_LETTER_COUNT).fill({
            letter: undefined,
            status: undefined
        })
    }));

    console.log("Guesses", guesses);

    function submitGuess(e) {
        e.preventDefault();

        setGuessInput('');
        setGuessCount(guessCount + 1);
    }

    return (
        <>
            <div className={styles.guessResults}>
                {guesses.map((guess, i) => (
                    <Guess key={i} letters={guess.letters}/>
                ))}
            </div>

            <form className={styles.guessInputWrapper} onSubmit={submitGuess}>
                <label htmlFor="guess-input">Enter guess:</label>
                <input id="guess-input" type="text" value={guessInput} onChange={(e) => setGuessInput(e.target.value)}/>
            </form>
        </>
    );
}

export default Game;
