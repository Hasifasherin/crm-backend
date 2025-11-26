const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// DB Connection
require('./config/db');

// Routes
app.use('/api/users', require('./app/routes/userRoutes'));
app.use('/api/customers', require('./app/routes/customerRoutes'));
app.use('/api/cases', require('./app/routes/caseRoutes'));

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
