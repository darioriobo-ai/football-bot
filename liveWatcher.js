const cron = require("node-cron");
const { getLiveMatches } = require("../services/apiFootball");
const { getFollowers } = require("./followMatches");

const cache = {};

function startLiveWatcher(bot) {
  cron.schedule("*/1 * * * *", async () => {
    const matches = await getLiveMatches();
    matches.forEach(m => {
      const id = m.fixture.id;
      const score = `${m.goals.home}-${m.goals.away}`;
      if (cache[id] && cache[id] !== score) {
        getFollowers(id).forEach(chatId => {
          bot.sendMessage(chatId, `⚽ GOOOL! ${m.teams.home.name} ${score} ${m.teams.away.name}`);
        });
      }
      cache[id] = score;
    });
  });
}

module.exports = { startLiveWatcher };
