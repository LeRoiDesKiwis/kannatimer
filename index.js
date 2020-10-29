const options = require('./options.json');
const secConverter = require("seconds-converter")
const DiscordRPC = require('discord-rpc');
const rpc = new DiscordRPC.Client({transport: 'ipc'});

function setActivity(){

    const noel = new Date(options.year, options.month-1, options.day, options.hour, options.minutes, options.seconds, 0);
    const now = Date.now();
    const {days, hours, minutes, seconds} = secConverter(noel - now, "ms")

    rpc.setActivity({
        details: `${days} days ${hours}h ${minutes}min ${seconds}s`,
        state:`Attends ${options.waiting}`,
        largeImageKey: options.image,
    });
}

rpc.on('ready', () => {
    console.log('Ready !');
    setActivity();

    setInterval(setActivity, 1e3)
})

rpc.login({clientId: options.id})