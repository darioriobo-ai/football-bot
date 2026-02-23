const leagues = require("../config/leagues");
const { getTodayMatches } = require("../services/apiFootball");

async function buildDynamicLeagueButtons() {
  const keyboard = [];
  for (const [key, id] of Object.entries(leagues)) {
    const matches = await getTodayMatches(id);
    if (matches.length) {
      keyboard.push([{ text: matches[0].league.name, callback_data: `league_${key}` }]);
    }
  }
  return keyboard;
}

module.exports = { buildDynamicLeagueButtons };
