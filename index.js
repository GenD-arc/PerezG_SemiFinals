//intantiation
//import express
const  express =  require('express'),
        app = express(),
        port = process.env.port || 6969 // PORT NUMBER
const moment = require('moment')

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.original} : ${moment().format()}`)
    next()

}

app.use(logger)
// import mysql

const mysql = require('mysql')

//connection to mysql

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"employee"
})

//initilization of connection

connection.connect()

app.get("/GET/products", (req,res) => {

    //create a query

    connection.query("SELECT * FROM userdata",(err, row, fields) =>{
        // checking error
        if(err) throw err;
        // response key value pair
        res.json(row)
    })
})

//req to frontend Read

app.get("/GET/products:id", (req,res) =>{

    const id =  req.params.id // 60

  //  res.send(id)

  connection.query(`SELECT * FROM userdata WHERE id  = ${id}`, (err, rows) => {

    if (err) throw err;

    if(rows.length > 0 ){
        res.json(rows)
    }else{
        res.status(400).json({msg: `${id} id not found`})
    }
  })
})

//  POST save in db CREATE

app.use(express.urlencoded({extended: false}))

app.post("/POST/products", (req,res) => {
    //const fname = req.body.fname, lname = req.body.lname, email = req.body.email, gender = req.body.gender
    const { fname, lname, email, gender } = req.body

    connection.query(`INSERT INTO userdata (first_name, last_name, email, gender) VALUE ('${fname}', '${lname}'  , '${email}', '${gender}')`, (err, rows, fields) => {

        if(err) throw err

        res.json({msg: `Saksespuli insirtid`})
    })
})




// PUT - UPDATE
/*
app.use(express.urlencoded({extended: false}))

app.put("/api/members", (req,res) => {

    const { fname, lname, email, gender,id } = req.body

    connection.query(`UPADATE userdata  SET first_name='${fname}', last_name= '${lname}', email='${email}', gender='${gender}' WHERE id = '${id}' `,  (err, rows, fields) => {

        if(err) throw err

        res.json({msg: `Saksespuli apdeytid`})
    })
}) 

*/


    app.use(express.urlencoded({extended: false}));

    app.put("/api/members", (req, res) => {

        const { fname, lname, email, gender, id } = req.body

      connection.query(

        `UPDATE userdata SET first_name='${fname}', last_name='${lname}', email='${email}', gender='${gender}' WHERE id='${id}'`,

        (err, rows, fields) => {

          if (err) throw err;

          res.json({ msg: `Successfully updated!` });
        }
      );
    });


app.listen(port, () =>{
    console.log(`Si server ay tumatakbo ${port}`)
})

app.use(express.urlencoded({extended: false}))

app.delete("/api/members",  (req,res) => {

    const id =  req.body.id
    connection.query(`DELETE FROM userdata WHERE id = '${id}'`, (err, rows, fields) => {
        if (err) throw err;
        res.json({ msg: `Saksespuli dileytid`});
    })
})
