import express from "express";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

// Enforce HTTPS
app.use((req, res, next) => {
  if (req.header("x-forwarded-proto") !== "https") {
    res.redirect(`https://${req.header("host")}${req.url}`);
  } else {
    next();
  }
});

// Serve static files from the React app
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "dist")));

app.use("/dummy-data", express.static(path.join(__dirname, "dummy-data")));

// All other requests return the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
