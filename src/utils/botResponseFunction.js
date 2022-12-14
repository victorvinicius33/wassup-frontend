const stringSimilarity = require('string-similarity');
const botResponseData = require('./botResponseData');

module.exports = (input) => {
  const matches = stringSimilarity.findBestMatch(input, botResponseData.inputs);
  const { bestMatch, bestMatchIndex } = matches;

  return bestMatch.rating < 0.4 ? 'Desculpe, não entendi.' : botResponseData.outputs[bestMatchIndex];
}