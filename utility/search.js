const natural = require('natural');

function calculateSimilarity(word, text) {
    const distance = natural.LevenshteinDistance(word, text);
    return distance;
}

function searchAndSortArrayWords({wordsArray, text}) {
    const sortedMatches = wordsArray.map(word => ({
        word,
        similarity: calculateSimilarity(word, text),
    }))
    .sort((a, b) => a.similarity - b.similarity)
    .map(item => item.word);

    return sortedMatches;
}

module.exports = searchAndSortArrayWords