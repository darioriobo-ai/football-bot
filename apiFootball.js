const axios = require("axios");

const api = axios.create({
  baseURL: "https://v3.football.api-sports.io",
  headers: { "x-apisports-key": process.env.API_FOOTBALL_KEY }
});

const today = () => new Date().toISOString().split("T")[0];

async function getLiveMatches() {
  const res = await api.get("/fixtures?live=all");
  return res.data.response;
}

async function getTodayMatches(leagueId) {
  const res = await api.get(`/fixtures?date=${today()}&league=${leagueId}`);
  return res.data.response;
}

module.exports = { getLiveMatches, getTodayMatches };
