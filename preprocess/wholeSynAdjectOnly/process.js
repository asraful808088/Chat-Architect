

function replaceWords(sentence = "", wordSynonyms) {
    const sentenceList  = [] 
  const allWords = Object.keys(wordSynonyms);
  for (const iterator of allWords) {
    if (sentence.includes(iterator)) {
        let matchWord = iterator
        let fristSentence = sentence.replace(matchWord,iterator)
        sentenceList.push(fristSentence)
        for (const againItera of wordSynonyms[iterator]) {
            let rebuild = sentence.replace(matchWord,againItera)
            sentenceList.push(rebuild)
        }
        break;

    } else {
        let matchWord = ""
      for (const itemsOfMainWord of wordSynonyms[iterator]) {
        if (sentence.includes(itemsOfMainWord)) {
            matchWord = itemsOfMainWord
            let fristSentence = sentence.replace(matchWord,iterator)
            sentenceList.push(fristSentence)
            for (const againItera of wordSynonyms[iterator]) {
                let rebuild = sentence.replace(matchWord,againItera)
                sentenceList.push(rebuild)
            }
            break;
        }
      }
    }
  }
  return [...new Set(sentenceList)]
}

module.exports  = replaceWords
