// const mapItems = {
//     "lala":["ola","name"],
//     "NaMe":["oasdla","papa"]
// }

// function checkWordsSyn (sent,objOfItems){
//     const modifyitems = {...objOfItems}
//     const  senToArray = sent.split(" ")
//     for (let index = 0; index < senToArray.length; index++) {
//         const element = senToArray[index];
//         const lowerCaseWord = element.toLocaleLowerCase()
//         for (let index2 = 0; index2 < Object.keys(modifyitems).length; index2++) {
//             const lowerCaseWordFromObj  = Object.keys(modifyitems)[index2].toLocaleLowerCase()
//             if (lowerCaseWord==lowerCaseWordFromObj) {
//                 modifyitems[Object.keys(modifyitems)[index2]] = [...new Set([...modifyitems[Object.keys(modifyitems)[index2]],element])]
                
//             }else{
//                 for (const iterator of modifyitems[Object.keys(modifyitems)[index2]]) {
//                     if (iterator.toLocaleLowerCase()==lowerCaseWord) {
//                         modifyitems[Object.keys(modifyitems)[index2]] = [...new Set([...modifyitems[Object.keys(modifyitems)[index2]],element])]
//                     }
//                 }
//             }
            
//         }
       

//     }
//     return modifyitems
// }

// console.log(checkWords(sent,mapItems))


const fs = require('fs');
const jwt = require('jsonwebtoken');

// Read the token from the file
const token = fs.readFileSync('token.txt', 'utf8').trim();

// Define your secret key, this should match the one used in Python
const SECRET_KEY = 'your_secret_key_here';

// Verify the token
jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
        console.error("Token verification failed:", err.message);
    } else {
        console.log("Decoded payload:", decoded);
    }
});
