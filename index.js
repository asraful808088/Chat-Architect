const express = require("express");
const socketIo = require("./socket/init");
const http = require("http");
const app = express();
const server = http.createServer(app);
const cors = require("cors");
require("./socket/client/client");
app.use(cors());
socketIo({ server: server });
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
