import React from 'react';

function Banner({outcome, guessCount, correctAnswer}) {
    if (outcome === 'win') {
        return (
            <div className="happy banner">
                <p>
                    <strong>Congratulations!</strong> Got it in {' '}<strong>{guessCount} guesses</strong>.
                </p>
            </div>
        )
    }

    if (outcome === 'loss') {
        return (
            <div className="sad banner">
                <p>Sorry, the correct answer is <strong>{correctAnswer.toUpperCase()}</strong>.</p>
            </div>
        )
    }
}

export default Banner;
