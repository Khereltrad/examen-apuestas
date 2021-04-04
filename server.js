const express = require("express");
const session = require("express-session");
const flash =  require('connect-flash');
const app = express();
const path = require('path');
// const { Socket } = require("socket.io");
const port = 8000;

app
.use( express.json() )
.use( express.urlencoded({ extended: true }) )

.set('views',path.join(__dirname + '/views'))
.set('view engine', 'ejs')
.use(session({secret:'M11.n1.5am'}))
.use(flash())

.use(require('./routes/routes'))
.use(require('./routes/post'))

// .use(express.static(__dirname+"/public"))
.use('/public', express.static("public"));


const server = app.listen( port, () => console.log(`Server listening on port: ${port}`) );