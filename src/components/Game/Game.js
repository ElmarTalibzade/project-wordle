import React from 'react';

import {sample} from '../../utils';
import {WORDS} from '../../data';

import styles from '../../styles.css';
import {MAX_LETTER_COUNT, NUM_OF_GUESSES_ALLOWED} from "../../constants";
import {checkGuess} from "../../game-helpers";
import Guess from "../Guess";
import guess from "../Guess";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({answer});

function Game() {
    const [guessCount, setGuessCount] = React.useState(0);
    const [guessInput, setGuessInput] = React.useState('');
    const [guesses, setGuesses] = React.useState(new Array(NUM_OF_GUESSES_ALLOWED).fill(new Array(MAX_LETTER_COUNT).fill({
        letter: '',
        status: '',
    })));

    function submitGuess(e) {
        e.preventDefault();

        if (guessInput.length !== MAX_LETTER_COUNT) {
            return;
        }

        if (guessCount + 1 < NUM_OF_GUESSES_ALLOWED) {
            // todo: handle this
        }

        const newGuesses = [...guesses];
        newGuesses[guessCount] = checkGuess(guessInput, answer);

        setGuesses(newGuesses);
        setGuessInput('');
        setGuessCount(guessCount + 1);
    }

    return (
        <>
            <div className={styles.guessResults}>
                {guesses.map((guess, i) => (
                    <Guess key={i} guess={guess}/>
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
