const express = require('express');
const xss = require('xss');
const path = require('path');
const NotesService = require('./notes-service');

const notesRouter = express.Router();
const jsonParser = express.json();

// const sterilizeNote = note => ({
//   id: note.id,
//   name: xss(note.name),
//   modified: (note.modified),
//   folder_id: note.folder_id,
//   content: xss(note.content),
// });

notesRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        NotesService.getAllNotes(knexInstance)
          .then(notes => {
              res
              .status(200)
              // .json(notes.map(sterilizeNote));
              .json(notes);
          })
          .catch(next);
    })
    .post(jsonParser, (req, res, next) => {
      const { name, modified, folder_id, content } = req.body;
      const requiredFields = {name, folder_id};
      const newNote = {name, modified, folder_id, content};

      for (const [key, value] of Object.entries(requiredFields)) {
        if (value === null) {
          return res.status(400).json({
            error: {message: `Missing '${key} in request body`},
          });
        };
      };

      NotesService.insertNote(req.app.get('db'), newNote)
          .then(note => {
            res
              .status(201)
              .location(path.posix.join(req.originalUrl, `/${note.id}`))
              // .json(sterilizeNote(newNote));
              .json(newNote);
          })
          .catch(next);
    });

notesRouter
  .route('/:note_id')
  .all((req, res, next) => {
    NotesService.getById(req.app.get('db'), req.params.note_id)
      .then(note => {
        if (!note) {
          return res.status(404).json({
              error: {message: `Note doesn't exist`}
          });
        }
        res.note = note;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    // res.json(sterilizeNote(res.note));
    res.json(res.note);
  })
  .delete((req, res, next) => {
    NotesService.deleteNote(req.app.get('db'), req.params.note_id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res) => {
    const {name, modified, folder_id, content} = req.body;
    const noteToUpdate = {name, modified, folder_id, content};
  
    const numberOfValues = Object.values(noteToUpdate).filter(Boolean).length;
    if (numberOfValues === 0) {
        return res.status(400).json({
            error: {
                message: `Request body must contain both name and folder_id`
            }
        });
    }

    // const modified = new Date();
    // const newNoteFields = {
    //   ...noteToUpdate, 
    //   modified
    // }
    
    NoteService.updateNote(
      req.app.get('db'),
      req.params.note_id,
      newNoteFields
    )
    .then(() => {
      res.status(204).end();
    });   
});

module.exports = notesRouter;