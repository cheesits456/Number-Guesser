import { Client } from "discord.js";
import { config } from "./config";

const chooser = new Client({ disableMentions: "everyone" }),
	guesser = new Client({ disableMentions: "everyone" });

chooser.on("message", msg => {
	if (msg.content === "ping") msg.reply("pong!");
});

guesser.on("message", msg => {
	if (msg.content.endsWith("pong!")) msg.reply("yeet!");
});

chooser.login(config.token.chooser);
guesser.login(config.token.guesser);
