const express = require("express");
const cors = require("cors");
const connection = require("./connections/Config");
const userRouter = require("./routes/user.route");
const bookRouter = require("./routes/book.route");
const borrowRouter = require("./routes/borrowBook.route");
const dashboardRouter = require('./routes/dashboard.route'); 
const dotenv = require("dotenv");

const PORT = process.env.PORT  || 4000;
const app = express();
app.use(express.json());
app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)
app.listen(PORT, async () => {
  await connection;
  console.log("Connected to mongoDb");
  console.log(`Server is working at ${PORT}`);
});

app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/borrowBooks", borrowRouter); 
app.use('/dashboard', dashboardRouter);

