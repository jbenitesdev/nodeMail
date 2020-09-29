const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const SMTP_CONFIG = require('./src/config/smtp')
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Codingpedia, Authorization');
    next();
})

const transporter = nodemailer.createTransport({
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: false,
    auth: {
        user: SMTP_CONFIG.user,
        pass: SMTP_CONFIG.pass
    },
    rejectUnauthorized: false,

})

app.post('/titular', async (req, res) => {
    let email = req.body.email
    
    const mailSent = await transporter.sendMail({
        // text: testeEnvioHtml(lista),
        subject: 'Disparando teste',
        from: 'edson.megdrup@gmail.com',
        to: email,
        text:'Parabéns Cadastrado com Sucesso'
    }, (err, info) => {
        console.log('info: ', info)
        res.json(info)
    })


})


var server = app.listen(4006);

server.timeout = 600000