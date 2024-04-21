export default function useTools() {
    /**
     *  xtrack means extrack 
     * 
     * 
     * 
     *  words xtracktor function 
     * 
     * 
     * 
     * 
     */
  function processText(text) {
    const singleLineText = text.replace(/\s+/g, " ");
    const singleSpaceText = singleLineText.replace(/\s+/g, " ");
    return singleSpaceText.trim();
  }
  function splitTextInfo(multilineText) {
    const cleanedText = multilineText.replace(/\s+/g, " ").trim();
    const words = cleanedText.split(" ");
    let startPosition = 0;
    let endPosition = 0;
    let sentence = 1;
    const wordInfoList = [];
    for (const word of words) {
      endPosition = startPosition + word.length;
      wordInfoList.push({
        startPosition,
        endPosition,
        word,
        cleanedText,
      });
      startPosition = endPosition + 1;
      if (word.endsWith(".") || word.endsWith("!") || word.endsWith("?")) {
        sentence++;
      }
    }

    return wordInfoList;
  }
  function xtrack_word_poistion(senetnce) {
    return splitTextInfo(processText(senetnce));
  }
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * clear Punctuation Around Word
 */


function cleanPunctuationAroundWord(inputWord) {
  const punctuationList = [',', '.', '/', '!', '?', ';', ':', '"', "'", '(', ')'];
  const regexPattern = new RegExp(`[${punctuationList.join('')}]$`, 'g');
  const cleanedWord = inputWord.replace(regexPattern, '');
  return cleanedWord;
}

  return { xtrack_word_poistion,cleanPunctuationAroundWord };
}
