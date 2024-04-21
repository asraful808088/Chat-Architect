function findAlternativeAndCount(sentence, wordSynonyms) {
  const process = {};
  const allWords = Object.keys(wordSynonyms);
  for (const iterator of allWords) {
    if (sentence.includes(iterator)) {
      process[iterator] = [...wordSynonyms[iterator], iterator];
    } else {
      for (const alterWord of wordSynonyms[iterator]) {
        if (sentence.includes(alterWord)) {
          process[alterWord] = [iterator, ...wordSynonyms[iterator]];
          break;
        }
      }
    }
  }
  return process;
}
function conbine(items, itemobj = [], itemsConbine = []) {
  const baseIndex = items[0];
  let newItensObj = [...itemobj];
  for (const item of baseIndex) {
    const withOutFristIndex = items.filter((element, index) => index != 0);
    const newItem = [...newItensObj, item];
    if (withOutFristIndex.length != 0) {
      conbine(withOutFristIndex, (itemobj = newItem), itemsConbine);
    } else {
      itemsConbine.push(newItem);
    }
  }
}

//sentence builder
function buildSentence(sent, items) {

  let processSentence = sent.split(" ");
  
  for (const iterator of items) {
    // iterator.mainKey, iterator.word
    processSentence = processSentence?.map((element)=>{
      if (element==iterator.mainKey) {
        return iterator.word
      }
      return element
    });
  }
  const processSent  =processSentence.join(" ")
  return processSent;
}

function crossBySyn(sentence, syn) {
  const findWordMap = findAlternativeAndCount(sentence, syn);
  const bundleOfWords = [];
  for (const key in findWordMap) {
    const bundleOfItem = [];
    if (Object.hasOwnProperty.call(findWordMap, key)) {
      const element = findWordMap[key];
      for (const iterator of element) {
        bundleOfItem.push({
          mainKey: key,
          word: iterator,
        });
      }
      bundleOfWords.push(bundleOfItem);
    }
  }
  if (bundleOfWords.length==0) {
      return []
  }
  const processItens = [];
  conbine(bundleOfWords, [], processItens);
  const processSentences = [];
  for (const item of processItens) {
    const processSentence = buildSentence(sentence, item);
    processSentences.push(processSentence);
  }
  return processSentences;
}
module.exports = crossBySyn;
