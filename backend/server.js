const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');

const app = express();


// json 요청의 본문을 해석할수있게 bodyparser 사용
app.use(bodyParser.json())


// 테이블 생성하기
db.pool.query(`CREATE TABLE lists (
    id INTEGER AUTO_INCREMENT,
    value TEXT,
    PRIMARY KEY (id)
    )`, (err,results,fields)=>{
        if(err) console.log(err)
        console.log('results',results)
    })




// DB list 의 모든값을 응답
app.get('/api/values',(req,res)=>{
    // get all data from db
    db.pool.query('SELECT * FROM lists;',
        (err,results,fields)=>{
            if(err) return res.status(500).send(err)
            else return res.json(results)
        });
})

// 클라이언트에서 입력된 글을 Insert
app.post('/api/value',(req,res,next)=>{
    db.pool.query('INSERT INTO lists (value) VALUES("${req.body.value}")',
    (err,results,fields)=>{
        if(err) res.status(500).send(err)
        else return res.json({success:true,value:req.body.value})
    })
})



app.listen(5000,()=>{
    console.log('Listening port 5000 ')
})