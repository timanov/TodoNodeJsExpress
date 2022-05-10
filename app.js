const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
app.use(cors())
app.use(bodyParser())

const conn = mysql.createConnection({
   host: 'localhost',
   user: 'mysql',
   password: 'mysql',
   database: 'todo'
})

conn.connect(err => {
   if(err) {
      console.log(err)
   }
   else{
      console.log('db connected')
   }


app.listen(8000, ()=> { console.log('app started')})

let dbData;
   conn.query('SELECT * FROM todolist', (err, result, field) => {
      dbData = result
   })

app.get('/', (req, res) => {
   res.send(dbData)
})

app.post('/', (req, res) => {
   let data = [req.body.id, req.body.task, req.body.isDone]
   conn.query('INSERT INTO `todolist`(`id`, `task`, `isDone`) VALUES (?, ?, ?)', data, (err, results, fields) => {
      !err ? res.json(results) : res.json(err)
   })
})

})