import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});


const timestampHandler = (req, res) => {
  const dateParam = req.params.date;

  if (!dateParam) {
    const now = new Date();

    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }

  const date = /^\d+$/.test(dateParam)
    ? new Date(Number(dateParam))
    : new Date(dateParam);

  if (isNaN(date.getTime())) {
    return res.json({
      error: "Invalid Date"
    });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
};

app.get("/api", timestampHandler);

app.get("/api/:date", timestampHandler);


const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});