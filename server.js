const express = require('express');
const app = express();
const db = require('./db'); // Ensure this path is correct relative to your project structure

const bodyParser = require('body-parser'); 
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to our Hotel');
});

//Importing Person Routes

const personRoutes= require('./routes/personRoutes');
app.use('/person',personRoutes);

//Importing MenuItem Routes

const menuItemRoutes =require('./routes/menuItemRoutes')
app.use('/menu',menuItemRoutes);

app.listen(3000, () => {
  console.log('Server is Running on port 3000');
});

