import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/noteContext';
import Noteitem from './Noteitem';
import Addnotes from './Addnotes';

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getAllNotes, editNote } = context;
  const [note, setNote] = useState({
    _id: '',
    title: '',
    description: '',
    tag: '',
  });
  useEffect(() => {
    getAllNotes();
    //eslint-disable-next-line
  }, []);

  const updateNote = (currentnote) => {
    ref.current.click();
    console.log(currentnote);
    setNote(currentnote);
  };

  const ref = useRef(null);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note);
  };

  return (
    <>
      <Addnotes />

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-2">
                <div className="mb-3">
                  <label htmlFor="exampleInputTitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={note.title}
                    id="title"
                    name="title"
                    onChange={handleChange}
                    required
                    minLength={5}
                    maxLength={15}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputDescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={note.description}
                    id="description"
                    name="description"
                    rows="3"
                    onChange={handleChange}
                    required
                    minLength={5}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputTag" className="form-label">
                    Tag
                  </label>
                  <input type="text" className="form-control" value={note.tag} id="tag" name="tag" onChange={handleChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleClick}
                disabled={note.title.length < 5 || note.title.length > 15 || note.description.length < 5}
              >
                Update note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">{notes.length === 0 && 'No notes to display'}</div>
        {notes.map((note) => (
          <Noteitem key={note._id} updateNote={updateNote} note={note} />
        ))}
      </div>
    </>
  );
};
export default Notes;
