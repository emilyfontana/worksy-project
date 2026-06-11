import mysql from "mysql2";

export const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "Epf100406!",
    database: "worksy"
});