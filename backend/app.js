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

// import routes
const optionRoutes = require('./routes/options');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/userAdmin');

const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
//app.use('images', express.static(path.join('backend/images')));
app.use(express.static(path.join(__dirname, 'assets/imgs')));
app.use('/', express.static(path.join(__dirname, 'dist')));

// routes
app.use('/api', optionRoutes);
app.use('/api', userRoutes);
app.use('/api', adminRoutes);

// render index.html from dist on real server
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
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
