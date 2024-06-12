const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// POST route for Menu
router.post('/', async (req, res) => {
  try {
    const data = req.body; // Assuming body contains data 

    // Create a new MenuItem instance
    const newMenu = new MenuItem(data);

    // Save the new MenuItem to the database
    const response = await newMenu.save();
    console.log('data saved');
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET route for Menu
router.get('/', async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log('data fetched');
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET route for MenuItems by taste type
router.get('/:tasteType', async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    if (tasteType === 'sweet' || tasteType === 'spicy' || tasteType === 'sour') {
      const response = await MenuItem.find({ taste: tasteType });
      console.log('response fetched');
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: 'Invalid taste Type' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
