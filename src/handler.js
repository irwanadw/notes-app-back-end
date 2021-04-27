const { nanoid } = require('nanoid')
const notes = require('./notes')

/* this is addNotehandler function */
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload

  const id = nanoid(16)
  const createdAt = new Date().toISOString()
  const updatedAt = createdAt

  const newNote = {
    title, tags, body, id, createdAt, updatedAt
  }
  notes.push(newNote)
  const isSuccess = notes.filter((note) => note.id === id).length > 0
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id
      }
    })
    response.code(201)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan'
  })
  response.code(500)
  return response
}

/* this is getAllNotes handler function */
const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes
  }
})

/* this is getNoteByIdHandler function */
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params

  const note = notes.filter((n) => n.id === id)[0]
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note
      }
    }
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan'
  })
  response.code(404)
  return response
}

/** thi is editNoteById Handler function */
const editNoteByIdHandler = (request, h) => {
  const { id } = request.params

  /** request payload and update edit date */
  const { title, tags, body } = request.payload
  const updatedAt = new Date().toISOString()

  /** get index array by id */
  const index = notes.findIndex((note) => note.id === id)

  /** checking is id available or not */
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt
    }
    /** response if id is available */
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui'
    })
    response.code(200)
    return response
  }
  /** response if id isn't available */
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

/** this is deleteNoteByIdHandler */
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params

  /** checking is id available or not */
  const index = notes.findIndex((note) => note.id === id)

  /** if id is available, return notes has been deleted */
  if (index !== -1) {
    notes.splice(index, 1)
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus'
    })
    response.code(200)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler
}
