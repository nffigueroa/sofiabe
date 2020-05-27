import app from "./app.js";
import { middlewareInventory } from "./middleware/inventory.js";
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket: any) => {
  socket.on(
    "NewProductInventoryEventBE",
    middlewareInventory.insertProductIntoInventory
  );
});
const PORT = 3001;
http.listen(PORT, () => {
  console.log(`Running in http://localhost:${PORT}`);
});
