import { env } from "./config/env";
env();

import { Client, Message } from "discord.js";
import { token } from "./config/discord";
import { Peppy } from "./vendors/osuApi/peppy";

const startBot = () => {
    const client = new Client();

    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });
    client.on('message', (msg: Message) => {
        if (msg.content === 'ping') {
            msg.reply('Pong!');
        }
    });

    client.login(token);
};

// startBot();

const peppy = new Peppy();
peppy.getUserProfile();
