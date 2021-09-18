// Database connection
const mysql = require('mysql');
const db_credentials = require('../../creds/db_creds');
var connection = mysql.createPool(db_credentials);
let dbModel = {};



dbModel.person_academic_count = (callback) => {
    if (connection) {
        const sql = `
            SELECT * FROM person_academic_count`;

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
};


dbModel.area_amount_people = (callback) => {
    if (connection) {
        const sql = `
            select a.name as name_area, Count(pa.area) as amount_people from AREA a, PERSON_AREA pa
            where a.id = pa.area
            group by (pa.area)`;

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
};



module.exports = dbModel;