import mysl from "mysql";


// conexao mysql 


export const db = mysl.createConnection({
    host: "localhost",
    user: "root",
    password: "info",
    database: "info"
});