require("dotenv").config();
const { app, bot } = require("./server");
const { initBot } = require("./bot");
const { startLiveWatcher } = require("./features/liveWatcher");

initBot(bot);
startLiveWatcher(bot);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("⚽ Bot de fútbol corriendo con Webhooks");
});
