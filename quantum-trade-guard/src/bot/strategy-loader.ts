import fs from "fs";
import path from "path";

let strategies: any[] = [];

export function loadStrategies() {
  strategies = [];
  const dir = path.join(__dirname, "strategies");

  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith(".ts") && !file.endsWith(".js")) continue;

    delete require.cache[require.resolve(`${dir}/${file}`)];
    const mod = require(`${dir}/${file}`);

    if (mod.default) strategies.push(mod.default);
  }

  console.log("♻️ Strategies reloaded:", strategies.length);
  return strategies;
}

setInterval(loadStrategies, 5_000);
