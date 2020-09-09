import { Client } from "discord.js";
import { config } from "./config";
import { Game, Guess } from "./types";
import { average, random } from "./functions";

const chooser = new Client({ disableMentions: "everyone" }),
	guesser = new Client({ disableMentions: "everyone" });

let game: Game = {
	inProgress: false,
	number: 0,
	guessed: []
};

let guess: Guess = {
	min: 0,
	max: 0
};

chooser.on("message", msg => {
	if (msg.content.startsWith("/start")) {
		if (game.inProgress) return;
		let args = msg.content.split(" ");
		args.shift();
		let min: number = args[0] && !isNaN(Number(args[0])) ? Math.round(parseInt(args[0], 10)) : 0;
		let max: number = args[1] && !isNaN(Number(args[1])) ? Math.round(parseInt(args[1], 10)) : 5000;

		if (min > max) [min, max] = [max, min];

		if (min < 0) min = 0;
		if (max < 10) max = 10;

		if (min > 1000000) min = 1000000;
		if (max > 1000000000000) max = 1000000000000;

		game.number = random(min, max);
		game.guessed = [];
		game.inProgress = true;
		return msg.channel.send(`Game Started! I'm thinking of a number between **${min}** and **${max}** . . .`);
	}

	if (msg.author.id === guesser.user?.id && game.inProgress) {
		const guess: number = parseInt(msg.content, 10);
		game.guessed.push(guess);
		if (guess === game.number) {
			game.inProgress = false;
			return msg.channel.send(
				`Game Finished! Number **${game.number}** guessed correctly in \`${game.guessed.length}\` guesses!`
			);
		}
		return msg.channel.send(`The number is ${guess > game.number ? "lower" : "higher"} than \`${guess}\``);
	}
});

guesser.on("message", msg => {
	if (msg.author.id === chooser.user?.id) {
		if (msg.content.startsWith("Game Finished!")) return;

		if (msg.content.startsWith("Game Started!")) {
			const match = msg.content.match(/(?<=\*\*)\d+?(?=\*\*)/g);
			guess.min = parseInt((match as Array<string>)[0], 10);
			guess.max = parseInt((match as Array<string>)[1], 10);
		}

		let match = msg.content.match(/^The number is ([a-z]+?) than `(\d+)`$/);
		if (match) guess[match[1] === "higher" ? "min" : "max"] = parseInt(match[2], 10);

		return msg.channel.send(String(average(guess.min, guess.max)));
	}
});

chooser.on("ready", () => console.log(`${chooser.user?.tag} Connected!`));
guesser.on("ready", () => console.log(`${guesser.user?.tag} Connected!`));

chooser.login(config.token.chooser);
guesser.login(config.token.guesser);
