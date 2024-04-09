const dotenv = require("dotenv");
dotenv.config();
const { Client, RemoteAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const mongoose = require("mongoose");
const { MongoStore } = require("wwebjs-mongo");

let store;
let client;

mongoose.connect(process.env.DATABASE_URI).then(() => {
  console.log("DB connected successfully");
  store = new MongoStore({ mongoose });
  client = new Client({
    authStrategy: new RemoteAuth({
      store: store,
      backupSyncIntervalMs: 60000,
    }),
    // session: sessionCfg
  });

  client.on("ready", () => {
    console.log("Client is ready!");
  });

  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
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
