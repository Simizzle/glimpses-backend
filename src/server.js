require("./db/connection");
const express = require ("express");
const app = express();
const bodyParser = require ("body-parser");
const mongoose = require ("mongoose");
const cors = require ("cors");

const port = process.env.PORT || 5000;
const userRouter = require("./users/users.routes");

const postsRouter = require ("./posts/posts.routes");

app.use(express.json());
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use(userRouter);
app.use(postsRouter);


app.listen(port, ()=>{
  console.log(`Listening on port ${port}`);
});


mongoose.set('useFindAndModify', false);