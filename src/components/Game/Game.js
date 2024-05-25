import React, {useState} from 'react';
import {sample} from '../../utils';
import {WORDS} from '../../data';
import styles from '../../styles.css';
import {MAX_LETTER_COUNT, NUM_OF_GUESSES_ALLOWED} from "../../constants";
import {checkGuess} from "../../game-helpers";
import Guess from "../Guess";
import Banner from "../Banner";

const defaultGuesses = new Array(NUM_OF_GUESSES_ALLOWED).fill(new Array(MAX_LETTER_COUNT).fill({
    letter: '',
    status: '',
}));

function sampleAnswer() {
    // Pick a random word on every pageload.
    const answer = sample(WORDS);
    // To make debugging easier, we'll log the solution in the console.
    console.info({answer});

    return answer;
}

function Game() {
    const [outcome, setOutcome] = useState('');
    const [guessCount, setGuessCount] = React.useState(0);
    const [guessInput, setGuessInput] = React.useState('');
    const [guesses, setGuesses] = React.useState([...defaultGuesses]);
    const [answer, setAnswer] = React.useState(() => sampleAnswer());

    function resetGame() {
        setGuessCount(0);
        setGuessInput('');
        setGuesses([...defaultGuesses]);
        setOutcome('');
        setAnswer(sampleAnswer());
    }

    function submitGuess(e) {
        e.preventDefault();

        if (guessInput.length !== MAX_LETTER_COUNT) {
            return;
        }

        const newGuesses = [...guesses];
        newGuesses[guessCount] = checkGuess(guessInput, answer);

        const newGuessCount = guessCount + 1;
        setGuesses(newGuesses);
        setGuessInput('');
        setGuessCount(newGuessCount);

        if (guessInput === answer) {
            setOutcome('win')
            return;
        }

        if (newGuessCount >= NUM_OF_GUESSES_ALLOWED) {
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
                <input disabled={!!outcome} id="guess-input" type="text" value={guessInput}
                       onChange={(e) => setGuessInput(e.target.value.toUpperCase())}/>
            </form>
            <button onClick={resetGame}>Reset</button>

            <Banner outcome={outcome} guessCount={guessCount} correctAnswer={answer}/>
        </>
    );
}

export default Game;
