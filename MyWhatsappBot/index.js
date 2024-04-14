const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const { Client, RemoteAuth, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const { MongoStore } = require("wwebjs-mongo");

let store;
let client;

mongoose.connect(process.env.DATABASE_URI).then(() => {
  console.log("DB connected successfully");
  store = new MongoStore({ mongoose });
  client = new Client({
    authStrategy: new LocalAuth({
      store: store,
      backupSyncIntervalMs: 60000,
    }),
});

app.use(express.static('public'));

  client.on("ready", () => {
    console.log("Client is ready!");
  });

client.on('qr', async qr => {
    try {
        const qrDataURL = await qrcode.toDataURL(qr);
        io.emit('qr_code', qrDataURL);
        console.log(qr);
    } catch (error) {
        console.error('Error generating QR code data URL:', error);
    }
});

  client.on("message", async (message) => {
    const regex = /كل\s*سن[ةه]\s*و\s*انت\s*طيب/g;
    if (message.body === "hi") {
      message.reply("Hello! 👋");
    }
    if (message.body.match(regex)) {
      message.reply("وانت طيب يا حبيبي 😍");
    }

  });

  client.on("remote_session_saved", () => {
    console.log("remote_session_saved");
  });

  
client.initialize();
});

const server = app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

const io = require('socket.io')(process.env.REACT_APP_API_URL);
