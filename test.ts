import mysql from "mysql"

const connection = mysql.createConnection({
    host: "mariadb",
    user: "root",
    password: "",
    database: "nodedb",
})
connection.connect((error) => {
    if (error) {
        console.error("Error connecting to MySQL: ", error)
        return
    }

    console.log("Success connecting to MySQL")
})
