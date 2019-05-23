require('dotenv').config();
require('./db/db');
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');

const partsController = require('./controllers/partsController');

const corsOptions = {
    origin: process.env.CORS_URI,
    optionsSuccessStatus: 200
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(morgan('short'));
app.use(fileUpload());

app.use('/parts', partsController);

app.listen(9000, ()=>{
    console.log('listening on port 9000');
});