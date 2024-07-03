const fs = require("fs");
const { Client, Collection, MessageEmbed } = require('discord.js');
const { TOKEN, PREFIX, GUILD_ID } = require('./config');

const client = new Client();
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
console.log(client.commands);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("mikoimanger", { type: "PLAYING" });

    const guild = client.guilds.cache.get(GUILD_ID);
    if (guild) {
        const command = client.commands.get('dm');
        if (command) {
            command.execute(client, { guild }, []);
        }
    }
});

client.on("guildCreate", guild => {
    if (guild.id === GUILD_ID) {
        const command = client.commands.get('dm');
        if (command) {
            command.execute(client, { guild }, []);
        }
    }
});

client.on('message', message => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;
    client.commands.get(command).execute(client, message, args);
});

client.login(TOKEN);
