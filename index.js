const DiscordRPC = require('discord-rpc');
const rpc = new DiscordRPC.Client({transport: 'ipc'});

function setActivity(){
    
    const noel = Date.UTC(2019, 12, 24, 19, 0, 0, 0);
    const now = Date.now();
    const difference = new Date(noel-now)

    const seconds = difference.getUTCSeconds();
    const minutes = difference.getUTCMinutes();
    const hours = difference.getUTCHours()-1;
    const days = difference.getUTCDate()-1;

    rpc.setActivity({
        details: `${days} days ${hours}h ${minutes}min ${seconds}s`,
        state:'Attends ses cadeaux',
        largeImageKey: 'kanna',
    });
}

rpc.on('ready', () => {
    console.log('Ready !');
    setActivity();

    setInterval(() => setActivity(), 1e3)
})

rpc.login({clientId: '658344804513611777'})