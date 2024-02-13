const express = require("express");
const core = require("cors");
const mysql = require("mysql2");
const app = express();
const port = 3030;

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    port: 3306,
    database: "fetch_api"
})

app.use(core());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'static')));

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


app.get('/users', (req, res) => {
    connection.query("SELECT * FROM user_api", (err, result) => {
        if (err) {
            console.log('ไม่สามารถดึงข้อมูลได้', err);
        } else {
            // console.log(result);
            res.send(result);
        }
    })
    // res.send("Hello World");
})

app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    connection.query(`SELECT * FROM user_api WHERE id = ${id}`, (err, result) => {
        if (err) {
            console.log('ไม่สามารถดึงข้อมูลได้', err);
        } else {
            res.send(result);
        }
    })
})


// POST request to add a new user
// POST request to add a new user
app.post('/register', (req, res) => {
    const { firstname, lastname, username, password } = req.body;

    // Insert the new user into the user_api table
    connection.query('INSERT INTO user_api (firstname, lastname, username, password) VALUES (?, ?, ?, ?)', [firstname, lastname, username, password], (err, result) => {
        if (err) {
            console.error('Error:', err);
            return res.status(500).json({ error: 'Error inserting data' });
        }

        // Retrieve the newly added user and send it back as a JSON response
        connection.query('SELECT * FROM user_api WHERE id = ?', result.insertId, (err, rows) => {
            if (err) {
                console.error('Error:', err);
                return res.status(500).json({ error: 'Error retrieving data' });
            }
            res.json(rows[0]);
        });
    });
});

app.post('/login', (req,res) =>{
    const {username, password} = req.body;

    if(username && password){
        connection.query('SELECT * FROM user_api WHERE username = ? AND password = ?', [username, password], (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send(result);
                console.log('login สำเร็จ!!!');
                // response.redirect('/home'); //ส่งไปหน้า home
            }
        })
    }else{
        res.send({message: "กรุณากรอกข้อมูลให้ครบ"});
    }
})









app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})