const leagues = require("./config/leagues");
const { getTodayMatches } = require("./services/apiFootball");
const { buildDynamicLeagueButtons } = require("./features/dynamicLeagues");
const { followMatch } = require("./features/followMatches");

function initBot(bot) {
  bot.onText(/\/start/, msg => {
    bot.sendMessage(msg.chat.id, "⚽ Bot de Fútbol PRO\nUsa /ligas");
  });

  bot.onText(/\/ligas/, async msg => {
    const keyboard = await buildDynamicLeagueButtons();
    if (!keyboard.length) {
      return bot.sendMessage(msg.chat.id, "❌ No hay partidos hoy");
    }
    bot.sendMessage(msg.chat.id, "🌍 Ligas con partidos hoy:", {
      reply_markup: { inline_keyboard: keyboard }
    });
  });

  bot.on("callback_query", async query => {
    const chatId = query.message.chat.id;
    const data = query.data;

    if (data.startsWith("league_")) {
      const key = data.replace("league_", "");
      const matches = await getTodayMatches(leagues[key]);

      for (const m of matches) {
        bot.sendMessage(
          chatId,
          `${m.teams.home.name} 🆚 ${m.teams.away.name}`,
          {
            reply_markup: {
              inline_keyboard: [[{
                text: "🔔 Seguir partido",
                callback_data: `follow_${m.fixture.id}`
              }]]
            }
          }
        );
      }
    }

    if (data.startsWith("follow_")) {
      followMatch(data.replace("follow_", ""), chatId);
      bot.answerCallbackQuery(query.id, { text: "✅ Alertas activadas" });
    }
  });
}

module.exports = { initBot };
