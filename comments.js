// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const port = 3000;

// Use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, '../client/dist')));

// Require database
const db = require('../database/index.js');

// Get comments from database
app.get('/comments', (req, res) => {
  db.getComments((err, data) => {
    if (err) {
      console.log('Error getting comments from database: ', err);
      res.sendStatus(500);
    } else {
      console.log('Successfully retrieved comments from database: ', data);
      res.status(200).send(data);
    }
  });
});

// Post comments to database
app.post('/comments', (req, res) => {
  let comment = req.body;
  db.postComments(comment, (err, data) => {
    if (err) {
      console.log('Error posting comment to database: ', err);
      res.sendStatus(500);
    } else {
      console.log('Successfully posted comment to database: ', data);
      res.status(200).send(data);
    }
  });
});

// Delete comments from database
app.delete('/comments', (req, res) => {
  let comment = req.body;
  db.deleteComments(comment, (err, data) => {
    if (err) {
      console.log('Error deleting comment from database: ', err);
      res.sendStatus(500);
    } else {
      console.log('Successfully deleted comment from database: ', data);
      res.status(200).send(data);
    }
  });
});

// Update comments in database
app.put('/comments', (req, res) => {
  let comment = req.body;
  db.updateComments(comment, (err, data) => {
    if (err) {
      console.log('Error updating comment in database: ', err);
      res.sendStatus(500);
    } else {
      console.log('Successfully updated comment in database: ', data);
      res.status(200).send(data);
    }
  });
});

// Listen on port 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});