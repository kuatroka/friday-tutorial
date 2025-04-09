const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'guestbook.json');

// Middleware
app.use(express.json());
app.use(cors());

// Get all icons
app.get('/api/icons', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading guestbook data:', err);
      return res.status(500).json({ error: 'Could not read guestbook data' });
    }
    
    try {
      const icons = JSON.parse(data || '[]');
      res.json(icons);
    } catch (parseErr) {
      console.error('Error parsing guestbook data:', parseErr);
      res.status(500).json({ error: 'Invalid guestbook data format' });
    }
  });
});

// Add a new icon
app.post('/api/icons', (req, res) => {
  const newIcon = req.body;
  
  // Validate required fields
  if (!newIcon || !newIcon.id || !newIcon.componentName || !newIcon.svgContent) {
    return res.status(400).json({ 
      error: 'Missing required icon properties. Required: id, componentName, svgContent' 
    });
  }
  
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading guestbook data:', err);
      return res.status(500).json({ error: 'Could not read guestbook data' });
    }
    
    try {
      const icons = JSON.parse(data || '[]');
      
      // Check for duplicate icon names to ensure uniqueness
      const isDuplicate = icons.some(
        icon => icon.id === newIcon.id || icon.componentName === newIcon.componentName
      );
      
      if (isDuplicate) {
        return res.status(409).json({ 
          error: 'An icon with this id or componentName already exists. Icon names must be unique.' 
        });
      }
      
      // Add the new icon
      icons.push(newIcon);
      
      // Write updated data back to file
      fs.writeFile(DATA_FILE, JSON.stringify(icons, null, 2), writeErr => {
        if (writeErr) {
          console.error('Error writing guestbook data:', writeErr);
          return res.status(500).json({ error: 'Could not save icon' });
        }
        
        res.status(201).json(newIcon);
      });
    } catch (parseErr) {
      console.error('Error parsing guestbook data:', parseErr);
      res.status(500).json({ error: 'Invalid guestbook data format' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
