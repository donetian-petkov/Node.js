const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const hashedPassword = '$2b$10$/m98uTorMbpj7RQuvv.VHeBB8QMcnALTPpccYeFkhvDsvrXwrSmU2'; //== secretpassword
const saltRounds = 10;
const secret = 'Mysupersecret';


app.use(cookieParser());


app.get('/hash/:password?', async (req,res) => {

    const salt = await bcrypt.genSalt(saltRounds);

    const hash = await bcrypt.hash(req.params.password, salt);

    res.send(`Password: ${req.params.password} + salt: ${salt} + hash: ${hash}`);

});

app.get('/login/:password', async (req, res) => {

    const isValidPassword = await bcrypt.compare(req.params.password, hashedPassword);

    if (isValidPassword) {
        const payload = {
            username: 'Pesho'
        }

        const options = {
            expiresIn: '1d'
        }


        const token = jwt.sign(payload, secret, options);

        res.send(`Successful login: token: ${token}`);

    } else {
        res.send('Invalid password')
    }

});

app.get('/verify/:token', (req,res) => {


        jwt.verify(req.params.token, secret, (err, decodedToken) => {
            
            if (err) {
                return res.status(401).send('You do not have permissions!');
            }
            res.json(decodedToken);

        });

});


app.listen(5000, () => console.log('Server is listening on port 5000...'));

