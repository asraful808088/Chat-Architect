// //
// const reuslt = removePun([
//   "its 01751234567: Check if payment is made.",
//   { entities: [[4, 15, "PHONE_NUMBER", "01751234567"],[17, 22, "PHONE_NUMBER", "Check"]] },
// ]);
// console.log(reuslt[0]);
// console.log(reuslt[1]);
// function removePun(element, removeItems = ["'","?"]) {
//   let entitesItems = element[1].entities;
//   const mainSent = element[0];
//   let newSent = "";
//   for (let index = 0; index < mainSent.length; index++) {
//     const singleLetter = mainSent[index];
//     if (removeItems.includes(singleLetter)) {
//       const newEntitiesUpdate = [];
//       for (const iterator of entitesItems) {
//         let startpoint = iterator[0];
//         let endpoint = iterator[1];
//         if (index <= startpoint) {
//           startpoint--;
//         }
//         if (index < endpoint) {
//           endpoint--;
//         }

//         newEntitiesUpdate.push([
//           startpoint,
//           endpoint,
//           iterator[2],
//           iterator[3],
//         ]);
//       }

//       entitesItems = newEntitiesUpdate;
//     } else {
//       newSent += singleLetter;
//     }
//   }
//   return [newSent, { entities: entitesItems }];
// }












// const demoText = "this is my name"

// function textBiSign(stringValue){
//       const biEffect = stringValue?.split("").map(()=>{


const datas = []

console.log(datas instanceof Array )