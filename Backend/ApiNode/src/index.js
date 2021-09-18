//Constant
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const app = express();



//Variables
var port = process.env.PORT || 4000;
var corsOptions = { origin: true, optionsSuccessStatus: 200 };



//Settings
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true, parameterLimit:50000 }));
app.set('port', port);
app.use(morgan('dev')); // Middlewares



//Routes
app.get('/', (req, res) => {
    res.status(200).json({ "msg": "Success" });
});



app.listen(app.get('port'), () => {
    console.log('Server on port ' + port);
});
/*
RUN ON CONSOLE
npm start
*/