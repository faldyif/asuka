import 'module-alias/register';

import { env } from "./config/env";
env();
import { Discord } from "./botPlatform/discord";

const discordBotPlatform = new Discord();
discordBotPlatform.initializeClient();
