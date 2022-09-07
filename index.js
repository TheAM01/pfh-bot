import client from "./Main/client.js";
import commandHandler from "./Main/handler.js";
import server from "./Main/server.js";

client.on('ready', (c) => {
    console.clear();
    console.log(`Logged in as ${c.user.username}!`);
    server()
});

client.on('interactionCreate', commandHandler)

client.login(process.env.TOKEN)