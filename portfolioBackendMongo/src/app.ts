import bodyParser from "body-parser";
const sectionRoutes = require('./routes/section.routes');
const tatetiRoutes = require('./routes/tateti.routes');
var express = require('express');
const cors = require('cors');
const app = express();
import connectToDatabase from "./db";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



connectToDatabase().then(() => {
    app.use('/mongoApi/section', sectionRoutes);
    app.use('/mongoApi/tateti', tatetiRoutes);
    app.listen(8081, () => {
        console.log('Server is running on port 8081');
    });
}).catch((error) => {
    console.log(error);
});
