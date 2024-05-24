import React, {useState} from 'react';
import {sample} from '../../utils';
import {WORDS} from '../../data';
import styles from '../../styles.css';
import {MAX_LETTER_COUNT, NUM_OF_GUESSES_ALLOWED} from "../../constants";
import {checkGuess} from "../../game-helpers";
import Guess from "../Guess";
import Banner from "../Banner";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({answer});

function Game() {
    const [outcome, setOutcome] = useState('');
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

        const newGuesses = [...guesses];
        newGuesses[guessCount] = checkGuess(guessInput, answer);

        setGuesses(newGuesses);
        setGuessInput('');
        setGuessCount(guessCount + 1);

        if (guessInput === answer) {
            setOutcome('win')
            return;
        }

        if (guessCount >= NUM_OF_GUESSES_ALLOWED) {
            setOutcome('loss')
        }
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
                <input id="guess-input" type="text" value={guessInput} onChange={(e) => setGuessInput(e.target.value.toUpperCase())}/>
            </form>

            <Banner outcome={outcome} guessCount={guessCount} correctAnswer={answer}/>
        </>
    );
}

export default Game;
