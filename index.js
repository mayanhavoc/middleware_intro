const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('tiny'))
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
})


app.get('/', (req, res) => {
    res.send('Home page')
})

app.get('/dogs', (req, res) => {
    res.send('Woof woof ')
})


app.listen(3000, () => {
    console.log('Server is running on port 3000')
})