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
	max: 5000
};

chooser.on("message", msg => {
	if (msg.content === "/start") {
		if (game.inProgress) return;
		game.number = random(0, 5000);
		game.guessed = [];
		game.inProgress = true;
		return msg.channel.send("Game Started! I'm thinking of a number between **0** and **5000** . . .");
	}

	if (msg.author.id === guesser.user?.id && game.inProgress) {
		const guess: number = parseInt(msg.content, 10);
		game.guessed.push(guess);
		if (guess === game.number) {
			game.inProgress = false;
			return msg.channel.send(`Game Finished! Number **${game.number}** guessed correctly in \`${game.guessed.length}\` guesses!`);
		}
		return msg.channel.send(`The number is ${guess > game.number ? "lower" : "higher"} than \`${guess}\``);
	}
});

guesser.on("message", msg => {
	if (msg.author.id === chooser.user?.id) {
		if (msg.content.startsWith("Game Finished!")) return;

		if (msg.content.startsWith("Game Started!")) {
			guess.min = 0;
			guess.max = 5000;
		}

		let match = msg.content.match(/^The number is ([a-z]+?) than `(\d+)`$/);
		if (match) guess[match[1] === "higher" ? "min" : "max"] = parseInt(match[2], 10);

		return msg.channel.send(String(average(guess.min, guess.max)));
	}
});

chooser.login(config.token.chooser);
guesser.login(config.token.guesser);
