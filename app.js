const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { MongoClient } = require('mongodb');
const playersController = require('./src/controller/playersController');
const { insertPlayers, getPlayers } = playersController();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('client'));

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));

app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/mongodb/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', ((req, res) => {
    res.render('default')
}))

app.get('/setplayers', ((req, res) => {
    res.render('players')
}))

app.post('/game', insertPlayers)

app.get('/players', getPlayers)

app.listen(port, () => {
    debug(`listening on port ${chalk.green(port)}`);
  });