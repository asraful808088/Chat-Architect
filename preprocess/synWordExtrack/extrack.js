function checkWordsSyn (sent,objOfItems){
    const modifyitems = {...objOfItems}
    const  senToArray = sent.split(" ")
    for (let index = 0; index < senToArray.length; index++) {
        const element = senToArray[index];
        const lowerCaseWord = element.toLocaleLowerCase()
        for (let index2 = 0; index2 < Object.keys(modifyitems).length; index2++) {
            const lowerCaseWordFromObj  = Object.keys(modifyitems)[index2].toLocaleLowerCase()
            if (lowerCaseWord==lowerCaseWordFromObj) {
                modifyitems[Object.keys(modifyitems)[index2]] = [...new Set([...modifyitems[Object.keys(modifyitems)[index2]],element])]
                
            }else{
                for (const iterator of modifyitems[Object.keys(modifyitems)[index2]]) {
                    if (iterator.toLocaleLowerCase()==lowerCaseWord) {
                        modifyitems[Object.keys(modifyitems)[index2]] = [...new Set([...modifyitems[Object.keys(modifyitems)[index2]],element])]
                    }
                }
            }
            
        }
       

    }
    return modifyitems
}
module.exports = checkWordsSyn