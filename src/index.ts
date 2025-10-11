import "dotenv/config";
import express from "express";
import "./db";
import authRouter from '#/routes/auth'

const app = express();
const PORT = 8989;

// middleware for json and url encoding
app.use(express.json());
app.use(express.urlencoded({extended : false}))

app.use('/auth', authRouter)

app.listen(process.env.PORT || 8989, () => {
  console.log(">>>>>>SERVER IS LISTENING ON PORT " + PORT);
});
