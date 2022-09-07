import client from "./Main/client.js";
import commandHandler from "./Main/handler.js";

client.on('ready', (c) => {
    console.clear();
    console.log(`Logged in as ${c.user.username}!`);
});

client.on('interactionCreate', commandHandler)

client.login(process.env.TOKEN)