function generatePatternWithEntities(sentence, entityTypes, entityNames) {
    const entities = [];
    let startPosition = 0;
  
    for (let i = 0; i < entityNames.length; i++) {
      const name = entityNames[i];
      const type = entityTypes[i];
  
      const index = sentence
        .toLowerCase()
        .indexOf(name.toLowerCase(), startPosition);
      if (index !== -1) {
        const endPosition = index + name.toLowerCase().length - 1;
        entities.push([index, endPosition + 1, type,name]);
        startPosition = endPosition + 1;
      }
    }
  
    const pattern = [sentence, { entities }];
    return pattern;
  }
  function convertMultilineTextToArray(multilineText) {
    const arrayItems = multilineText?.split("\n")?.map((line) => line.trim());
    return arrayItems;
  }
  function processSentenceWithDelimiter(sentence) {
    const [textPart, arrayPart] = sentence.split("→").map((part) => part.trim());
    let arrayResult = arrayPart.split(",").map((item) => item.trim());
  
    const result = {
      originalSentence: textPart,
      arrayResult: [...arrayResult],
    };
  
    return result;
  }
  
  function useToProcessSentence(multilineText, entitiesSlots) {
    let listOftext = convertMultilineTextToArray(multilineText);
    let newlist = listOftext.filter((element) => element.length != 0);
    const builddata = [];
    for (const iterator of newlist) {
      const result = processSentenceWithDelimiter(iterator);
      const newArray = [];
      result.arrayResult.forEach((element) => {
        newArray.push(
          element.replace('"', "").replace('"', "").replace(".", "").toLowerCase()
        );
      });
      let setEntityList;
      try {
        if (!entitiesSlots[newArray.length]) {
          throw new Error("check you entities slots or divide sign");
        }
        setEntityList = entitiesSlots[newArray.length];
      } catch (error) {
        throw new Error("check you entities slots or divide sign");
      }
  
      const mainValue = generatePatternWithEntities(
        result.originalSentence.toLowerCase().replace('"', "").replace('"', ""),
        [...setEntityList],
        newArray
      );
  
      builddata.push(mainValue);
    }
    return builddata;
  }
  export default function useExtrackFromString() {
    return useToProcessSentence;
  }