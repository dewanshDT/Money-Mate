const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");
const Transaction = require("./models/Transaction");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const cookieParser = require("cookie-parser");
dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT || 5000;
const app = express();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to the database");
  })
  .catch((e) => {
    console.log("ERROR,", e);
  });

/************************************Middleware************************************/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin:  ["https://money-mate.herokuapp.com", "http://localhost:3000"], //location of react app we are using
    credentials: true,
  })
);

app.use(
  session({
    secret: "thisisafuckinsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000 * 7
    },
  })
);
app.use(cookieParser("thisisafuckinsecret"));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.send("not logged in");
  } else {
    next();
  }
};

const verifyUser = (req, res, next) => {
  if (req.params.username === req.user.username) {
    next();
  } else {
    res.send("invalid user");
  }
};

/************************************Routes************************************/

app.get(
  "/api/:username/transactions",
  isLoggedIn,
  verifyUser,
  async (req, res) => {
    try {
      const { username } = req.params;
      const transactions = await Transaction.findOne({ username: username });
      res.json(transactions);
    } catch (e) {
      res.send(e);
    }
  }
);

app.post(
  "/api/:username/transactions",
  isLoggedIn,
  verifyUser,
  async (req, res) => {
    const { username } = req.params;
    const { description, amount } = req.body;
    1;
    try {
      const transaction = await Transaction.findOne({ username: username });
      if (transaction) {
        await transaction.data.push({
          description: description,
          amount: amount,
        });
        await transaction.save();
        res.json(transaction);
      } else {
        const newTransaction = new Transaction({
          username: username,
          data: [{ description: description, amount: amount }],
        });
        await newTransaction.save();
        res.json(newTransaction);
      }
    } catch (e) {
      res.send(e);
    }
  }
);

app.delete(
  "/api/:username/transactions/:id",
  isLoggedIn,
  verifyUser,
  async (req, res) => {
    const { username, id } = req.params;
    try {
      const user = await Transaction.findOne({ username: username });
      const data = user.data;
      let newData = data.filter((item) => item._id != id);
      user.data = newData;
      await user.save();
      res.json(user);
    } catch (e) {
      res.send(e);
    }
  }
);

app.post(
  "/auth/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureMessage: "invalid username or password",
  }),
  (req, res) => {
    res.send(req.user.username);
  }
);

app.post("/auth/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({
      username,
    });
    const newUser = await User.register(user, password);
    req.login(newUser, (e) => {
      if (e) return next(e);
      res.send(username);
    });
  } catch (error) {
    res.send(error);
  }
});

app.post("/auth/logout", (req, res) => {
  req.logout();
  res.send("logged out successfully!");
});

// app.get("/", (req, res) => {
//   res.json({ message: "hello fuckin world", user: false });
// });

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.listen(
  PORT,
  console.log(`SERVER RUNNING IN ${process.env.NODE_ENV} MODE ON PORT ${PORT}`)
);
