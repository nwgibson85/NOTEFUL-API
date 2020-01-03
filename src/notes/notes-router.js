const express = require('express');
const xss = require('xss');
const path = require('path');
const logger = require('../logger');
const NotesService = require('./notes-service');

const notesRouter = express.Router();
const jsonParser = express.json();

const sterializeNote = note => ({
  id: note.id,
  name: xss(note.name),
  modified: (note.modified),
  content: xss(note.content),
  folderId: note.folderId,
})

notesRouter
    .route('/')
    .get((req, res, next) => {
        NotesService.getAllNotes(req.app.get('db'))
        .then(notes => {
            res.json(notes.map(sterializeNote))
        })
        .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
      for (const field of ['name', 'modified']) {
        if (!req.body[field]) {
          logger.error(`${field} is required`)
          return res.status(400).send({
            error: { message: `'${field}' is required` }
          })
        }
      }

      const newNote = { name, modified, content, folderId }
    
      NotesService.insertNote(
        req.app.get('db'),
        newNote
      )
        .then(note => {
          logger.info(`Note with id ${Note.id} created.`)
          res
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${note.id}`))
            .json(sterializeNote(note))
        })
        .catch(next)
    })

notesRouter
  .route('/:note_id')
  .all((req, res, next) => {
    NotesService.getById(
    req.app.get('db'),
    req.params.note_id
    )
    .then(note => {
        if (!note) {
          return res.status(404).json({
              error: { message: `Note doesn't exist` }
          })
        }
        res.note = note 
        next() 
    })
    .catch(next)
  })
  .get((req, res) => {
    res.json(serializeNote(res.note))
  })
  .delete((req, res, next) => {
    NotesService.deleteNote(
        req.app.get('db'),
        req.params.note_id
    )
        .then(numRowsAffected => {
          logger.info(`Note with id ${note_id} deleted.`)
          res.status(204).end()
        })
        .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const { name, modified } = req.body
    const noteToUpdate = { name, modified}
    
    const numberOfValues = Object.values(noteToUpdate).filter(Boolean).length
    if (numberOfValues === 0) {
        return res.status(400).json({
            error: {
                message: `Request body must contain either name or modified`
            }
        })
    }
    
    NotesService.updateNote(
        req.app.get('db'),
        req.params.note_id,
        noteToUpdate
    )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
})

module.exports = notesRouter