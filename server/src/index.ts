import server from "./server";
import config from "config";

async function start() {
  try {
    const port = config.get<string>("port");

    server.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (e) {
    console.error(e);
  }
}

start();
