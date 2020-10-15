import app from "./app.js";
import { middlewareInventory } from "./middleware/inventory.js";
import { verifyToken } from "./middleware/token";
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket: any) => {
  socket.on("NewProductInventoryEventBE", async (msg: any) => {
    const response = await middlewareInventory.insertProductIntoInventory(
      msg,
      msg.headers["access-token"]
    );
    io.emit("NewProductInventoryEvent", response);
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
});
const PORT = 3001;
http.listen(PORT, () => {
  console.log(`Running in http://localhost:${PORT}`);
});
