//Constant
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Person = require('./models/person');
const Acaachi = require('./models/acaachi');
const Area = require('./models/area');
const Report = require('./models/report');



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
app.get('/getAllPersons', (req, res) => {
    Person.getAllPersons((err, data) => {
        res.status(200).json(data);
    });
});


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


//------------------------------------------------- TYPEACHI ---------------------------------------
app.get('/getAllAcaachi', (req, res) => {
    Acaachi.getAllAcaachi((err, data) => {
        res.status(200).json(data);
    });
});


app.post('/typeAchi', (req, res) => {
    const acaData = {
        name: req.body.name,
    };
    Acaachi.existTypeachi(acaData, (err, data) => {
        if (data.length > 0) {
            res.status(409).json({
                status: false,
                msg: 'ERROR! Academic Achievements already exists'
            });
        }
        else {
            Acaachi.addTypeAchi(acaData, (err, data) => {
                if (err) {
                    res.status(409).json({
                        status: false,
                        msg: 'ERROR addTypeAchi'
                    });
                }
                if (data && data.insertId) {
                    res.json({
                        status: true,
                        msg: 'Successfully added Academic achievements',
                        data: data
                    })
                }
                else {
                    console.log(err);
                    res.status(500).json({
                        success: false,
                        msg: 'Academic achievements already exists'
                    })
                }
            });
        }
    });
});


app.put('/typeAchi', (req, res) => {
    const acaData = {
        id: req.body.id,
        name: req.body.name
    };

    Acaachi.updateTypeAcaachi(acaData, (err, data) => {
        if (err) {
            res.status(409).json({
                status: false,
                msg: 'ERROR Update Type Academic achievements'
            });
        }
        if (data && data.status) {

            res.json({
                status: true,
                msg: 'Successfully update Type Academic achievements',
                data: data
            })
        }
        else {
            res.status(500).json({
                success: false,
                msg: 'Type Academic achievements not exists'
            })
        }
    });
});


app.delete('/typeAchi/:id', (req, res) => {
    Acaachi.deleteTypeAchi(req.params.id, (err, data) => {
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


app.post('/acaAchi', (req, res) => {
    const acaData = {
        type: req.body.type,
        degree_date: req.body.degree_date,
        title: req.body.title,
        institution: req.body.institution,
        other: req.body.other,
    };
    Acaachi.addAcaAchi(acaData, (err, data) => {
        if (err) {
            res.status(409).json({
                status: false,
                msg: 'ERROR addAcaAchi'
            });
        }
        else {
            if (data && data.insertId) {
                const detData = {
                    person: req.body.person,
                    acaachi: data.insertId,
                };
                Acaachi.addDetaAcaPer(detData, (err, data) => {
                    if (err) {
                        res.status(409).json({
                            status: false,
                            msg: 'ERROR addDetAcaPer'
                        });
                    }
                    if (data && data.insertId) {
                        res.json({
                            status: true,
                            msg: 'Successfully added Academic achievements Person',
                            data: data
                        })
                    }
                    else {
                        console.log(err);
                        res.json({
                            status: true,
                            msg: 'Successfully added Academic achievements Person',
                            data: data
                        })
                    }
                });
            }
            else {
                console.log(err);
                res.status(500).json({
                    success: false,
                    msg: 'Academic achievements already exists'
                })
            }
        }
    });
});


app.put('/acaAchi', (req, res) => {
    const acaData = {
        id: req.body.id,
        type: req.body.type,
        degree_date: req.body.degree_date,
        title: req.body.title,
        institution: req.body.institution,
        other: req.body.other
    };

    Acaachi.updateAcaachi(acaData, (err, data) => {
        if (err) {
            res.status(409).json({
                status: false,
                msg: 'ERROR Update'
            });
        }
        if (data && data.status) {
            res.json({
                status: true,
                msg: 'Successfully update Academic achievements',
                data: data
            })
        }
        else {
            res.status(500).json({
                success: false,
                msg: 'Academic achievements not exists'
            })
        }
    });
});


app.delete('/acaAchi/:id', (req, res) => {
    Acaachi.deleteAcaAchi(req.params.id, (err, data) => {
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


app.delete('/acaAchi/:person/:acaachi', (req, res) => {
    Acaachi.deleteDetAcaPer(req.params.person, req.params.acaachi, (err, data) => {
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


//------------------------------------------------- AREA ---------------------------------------
app.get('/getAllArea', (req, res) => {
    Area.getAllArea((err, data) => {
        res.status(200).json(data);
    });
});


app.post('/typeArea', (req, res) => {
    const areaData = {
        name: req.body.name,
    };
    Area.existArea(areaData, (err, data) => {
        if (data.length > 0) {
            res.status(409).json({
                status: false,
                msg: 'ERROR Area already exists'
            });
        }
        else {
            Area.addArea(areaData, (err, data) => {
                if (err) {
                    res.status(409).json({
                        status: false,
                        msg: 'ERROR Area'
                    });
                }
                if (data && data.insertId) {
                    res.json({
                        status: true,
                        msg: 'Successfully added Area',
                        data: data
                    })
                }
                else {
                    console.log(err);
                    res.status(500).json({
                        success: false,
                        msg: 'Area already exists'
                    })
                }
            });
        }
    });
});


app.delete('/typeArea/:id', (req, res) => {
    Area.deleteTypeArea(req.params.id, (err, data) => {
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


app.post('/Area', (req, res) => {
    const detData = {
        person: req.body.person,
        area: req.body.area,
    };
        Area.addDetaAreaPer(detData, (err, data) => {
            if (err) {
                res.status(409).json({
                    status: false,
                    msg: 'ERROR Area-Person'
                });
            }
            if (data && data.insertId) {
                res.json({
                    status: true,
                    msg: 'Successfully added Area-Person',
                    data: data
                })
            }
            else {
                res.json({
                    status: true,
                    msg: 'Successfully added Area-Person',
                    data: data
                })
            }
        });
});


app.delete('/Area/:person/:area', (req, res) => {
    Area.deleteDetAreaPer(req.params.person, req.params.area, (err, data) => {
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


app.put('/Area', (req, res) => {
    const areaData = {
        id: req.body.id,
        name: req.body.name,
    };

    Area.updateArea(areaData, (err, data) => {
        if (err) {
            res.status(409).json({
                status: false,
                msg: 'ERROR Update Area'
            });
        }
        if (data && data.status) {
            res.json({
                status: true,
                msg: 'Successfully update Area',
                data: data
            })
        }
        else {
            res.status(500).json({
                success: false,
                msg: 'Area not exists'
            })
        }
    });
});


//------------------------------------------------- REPORTS ---------------------------------------
app.get('/report1', (req, res) => {
    Report.person_academic_count((err, data) => {
        res.status(200).json(data);
    });
});

app.get('/report2', (req, res) => {
    Report.area_amount_people((err, data) => {
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