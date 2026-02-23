const followed = {};

function followMatch(fixtureId, chatId) {
  if (!followed[fixtureId]) followed[fixtureId] = new Set();
  followed[fixtureId].add(chatId);
}

function getFollowers(fixtureId) {
  return followed[fixtureId] ? [...followed[fixtureId]] : [];
}

module.exports = { followMatch, getFollowers };
