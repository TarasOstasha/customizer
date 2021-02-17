const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// connection to data base \\
mongoose.connect('mongodb+srv://user:1111@cluster0.olmgj.mongodb.net/xyz_test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database');
    })
    .catch(() => {
        console.log('Connection failed');
    });
// connection to data base \\
const optionRoutes = require('./routes/options');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/api', optionRoutes);

//console.log(app.use(express.static('../dist')))
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static('../dist'));
//app.use(express.static(path.join(__dirname, 'node_modules')));
//app.use(express.static(path.join(__dirname, 'dist')));
// For static files
app.use(express.static('../dist'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
// For virtual routes use 
app.use('*', (req, res) => 
{
  res.render(__dirname +'/dist/index.html');
 });

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Header",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});




module.exports = app;
