import React, { useContext, useState } from 'react';
import NoteContext from '../context/noteContext';

const Addnotes = () => {
  const [note, setNote] = useState({ title: '', description: '', tag: '' });
  const context = useContext(NoteContext);
  const { addNote } = context;

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    console.log('Note Added');
  };

  return (
    <React.Fragment>
      <div className="container my-3">
        <h2>Add Notes</h2>
        <form className="my-2">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Description
            </label>
            <textarea
              type="text"
              className="form-control"
              id="description"
              name="description"
              rows="4"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add Note
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Addnotes;
