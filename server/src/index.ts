import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

interface IconEntry {
  id: string;
  componentName: string;
  svgContent: string;
  contributor: string;
  message: string;
  date?: string;
}

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'guestbook.json');

app.use(express.json());
app.use(cors());

app.get('/api/icons', (req: Request, res: Response) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading guestbook data:', err);
      return res.status(500).json({ error: 'Could not read guestbook data' });
    }
    
    try {
      const icons: IconEntry[] = JSON.parse(data || '[]');
      res.json(icons);
    } catch (parseErr) {
      console.error('Error parsing guestbook data:', parseErr);
      res.status(500).json({ error: 'Invalid guestbook data format' });
    }
  });
});

app.post('/api/icons', (req: Request, res: Response) => {
  const newIcon: IconEntry = req.body;
  
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
      const icons: IconEntry[] = JSON.parse(data || '[]');
      
      const isDuplicate = icons.some(
        icon => icon.id === newIcon.id || icon.componentName === newIcon.componentName
      );
      
      if (isDuplicate) {
        return res.status(409).json({ 
          error: 'An icon with this id or componentName already exists. Icon names must be unique.' 
        });
      }
      
      icons.push(newIcon);
      
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
