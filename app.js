const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

app.listen(process.env.PORT);

const userRouter = require("./routes/users.js");
const bookRouter = require("./routes/books.js");
const cartRouter = require("./routes/carts.js");
const likeRouter = require("./routes/likes.js");
const orderRouter = require("./routes/orders.js");

app.use("/users", userRouter);
app.use("/carts", userRouter);
app.use("/likes", userRouter);
app.use("/orders", userRouter);
app.use("/books", userRouter);
