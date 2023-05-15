const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');
require('./src/config/db');


app.use(bodyParser.json());


// api routes start from here
app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`my app listening on port ${PORT}!`);
});

app.get('/', (req, res) => {
  res.send('My API running!');
});
