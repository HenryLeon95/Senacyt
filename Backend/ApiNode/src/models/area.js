// Database connection
const mysql = require('mysql');
const db_credentials = require('../../creds/db_creds');
var connection = mysql.createPool(db_credentials);
let dbModel = {};



dbModel.getAllArea = (callback) => {
    if (connection) {
        connection.query(
            `SELECT * FROM AREA`, (err, result) => {
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


dbModel.existArea = (areaData, callback) => {
    if (connection) {
        const sql = `
            SELECT * FROM AREA
            WHERE name = ${connection.escape(areaData.name)}
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


dbModel.addArea = (acaData, callback) => {
    if (connection) {
        connection.query(
            'INSERT INTO AREA SET ?', acaData,
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


dbModel.deleteTypeArea = (id, callback) => {
    if (connection) {
        let sql = `
                DELETE FROM AREA WHERE id = ${connection.escape(id)}
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


dbModel.addDetaAreaPer = (acaData, callback) => {
    if (connection) {
        connection.query(
            'INSERT INTO PERSON_AREA SET ?', acaData,
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


dbModel.deleteDetAreaPer = (person, area, callback) => {
    if (connection) {
        let sql = `
                DELETE FROM PERSON_AREA WHERE person = ${connection.escape(person)}
                and area = ${connection.escape(area)}
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


dbModel.updateArea = (acaData, callback) => {
    if(connection){
        const sql = `
            UPDATE AREA SET
            name = ${connection.escape(acaData.name)}
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



module.exports = dbModel;