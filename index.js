const options = require('./options.json');

const DiscordRPC = require('discord-rpc');
const rpc = new DiscordRPC.Client({transport: 'ipc'});

function setActivity(){

    const noel = Date.UTC(options.year, options.month, options.day, options.hour, options.minutes, options.seconds, 0);
    const now = Date.now();
    const difference = new Date(noel-now)

    const seconds = difference.getUTCSeconds();
    const minutes = difference.getUTCMinutes();
    const hours = difference.getUTCHours()-2;
    const days = difference.getUTCDate()-1;

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