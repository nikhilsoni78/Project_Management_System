const express = require('express');
const app = express();


app.use(express.json());


app.get('/', (req,res) => {
    res.send('Server on hai ')
})


app.listen(3000, () => {
    console.log('server is on');
})


