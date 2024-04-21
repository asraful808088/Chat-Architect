const natural = require('natural')
function completelyRandomJoin(sentence) {
    var words = sentence.split(/\s+/);
    var currentIndex = words.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      temporaryValue = words[currentIndex];
      words[currentIndex] = words[randomIndex];
      words[randomIndex] = temporaryValue;
    }
    var result = words.join(" ");
    return result;
  }











  function foltSentenceGenerator(
    sentence,{
      simpleWrongTh=0.92,
      fewWrongTh=[0.83,0.9],
      fullWrongTh=0.75,
      generateFew=false,
      generateFull=false,
      generateSimple=false,
      simpleSentCount=100,
      fewSentCount=100,
      fullSentCount=100,
      simplefolttryCount =150000,
      fewfolttryCount =150000,
      fullfolttryCount =150000,
    }
  ) {
    const simpleWrong = [];
    const fewWrong = [];
    const fullWrong = [];
    let count = 0;
    let tryCount = 0;
   if (generateSimple) {
    while (count < simpleSentCount && tryCount < simplefolttryCount) {
        var inputSentence = sentence;
        var outputSentence = completelyRandomJoin(inputSentence);
        const jaroWinklerSimilarity = natural.JaroWinklerDistance(
          inputSentence,
          outputSentence
        );
        tryCount++;
        if (jaroWinklerSimilarity >=simpleWrongTh && sentence != outputSentence) { // 0.92
          count++;
          simpleWrong.push(outputSentence);
        }
      }
   }
    
    tryCount = 0;
  
    count = 0;



   if (generateFew) {
    while (count < fewSentCount && tryCount < fewfolttryCount) {
      // console.log(tryCount)
        var inputSentence = sentence;
        var outputSentence = completelyRandomJoin(inputSentence);
        const jaroWinklerSimilarity = natural.JaroWinklerDistance(
          inputSentence,
          outputSentence
        );
        tryCount++;
    
        if (
          jaroWinklerSimilarity >= fewWrongTh[0] &&
          jaroWinklerSimilarity <= fewWrongTh[1]&& // 0.83/ 0.9
          sentence != outputSentence
        ) {
          count++;
          fewWrong.push(outputSentence);
        }
      }
   }








    tryCount = 0;
    count = 0;




    if (generateFull) {
        while (count < fullSentCount && tryCount < fullfolttryCount) {
            var inputSentence = sentence;
            var outputSentence = completelyRandomJoin(inputSentence);
            const jaroWinklerSimilarity = natural.JaroWinklerDistance(
              inputSentence,
              outputSentence
            );
            tryCount++;
            
            if (jaroWinklerSimilarity <= fullWrongTh && sentence != outputSentence) { //0.75
              count++;
              fullWrong.push(outputSentence);
            }
          }
    }




    return {
      fewWrong,
      simpleWrong,
      fullWrong,
    };
  }


























module.exports = foltSentenceGenerator

