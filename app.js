const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

app.listen(process.env.PORT);

const userRouter = require("./routes/users.js");
const bookRouter = require("./routes/books.js");
const categoryRouter = require("./routes/category.js");
const cartRouter = require("./routes/carts.js");
const likeRouter = require("./routes/likes.js");
const orderRouter = require("./routes/orders.js");

app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/category", categoryRouter);
app.use("/carts", cartRouter);
app.use("/likes", likeRouter);
app.use("/orders", orderRouter);
