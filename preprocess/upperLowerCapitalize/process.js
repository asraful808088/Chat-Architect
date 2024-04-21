function convertCase(sentence,uppercase,lowercase,capitalize) {
    const listOfSent = [] 
    if (uppercase) {
        listOfSent.push(sentence.toUpperCase()) 
    }
    if (lowercase) {
        listOfSent.push(sentence.toLowerCase()) 
        
    }
    if (capitalize) {
        listOfSent.push(sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase()) 
        
    }
    return listOfSent;
}
module.exports = convertCase