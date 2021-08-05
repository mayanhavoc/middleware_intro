const express = require('express');
const app = express();
const morgan = require('morgan');


app.use(morgan('tiny'))
app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})

app.use('/dogs', (req, res, next) => {
    console.log('I love dogs')
    next();
})

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if(password === 'chickennugget'){
        next();
    }
    res.send('Sorry, you need a password')
}

app.get('/secret', verifyPassword, (req, res) => {
    res.send('My secret is: Sometimes I wear headphones in public')
})

app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('Home page')
})

app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('Woof woof ')
})



app.listen(3000, () => {
    console.log('Server is running on port 3000')
})