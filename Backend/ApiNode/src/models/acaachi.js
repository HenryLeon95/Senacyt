// Database connection
const mysql = require('mysql');
const db_credentials = require('../../creds/db_creds');
var connection = mysql.createPool(db_credentials);
let dbModel = {};



dbModel.getAllAcaachi = (callback) => {
    if (connection) {
        connection.query(
            `SELECT * FROM ACAACHI`, (err, result) => {
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


dbModel.existTypeachi = (userData, callback) => {
    if (connection) {
        const sql = `
            SELECT * FROM TYPEACHI
            WHERE name = ${connection.escape(userData.name)}
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


dbModel.addTypeAchi = (acaData, callback) => {
    if (connection) {
        connection.query(
            'INSERT INTO TYPEACHI SET ?', acaData,
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


dbModel.deleteTypeAchi = (id, callback) => {
    if (connection) {
        let sql = `
                DELETE FROM TYPEACHI WHERE id = ${connection.escape(id)}
                `;
        connection.query(sql, (err, result) => {
            if (err) {
                callback(err);
            }
            else {
                callback(null, {
                    msg: 'deleted'
                })
            }
        });
    }
};


dbModel.addAcaAchi = (acaData, callback) => {
    if (connection) {
        connection.query(
            'INSERT INTO ACAACHI SET ?', acaData,
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


dbModel.addDetaAcaPer = (acaData, callback) => {
    if (connection) {
        connection.query(
            'INSERT INTO PERSON_TYPE SET ?', acaData,
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


dbModel.updateAcaachi = (acaData, callback) => {
    if(connection){
        const sql = `
            UPDATE ACAACHI SET
            type = ${connection.escape(acaData.type)},
            degree_date = ${connection.escape(acaData.degree_date)},
            title = ${connection.escape(acaData.title)},
            institution = ${connection.escape(acaData.institution)},
            other = ${connection.escape(acaData.other)}
            WHERE id = ${connection.escape(acaData.id)}
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


dbModel.deleteAcaAchi = (id, callback) => {
    if (connection) {
        let sql = `
                DELETE FROM ACAACHI WHERE id = ${connection.escape(id)}
                `;
        connection.query(sql, (err, result) => {
            if (err) {
                callback(err, {
                    msg: 'Not-deleted'
                });
            }
            else {
                callback(null, {
                    msg: 'deleted'
                })
            }
        });
    }
};



module.exports = dbModel;