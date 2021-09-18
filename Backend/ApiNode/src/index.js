//Constant
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Person = require('./models/person');



//Variables
var port = process.env.PORT || 4000;
var corsOptions = { origin: true, optionsSuccessStatus: 200 };



//Settings
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true, parameterLimit: 50000 }));
app.set('port', port);
app.use(morgan('dev')); // Middlewares



//-------------------------------------------- Routes ----------------------------------------------
app.get('/', (req, res) => {
    res.status(200).json({ "msg": "Success" });
});

//------------------------------------------------- USERS ---------------------------------------
app.post('/login', (req, res) => {
    const userData = {
        username: req.body.username,
        password: req.body.password
    };

    Person.login(userData, (err, data) => {
        if (err) {
            res.status(409).json({
                status: false,
                msg: 'ERROR Login'
            });
        }
        if (data.length > 0) {
            res.status(200).json(data);
            // res.json({
            //     status: true,
            //     msg: 'File uploaded successfully'
            // });
        }
        else {
            res.status(409).json({
                status: false,
                msg: 'User not found'
            });
        }
    });
});


app.post('/signup', (req, res) => {
    const userData = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        address: req.body.address,
        birthday: req.body.birthday,
        other: req.body.other
    };

    Person.existPerson(userData, (err, data) => {
        if (data.length > 0) {
            res.status(409).json({
                status: false,
                msg: 'ERROR SignUp! Username already exists'
            });
        }
        else {
            Person.signup(userData, (err, data) => {
                if (err) {
                    res.status(409).json({
                        status: false,
                        msg: 'ERROR SignUp'
                    });
                }
                if (data && data.insertId) {
                    res.json({
                        status: true,
                        msg: 'Successfully registered User',
                        data: data
                    })
                }
                else {
                    console.log(err);
                    res.status(500).json({
                        success: false,
                        msg: 'User already exists'
                    })
                }
            });
        }
    });
});


app.put('/updatePerson', (req, res) => {
    const userData = {
        //id: req.params.id,
        id: req.body.id,
        password: req.body.password,
        name: req.body.name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        address: req.body.address,
        birthday: req.body.birthday,
        other: req.body.other
    };

        Person.updatePerson(userData, (err, data) => {
            if (err) {
                res.status(409).json({
                    status: false,
                    msg: 'ERROR Update'
                });
            }
            if (data && data.status) {
                
                res.json({
                    status: true,
                    msg: 'Successfully update User',
                    data: data
                })
            }
            else {
                res.status(500).json({
                    success: false,
                    msg: 'User not exists'
                })
            }
        });
});


app.delete('/deletePerson/:id', (req, res) => {
    Person.deletePerson(req.params.id, (err, data) => {
        if (data && data.msg === 'deleted' || data.msg === 'not exists') {
            res.json({
                success: true,
                data
            })
        }
        else {
            res.status(500).json({
                msg: 'Error'
            })
        }
    });
});



//------------------------------------------------- USERS ---------------------------------------
app.get('/getAllPersons', (req, res) => {
    Person.getAllPersons((err, data) => {
        res.status(200).json(data);
    });
});



app.listen(app.get('port'), () => {
    console.log('Server on port ' + port);
});
/*
RUN ON CONSOLE
npm start
*/