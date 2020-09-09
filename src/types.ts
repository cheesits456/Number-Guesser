interface Tokens {
	chooser: string;
	guesser: string;
}

interface Config {
	token: Tokens;
}

interface Game {
	inProgress: boolean;
	number: number;
	guessed: Array<number>;
}

interface Guess {
	min: number;
	max: number;
}

export { Config, Game, Guess };
