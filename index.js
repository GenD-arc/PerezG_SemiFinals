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
    host:"bxdrkxy24wkvrbyclpbt-mysql.services.clever-cloud.com",
    user:"uateqlsfqbji6hpv",
    password:"bWCnPfFeIHaBGsEGWe5b",
    database:"bxdrkxy24wkvrbyclpbt"
})

//initilization of connection

connection.connect()

app.get("/GET/products", (req,res) => {

    //create a query

    connection.query("SELECT * FROM product_info",(err, row, fields) =>{
        // checking error
        if(err) throw err;
        // response key value pair
        res.json(row)
    })
})

//req to frontend Read

app.get("/GET/products/:id", (req,res) =>{

    const id =  req.params.id

  connection.query(`SELECT * FROM product_info WHERE id  = ${id}`, (err, rows) => {

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

    const { itemName, unitPrice, quantity, supplier } = req.body

    connection.query(`INSERT INTO product_info (itemName, unitPrice, quantity, supplier) VALUE ('${itemName}', '${unitPrice}'  , '${quantity}', '${supplier}')`, (err, rows, fields) => {

        if(err) throw err

        res.json({msg: `Saksespuli insirtid`})
    })
})



app.listen(port, () =>{
    console.log(`Si server ay tumatakbo ${port}`)
})
