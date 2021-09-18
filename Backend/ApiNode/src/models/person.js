// Database connection
const mysql = require('mysql');
const db_credentials = require('../../creds/db_creds');
var connection = mysql.createPool(db_credentials);
let dbModel = {};



//Controlers
dbModel.login = (userData, callback) => {
    if (connection) {
        const sql = `
            SELECT * FROM PERSON
            WHERE username = ${connection.escape(userData.username)}
            AND password = ${connection.escape(userData.password)}
        `;

        connection.query(
            sql, (err, rows) => {
                console.log(rows);
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, rows);
                }
            }
        )
    }
    else {
        //console.log('NO CONECTO!');
    }
};


dbModel.existPerson = (userData, callback) => {
    if (connection) {
        const sql = `
            SELECT * FROM PERSON
            WHERE username = ${connection.escape(userData.username)}
        `;
        connection.query(
            sql, (err, rows) => {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, rows);
                }
            }
        )
    }
};


dbModel.signup = (userData, callback) => {
    if (connection) {
        connection.query(
            'INSERT INTO PERSON SET ?', userData,
            (err, result) => {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, {
                        'insertId': result.insertId
                    });
                }
            }
        )
    }
};


dbModel.updatePerson = (userData, callback) => {
    if(connection){
        const sql = `
            UPDATE PERSON SET
            password = ${connection.escape(userData.password)},
            name = ${connection.escape(userData.name)},
            last_name = ${connection.escape(userData.last_name)},
            phone = ${connection.escape(userData.phone)},
            address = ${connection.escape(userData.address)},
            birthday = ${connection.escape(userData.birthday)},
            other = ${connection.escape(userData.other)}
            WHERE id = ${connection.escape(userData.id)}
        `;
        
        connection.query(sql, (err, result) => {
            if(err){
                callback(null);
            }
            else{
                callback(null, {
                    status: true
                });
            }
        });
    }
};


dbModel.deletePerson = (id, callback) => {
    if (connection) {
        let sql = `
                DELETE FROM PERSON WHERE id = ${connection.escape(id)}
                `;
        connection.query( sql, (err, result) => {
            if (err) {
                callback(err);
            }
            else{
                callback(null, {
                    msg: 'deleted'
                })
            }
        });
    }
};


dbModel.getAllPersons = (callback) => {
    if (connection) {
        connection.query(
            `SELECT * FROM PERSON`, (err, result) => {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, result);
                }
            }
        );
    }
};



module.exports = dbModel;