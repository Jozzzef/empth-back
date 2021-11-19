require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');
var os = require("os");

//postgres
const { Pool } = require('pg');
const pool = new Pool(); //use env var: PGHOST = db | localhost (db is for production for the docker compose)

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.options('*', cors());

// init table if it does not exist
const create_table = " \
  CREATE TABLE IF NOT EXISTS surveydata( \
  id serial primary key, \
  ctrl boolean, \
  q1 text, \
  q2 text, \
  q3 text, \
  q4 text, \
  date_added timestamp default NULL \
); \
";
pool.query(create_table)

//REST
app.get('/', async(req, res) => {
  try{ 
    const survey_data = await pool.query("TABLE surveydata;");
    res.send(survey_data.rows);
  }
  catch (err) {res.send("err")}
})

app.post('/',  async(req, res) => {
    const survey_data = await pool.query(`INSERT INTO surveydata(ctrl, q1, q2, q3, q4, date_added) VALUES(${req.body[0]}, '${req.body[1]}', '${req.body[2]}', '${req.body[3]}', '${req.body[4]}', clock_timestamp()) RETURNING *;`)
    res.send(survey_data.rows)
})

app.listen(port, () => {
  console.log(`app at ${os.hostname()}:${port}`)
})