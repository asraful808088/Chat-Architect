const searchbySort = require("./../../../../utility/search");
const getCondition = require("./../../../../get_for_client/conditions/actions");
function sortArrayByOrder(orderArray, inputArray) {
    const orderMap = new Map();
    orderArray.forEach((name, index) => orderMap.set(name, index));
    inputArray.sort((a, b) => {
        const orderA = orderMap.get(a.name) || Infinity;
        const orderB = orderMap.get(b.name) || Infinity;
        return orderA - orderB;
    });
    return inputArray;
}
function getConditions({ socket, msg }) {
  const getConditions = getCondition();
  const sortOfName  = getConditions?.map((element,index)=>{
    return element.name
  })
  const sortItems = searchbySort({
    wordsArray: sortOfName,
    text: msg.value,
  });
  const result  = sortArrayByOrder(sortItems,getConditions)
  socket.emit("search", {
    items: result,
    type: msg.type,
    id:msg.id
  });
}

module.exports = getConditions;
