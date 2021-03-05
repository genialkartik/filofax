const app = require('express').express();

const PORT = process.env.PORT || 4000;
app.use(cors());

app.use((req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());

app.use(session({
    secret: 'pass-manager',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 } // 1 day
}));

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
})