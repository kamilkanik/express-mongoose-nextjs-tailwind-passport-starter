const next = require("next");
const express = require("express");
const expressSession = require("express-session");
const expressValidator = require("express-validator");
const mongoose = require("mongoose");
const mongoSessionStore = require("connect-mongo");
const passport = require("passport");
const logger = require("morgan");
const helmet = require("helmet");
const compression = require("compression");

/* Loads all variables from .env file to "process.env" */
require('dotenv').config({ path: '.env.local' });

/* Require our models here so we can use the mongoose.model() singleton to reference our models across our app */
require("./models/User.ts");

/* Require api routes */
const routes = require("./routes/index.ts");
const MongoStore = require("connect-mongo");

/* Require passport configuration */
require("./passport.ts");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();


/* Connect to MongoDB */
mongoose.connect( process.env.MONGODB_URI ).then(() => console.log("DB connected"));
mongoose.connection.on("error", err => { console.log(`DB connection error: ${err.message}`); });

app.prepare().then(() => {
  const server = express();

  if (!dev) {
    server.use(helmet());
    server.use(compression());
  }

  server.use(express.json());

  /* Give all Next.js's requests to Next.js server */
  server.get("/_next/*", (req, res) => { handle(req, res); });

  /* Handle static files */
  server.get("/static/*", (req, res) => { handle(req, res); });

  /* Apply our session configuration to express-session */
  server.use(expressSession({
    name: "next-connect.sid",
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI, ttl: 14 * 24 * 60 * 60 }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 14 // expires in 14 days
    }
  }));

   /* Add passport middleware to set passport up */
  server.use(passport.initialize());
  server.use(passport.session());

  server.use((req, res, next) => {
    /* custom middleware to put our user data (from passport) on the req.user so we can access it as such anywhere in our app */
    res.locals.user = req.user || null;
    next();
  });

  /* morgan for request logging from client
  - we use skip to ignore static files from _next folder */
  server.use(
    logger("dev", {
      skip: req => req.url.includes("_next")
    })
  );

  /* apply routes from the "routes" folder */
  server.use("/", routes);

  /* Error handling from async / await functions */
  server.use((err, req, res, next) => {
    const { status = 500, message } = err;
    res.status(status).json(message);
  });


  /* default route
     - allows Next to handle all other routes
     - includes the numerous `/_next/...` routes which must    be exposedfor the next app to work correctly
     - includes 404'ing on unknown routes
  */
  server.get('*', (req, res) => {
    return handle(req, res);
  })

  server.listen(port, (err) => {
    if (err) throw err;
    console.log("Listening on port: " + port);
  });
}).catch((err) => {
  if (err) throw err;
});;