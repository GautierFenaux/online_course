const express = require("express");
const app = express();
const port = 8000;
const bcrypt = require("bcrypt");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/verifyJWT");
const corsOptions = require('./config/corsOptions');
const cors = require('cors');
const credentials = require('./middleware/credentials');


/**
 * Import the database connection file.
 */
const db = require("./config/database");

/**
 * Import the models.
 */
const Timetable = require("./models/Timetable");
const User = require("./models/User");
const Lesson = require("./models/Lesson");
const TimetableLessons = require("./models/relation/TimetableLessons");
const Level = require("./models/Level");
const Instrument = require("./models/Instrument");
const Style = require("./models/Style");
const UserStyle = require("./models/relation/UserStyle");
const UserInstrument = require("./models/relation/UserInstrument");


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// Allowing Cross origin resource sharing
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.use("/register", require("./routes/api/register"));
app.use("/auth", require("./routes/api/auth"));
app.use("/logout", require("./routes/api/logout"));
app.use('/refresh', require('./routes/api/refresh'));


app.use(verifyJWT);
app.use("/lesson", require("./routes/api/lesson"));


console.log('server.js');


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
     * Syncronize the models.
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
    Level.sync({
      alter: true,
    });
    Instrument.sync({
      alter: true,
    });
    Style.sync({
      alter: true,
    });
    UserStyle.sync({ 
        alter: true,
    });
    UserInstrument.sync({
        alter: true,
    })
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
