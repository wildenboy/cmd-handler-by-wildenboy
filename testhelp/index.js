const fs = require('fs');
let Discord = require("discord.js")
let client = new Discord.Client()

client.config = require('./config/bot.json');
client.commands = new Discord.Collection();

fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Loading event ${eventName} 🌚`);
        client.on(eventName, event.bind(null, client));
    });
});


fs.readdir('./commands/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Loading command ${commandName} 🌚`);
        client.commands.set(commandName, props);
    });
});

client.login(client.config.token_bot)
