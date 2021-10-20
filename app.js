import express from "express";
import createError from "http-errors";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import logger from "morgan";
import mongoStore from "connect-mongo";
import rootRouter from "./routes/index";
import userRouter from "./routes/users";
import videoRouter from "./routes/video";
import { localsMiddleware } from "./Middleware/localsMiddleware";
import "dotenv/config";
import "./db";

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET_CODE,
    resave: false,
    saveUninitialized: false,

    cookie: {
      maxAge: Number(process.env.EXPIRED_TIME),
    },
    store: mongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use((req, res, next) => {
  req.sessionStore.all((error, sessions) => {
    next();
  });
});

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
