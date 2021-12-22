import path from 'path';
import express from 'express';

var models  = require('./models');

const app = express();

const publicPath = express.static(path.join(__dirname, '../'));
const indexPath = path.join(__dirname, '../index.html');

app.use(express.static(path.join(__dirname, 'public')));

app.use(publicPath);

// setup our rest API end points
var AthleteController = require('./controllers/AthleteController');
app.use('/athletes', AthleteController);

app.get('*', (req, res) => {
    res.sendFile(indexPath);
})

export default app;
