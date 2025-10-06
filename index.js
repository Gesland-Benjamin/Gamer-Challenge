import express from "express";
import session from "express-session";
import 'dotenv/config';
import { mainRouter } from "./app/routes/index.js";


const app = express();
const PORT = process.env.PORT;

app.set("views", "./app/views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.static("./public"));

app.use(
  session({
    secret: process.env.SESSION_SECRET, // clé secrète pour signer les cookies
    resave: false,                      // évite de forcer la sauvegarde
    saveUninitialized: false,           // évite de stocker des sessions vides
    cookie: {
      httpOnly: true,                   // empêche l’accès JS côté client
      secure: process.env.NODE_ENV === "production", // HTTPS obligatoire en prod
      maxAge: 1000 * 60 * 60,           // 1h
    },
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session; 
  next();
});

app.use(mainRouter);

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});