const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');

// set PORT
app.set('port', process.env.PORT || 4000);
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Mongodb connected successfully'))
    .catch(err => {
        console.log(err)
        console.log('Mongdb connection faild')
    })

app.use(session({
    secret: 'pass-manager',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 } // 1 day
}));

app.use('/auth', require('./route/auth'))
app.use('/pass', require('./route/passwordContainer'))

app.listen(app.get('port'), () => {
    console.log(`Listening on PORT: ${app.get('port')}`);
})