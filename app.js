const express = require('express')
const app = express()
const mongo = require('mongodb'); 
const port = 4000
const cors = require('cors')
const bodyParser = require('body-parser')

//postgres
const pool = require('./db')

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

app.get('/', async(req, res) => { 
    const survey_data = await pool.query("TABLE surveydata;")
    res.send(survey_data.rows);
})


app.post('/',  async(req, res) => {
    const survey_data = await pool.query(`INSERT INTO surveydata(ctrl, q1, q2, q3, q4, date_added) VALUES(${req.body[0]}, '${req.body[1]}', '${req.body[2]}', '${req.body[3]}', '${req.body[4]}', clock_timestamp()) RETURNING *;`)
    res.send(survey_data.rows)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})