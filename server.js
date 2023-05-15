const express = require("express");
const app = express();
const port = 8000;
const bcrypt = require("bcrypt");
require('dotenv').config();
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middleware/verifyJWT');
/**
 * Import the database connection file.
 */
const db = require("./config/database");

/**
 * Import the Post model.
 */
const Timetable = require("./models/Timetable");
const User = require("./models/User");
const Lesson = require('./models/Lesson');
const TimetableLessons = require('./models/relation/TimetableLessons');


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

app.use('/register', require('./routes/api/register'));
app.use('/auth', require('./routes/api/auth'));
app.use('/logout', require('./routes/api/logout'));


app.use(verifyJWT);
app.use('/lesson', require('./routes/api/lesson'));


/**
 * Create a anonymous function to establish the database connection.
 * After the connection is established, start the server.
 */
const initApp = async () => {
    console.log("Testing the database connection..");
    /**
     * Test the connection.
     * You can use the .authenticate() function to test if the connection works.
     */
    try {
        await db.authenticate();
        console.log("Connection has been established successfully.");

        /**
         * Syncronize the Post model.
         */
        User.sync({
          alter: true,
        });
        Lesson.sync({
            alter: true,
        });
        Timetable.sync({
            alter: true,
        });
        TimetableLessons.sync({
            alter: true,
        }); 
        
        /**
         * Start the web server on the specified port.
         */
        app.listen(port, () => {
            console.log(`Server is up and running at: http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error.original);
    }
};

/**
 * Initialize the application.
 */
initApp();












































// require('dotenv').config();
// const express = require('express');
// const path = require('path');
// const app = express();
// const mongoose = require('mongoose');
// const connectDB = require('./config/dbConn');
// const { connect } = require('http2');

// const dbConn = require("./config/dbConn");
// dbConn();
// const express = require('express');
// const bodyParser = require('body-parser');


// // router import
// const user = require('./routes/api/user');
// const sequelize = require("./config/dbConn");

// sequelize();



// const app = express();


// app.use(express.json())
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


// // Routing
// app.use('/api', user)


// // simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to  application." });
// });

// const { Sequelize } = require('sequelize');
// require('dotenv').config()

// // set port, listen for requests
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

// const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
//     host: process.env.PGHOST,
//     port:process.env.PGPORT,
//     dialect: 'postgres'
//   });

//  sequelize.authenticate().then(() => {
//     console.log('connection successful');
//  }).catch((err) => {
//     console.log('error' + err);
//  });


// console.log('another task');
