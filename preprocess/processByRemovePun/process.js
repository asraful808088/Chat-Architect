function removePunctuation(sentence, punctuationArray =  [',', '.', '!', '?', ';', ':', '-', '_', '(', ')', '[', ']', '{', '}', '<', '>', '/', '|', '\\', '`', '~', '@', '#', '$', '%', '^', '&', '*', '+', '=']) {
    for (let i = 0; i < punctuationArray.length; i++) {
        const punctuation = punctuationArray[i];
        sentence = sentence.split(punctuation).join('');
    }
    return sentence;
}

module.exports  = removePunctuation