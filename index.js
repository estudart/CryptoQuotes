import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const API_URL = "https://api.blockchain.com/v3/exchange";

const response = await axios.get(API_URL + "/symbols");
const symbols = Object.keys(response.data);

app.get("/", async (req, res) => {
  try {
    //console.log(symbols[2]);
    res.render("index.ejs", { symbols });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/get_data", async (req, res) => {
  try {
    console.log(req.query.crypto);
    const lastchosen = req.query.crypto;
    const response = await axios.get(API_URL + `/tickers/${req.query.crypto}`);
    const data = response.data;
    console.log(response.data);
    res.render("index.ejs", { data, symbols, lastchosen });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
