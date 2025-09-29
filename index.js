import express from "express";


import 'dotenv/config';

const app = express();
const PORT = process.env.PORT;

app.set("views", "./app/views");
app.set("view engine", "ejs");

app.use(express.static("./public"));

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});