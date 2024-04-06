const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    auth: new LocalAuth({
        dataPath:'./auth.json'
    }),
    // session: sessionCfg

});

client.on('ready', () => {
    console.log('Client is ready!');
});


client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('message_create', message => {
    const regex=/كل\s*سن[ةه]\s*و\s*انت\s*طيب/g
	if (message.body === 'hi') {
        message.reply('Hello! 👋');
    }
    if (message.body.match(regex)) {
        message.reply('وانت طيب يا حبيبي 😍');
    }
});
client.initialize();
