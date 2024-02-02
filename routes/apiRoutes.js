const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid'); // Import the uuid library for generating unique IDs

module.exports = (app) => {
  // Define routes

  // GET request to retrieve notes
  router.get('/notes', async (req, res) => {
    try {
      const data = await fs.readFile('db/db.json', 'utf8');
      const notes = JSON.parse(data);
      // res.json(notes);
      res.send({notes}).status(200)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // POST request to add a new note with a unique ID
  router.post('/notes', async (req, res) => {
    try {
      const newNote = req.body;
      newNote.id = uuidv4(); // Generate a unique ID for the new note
      const data = await fs.readFile('db/db.json', 'utf8');
      const notes = JSON.parse(data);
      notes.push(newNote);
      await fs.writeFile('db/db.json', JSON.stringify(notes, null, 2), 'utf8');
      res.json('Note was added');
    } catch (error) {
      console.error(error, 'error');
      res.status(500).json({ error: 'Internal server error' });
    }
  });

    // DELETE request to remove a note based on its unique ID
    router.delete('/notes/:id', async (req, res) => {
      try {
        const idToDelete = req.params.id;
        const data = await fs.readFile('db/db.json', 'utf8');
        let notes = JSON.parse(data);
        const indexToDelete = notes.findIndex((note) => note.id === idToDelete);
        if (indexToDelete !== -1) {
          notes.splice(indexToDelete, 1);
          await fs.writeFile('db/db.json', JSON.stringify(notes, null, 2), 'utf8');
          res.json('Note was deleted');
        } else {
          res.status(404).json({ error: 'Note not found' });
        }
      } catch (error) {
        console.error(error, 'error');
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    router.put('/notes/:id', async (req, res) => {
      try {
        const idToUpdate = req.params.id;
        const updatedNote = req.body;
        const data = await fs.readFile('db/db.json', 'utf8');
        let notes = JSON.parse(data);
    
        const indexToUpdate = notes.findIndex((note) => note.id === idToUpdate);
    
        if (indexToUpdate !== -1) {
          // Replace the old note with the updated note
          notes[indexToUpdate] = { ...notes[indexToUpdate], ...updatedNote };
    
          await fs.writeFile('db/db.json', JSON.stringify(notes, null, 2), 'utf8');
          res.json('Note was updated');
        } else {
          res.status(404).json({ error: 'Note not found' });
        }
      } catch (error) {
        console.error(error, 'error');
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  

  // Mount the router under the '/api' path
  app.use('/api', router);
};
