const sectionRoutes = require('./routes/section.routes');
var express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use('/api/section', sectionRoutes);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});