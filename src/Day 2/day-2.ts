import { readFileSync } from 'fs';

enum FriendlyPlayValue {
    Rock = 'X',
    Paper = 'Y',
    Scissors = 'Z',
}

enum EnemyPlayValue {
    Rock = 'A',
    Paper = 'B',
    Scissors = 'C',
}

const WIN = 6;
const DRAW = 3;
const LOSS = 0;

const GetFriendlyScore = (play: string) => {
    return (
        1 + Object.values(FriendlyPlayValue).indexOf(play as FriendlyPlayValue)
    );
};

const GetGamesFromInput = () => {
    return readFileSync('./puzzle-input.txt', 'utf-8').split('\r\n');
};

const GetGameOutcome = (enemyPlay: string, friendlyPlay: string) => {
    const friendlySameValueCheck = Object.values(FriendlyPlayValue).indexOf(
        friendlyPlay as FriendlyPlayValue
    );
    const enemySameValueCheck = Object.values(EnemyPlayValue).indexOf(
        enemyPlay as EnemyPlayValue
    );

    if (friendlySameValueCheck === enemySameValueCheck) {
        return 0;
    }

    // If we play ROCK
    if (friendlyPlay === 'X') {
        // Enemy Paper
        if (enemyPlay === 'B') return -1;
        // Enemy Scissors
        if (enemyPlay === 'C') return 1;
    }
    // If we play PAPER
    else if (friendlyPlay === 'Y') {
        // Enemy Rock
        if (enemyPlay === 'A') return 1;
        // Enemy Scissors
        if (enemyPlay === 'C') return -1;
    }
    // If we play SCISSORS
    else if (friendlyPlay === 'Z') {
        // Enemy Rock
        if (enemyPlay === 'A') return -1;
        // Enemy PAPER
        if (enemyPlay === 'B') return 1;
    }
};

let scoreCounter = 0;

GetGamesFromInput().map((game) => {
    const friendlyScore = GetFriendlyScore(game[2]);
    const outcome = GetGameOutcome(game[0], game[2]);
    if (outcome === 1) {
        scoreCounter = scoreCounter + friendlyScore + WIN;
        console.log('WIN');
    } else if (outcome === 0) {
        scoreCounter = scoreCounter + friendlyScore + DRAW;
        console.log('DRAW');
    } else {
        scoreCounter = scoreCounter + friendlyScore + LOSS;
        console.log('LOSS');
    }
});

console.log('Score', scoreCounter);
