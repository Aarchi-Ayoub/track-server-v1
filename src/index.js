const express = require("express");

const app = express();

app.get('/', (_req ,_res)=>{
    _res.send('Hello there');
})

app.listen(3000, ()=>{
    console.log('Server set on port 3000')
})