const fs = require("fs");

try {
  const productionEnvContent = fs.readFileSync("./production.env", "utf8");
  fs.writeFileSync("./.env", productionEnvContent, "utf8");

  console.log("production.env copied to .env successfully.");
} catch (err) {
  console.error("Error copying production.env to .env:", err);
}
