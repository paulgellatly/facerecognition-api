const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'paulgellatly',
        password: '',
        database: 'smart-brain',
    },
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('success');
});

app.post('/signin', signin.handleSignin(db, bcrypt));

app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt);
});

app.get('/profile/:id', (req, res) => {
    profile.handleProfileGet(req, res, db);
});

app.put('/image', (req, res) => {
    image.handleImage(req, res, db);
});

app.post('/imageurl', (req, res) => {
    image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});

//  --> res = this is working
// /signin --> POST success/fail
// /register --> POST = user
// /profile/:userId --> GET = user
// /image --> PUT --> user

// bcrypt.compare(
//     'apples',
//     '$2a$10$rIvxHO3SbqivA9wGAJ158uWYNZKT1dB/NJjzFhBVicqxKEW2HIKeW',
//     function (err, res) {
//         console.log('first guess', res);
//     }
// );
// bcrypt.compare(
//     'veggies',
//     '$2a$10$rIvxHO3SbqivA9wGAJ158uWYNZKT1dB/NJjzFhBVicqxKEW2HIKeW',
//     function (err, res) {
//         console.log('second guess', res);
//     }
// );

// bcrypt.compareSync('bacon', hash); // true
// bcrypt.compareSync('veggies', hash); // false

// bcrypt.hash(password, null, null, function (err, hash) {
//     console.log(hash);
// });
// // Load hash from your password DB.
// bcrypt.compare('bacon', hash, function (err, res) {
//     // res == true
// });
// bcrypt.compare('veggies', hash, function (err, res) {
//     // res = false
// });
