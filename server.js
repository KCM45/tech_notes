const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3500;
const { logger } = require("./middleware/logger");

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", require("./routes/root"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not found" });
  } else {
    res.type("text").send("404 Not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
