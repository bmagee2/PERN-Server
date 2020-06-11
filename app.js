// .ENV
require('dotenv').config();

// EXPRESS
const express = require('express');
const app = express();

// CONTROLLERS
const user = require('./controllers/usercontroller');
const monologue = require('./controllers/monologuecontroller');

// DATABASE
const sequelize = require('./db');
sequelize.sync();
app.use(express.json());
app.use(require('./middleware/headers'));

// ROUTES
app.use('/user', user);
app.use(require('./middleware/validate-session'));
app.use('/monologue', monologue);

// LISTEN -- CONSOLE LOG TEST
app.listen(process.env.PORT, () => console.log(`listening on ${process.env.PORT}`));



// POSTMAN TEST
app.use('/test', (req, res) => {
    res.send("postman test");
});