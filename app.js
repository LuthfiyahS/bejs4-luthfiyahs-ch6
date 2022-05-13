const express = require("express");
const session = require('express-session')
const app = express();
const port = process.env.PORT || 3000;
const path = require('path')
const bodyParser = require("body-parser");

const passport = require("passport")
const flash = require("express-flash")
require("./middleware/passport-config")

//routes
const routerapi = require("./routes/api");
const routerview = require("./routes/view");
const AuthapiRouter = require("./routes/authApiRouter")
const AuthviewRouter = require("./routes/authViewRouter")

//docs
const swaggerJSON = require('./api_docs/swagger.json')
const YAML = require('yamljs')//generate postman
const swaggerDocument = YAML.load('./api_docs/collection.yaml')
const swaggerUI = require('swagger-ui-express')

//documentation
//app.use("/docs",swaggerUI.serve, swaggerUI.setup(swaggerJSON))//dari swagger langsung edit manual
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))//dari postman generate


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(flash());
app.use(session({
  secret: 'ini-rahasia',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

//set view engine
app.use('/static', express.static(path.join(__dirname, '/public')))
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use("/", routerview);
app.use("/api/v1", routerapi);
app.use(AuthapiRouter);
app.use(AuthviewRouter);

// handler for path 404 not found page
app.use((req, res, next) => {
    res.status(404).render("errors/404");
});

//app.listen(port, () => console.log(`Server Connent, run on port http://localhost:${port}`));

module.exports = app