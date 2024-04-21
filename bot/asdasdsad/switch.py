def redirectConvSecounce(listOfConv):
    for item in listOfConv:
        if item["intent"] == "any":
            return {"brackIntent":item["brackIntent"],"iten":item}