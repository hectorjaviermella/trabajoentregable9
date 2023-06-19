import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
//import morgan from "morgan";

import { logger  } from "./utils/logger.js";
import { addLogger } from "./middlewares/addLogger.js";



import passport from "passport";
import initializePassport from "./auth/passport.js";
import __dirname from "./utils.js";
import database from "./db.js";
import config from "./config.js";

import sessionsRouter from "./routers/sessions.router.js";
import viewsRouter from "./routers/views.router.js";
import productsRouter  from "./routers/products.router.js";
import cartsrouter  from "./routers/carts.router.js";

import mailRouter from './routers/mail.router.js';
import loggerRouter from './routers/logger.router.js';

//manejador de errores
import errorHandler from "./middlewares/errors/index.js";

import socket from "./socket.js";
import mongoose from "mongoose";
//import { routerApi } from "./routers/index.js";

// initialization
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
//app.use(morgan("dev"));

app.use(addLogger);

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.dbUrl,
      ttl: 30,
    }),
    resave: true,
    saveUninitialized: false,
    secret: config.sessionSecret,
  })
);
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// view engine
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

// database connection
database.connect();

// routes
//routerApi(app);

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsrouter);
app.use("/api/sessions", sessionsRouter);
app.use("/", viewsRouter);
app.use("/mail", mailRouter);
app.use("/loggerTest", loggerRouter);

//manejador de errores
app.use(errorHandler);


const httpServer = app.listen(8080, (req,res) => {   
   logger.debug(`Server runing at port ${config.port}`);
});

socket.connect(httpServer);