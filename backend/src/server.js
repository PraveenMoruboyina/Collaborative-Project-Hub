require("dotenv").config();

const app = require("./app");

const PORT = parseInt(process.env.PORT, 10) || 4000;
const MAX_RETRIES = 10;

function startServer(port, attempt = 0) {
  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  server.on("error", (err) => {
    if (err && err.code === "EADDRINUSE" && attempt < MAX_RETRIES) {
      const nextPort = port + 1;
      console.warn(
        `Port ${port} in use, retrying on port ${nextPort} (attempt ${attempt + 1})`
      );
      setTimeout(() => startServer(nextPort, attempt + 1), 100);
    } else {
      console.error("Server failed to start:", err);
      process.exit(1);
    }
  });
}
console.log("JWT_SECRET:", process.env.JWT_SECRET);
startServer(PORT);