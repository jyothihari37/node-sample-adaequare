const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');
require('./src/config/db');


app.use(bodyParser.json());

app.use('/api/users', userRoutes);

app.listen(3000, () => {
  console.log('my app listening on port 3000!');
});

app.get('/', (req, res) => {
    res.send('My API running!');
  });
   