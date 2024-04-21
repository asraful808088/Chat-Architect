const socketIO = require("socket.io");
const chatBot_build_profileHandler = require("./handler/chatBot_build_profile/main");
const search = require("./handler/search/main");
const scripts = require("./handler/scripts/main");
const condition = require("./handler/condition/main");
const intent = require("./handler/intent/main");
const synonyms = require("./handler/synonyms/main");
const response = require("./handler/response/main");
const build = require("./handler/build/main");
const traningData = require("../data/build/build");
const botOptions = require('./handler/botSelctionoptions/main')
const {storeRuningtask} = require('./../task/childProcess')
function socket({ server }) {
  const io = socketIO(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    socket.emit("connect_with_server");
    socket.emit("init", {
      buildRunning: traningData.buildRunning,
      buildWithServer: traningData.buildWithServer,
      traningInfo: traningData.traningInfo,
      activeBot:storeRuningtask.runningChatbot??null,

      storeBuildData:traningData.storeBuildData,
      storeLayerData:traningData.storeLayerData,


    });

    socket.on("chatBot_build_profile", (msg) =>
      chatBot_build_profileHandler(msg, socket)
    );
    socket.on("search", (msg) => search(msg, socket));
    socket.on("scripts", (msg) => scripts(msg, socket));
    socket.on("condition", (msg) => condition(msg, socket));
    socket.on("intent", (msg) => intent(msg, socket));
    socket.on("synonyms", (msg) => synonyms(msg, socket));
    socket.on("response", (msg) => response(msg, socket));
    socket.on("build", (msg) => build(msg, socket, io));
    socket.on("botOptions", (msg) => botOptions(msg, socket));
  });
}

module.exports = socket;
