var express = require('express');
var app = express();
var bodyParser = require('body-parser');

/** 7) Root-level Middleware - A logger */
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});


/** 11) Get ready for POST Requests - the `body-parser` */
app.use(bodyParser.urlencoded({ extended: false }));


/** 1) Meet the node console. */
console.log("Hello World");


/** 2) A first working Express Server */
// app.get("/", (req, res) => res.send("Hello Express"));


/** 3) Serve an HTML file */
const path = `${__dirname}/views/index.html`
app.get("/", (req, res) => res.sendFile(path));


/** 4) Serve static assets  */
app.use('/', express.static(`${__dirname}/public`));


/** 5) serve JSON on a specific route */
// app.get("/json", (req, res) => res.send({"message": "Hello json"}))

/** 6) Use the .env file to configure the app */
app.get("/json", (req, res) => res.send({"message": process.env.MESSAGE_STYLE=== "uppercase" ? "HELLO JSON" : "Hello json"}))


/** 8) Chaining middleware. A Time server */
app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res, next) => res.send({"time": req.time}));


/** 9)  Get input from client - Route parameters */
app.get('/:word/echo', (req, res, next) => res.send({echo: req.params.word}));


/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.route('/name').get((req, res, next) => {
    const {first, last} = req.query;
    res.send({ name : `${first} ${last}`});
  })
  /** 12) Get data form POST  */
  .post((req, res, next) => {
    const {first, last} = req.body;
    res.send({ name : `${first} ${last}`});
  });


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;
