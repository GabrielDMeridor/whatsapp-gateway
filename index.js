const express = require("express");
const app = express();
app.use(express.json());

const ZOHO_WEBHOOK =
  "https://flow.zoho.com/912131107/flow/webhook/incoming?zapikey=1001.56c769d47f896eb2e1c40b7e10994afd.a2274256d8b8f6d8e9fba508500afc09";
const VERIFY_TOKEN = "deutschebot";

app.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  res.status(403).send("Forbidden");
});

app.post("/", async (req, res) => {
  const body = JSON.stringify(req.body);

  await fetch(ZOHO_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body,
  });

  res.status(200).send("OK");
});

app.listen(3000, () => console.log("Running on port 3000"));
