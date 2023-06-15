import React, { useContext, useState } from 'react';
import NoteContext from '../context/noteContext';

const Addnotes = (props) => {
  const [note, setNote] = useState({ title: '', description: '', tag: '' });
  const context = useContext(NoteContext);
  const { addNote } = context;

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: '', description: '', tag: '' });
    props.showAlert('Added successfully', 'success')
  };

  return (
    <React.Fragment>
      <div className="container my-3">
        <h2>Add Notes</h2>
        <form className="my-2" onSubmit={handleClick}>
          <div className="mb-3">
            <label htmlFor="exampleInputTitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="title"
              onChange={handleChange}
              required
              minLength={5}
              maxLength={15}
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputDescription" className="form-label">
              Description
            </label>
            <textarea
              type="text"
              className="form-control"
              id="description"
              name="description"
              rows="4"
              onChange={handleChange}
              required
              minLength={5}
              value={note.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputTag" className="form-label">
              Tag
            </label>
            <input type="text" className="form-control" id="tag" name="tag" onChange={handleChange} value={note.tag} />
          </div>

          <button disabled={note.title.length < 5 || note.title.length > 15 || note.description.length < 5} type="submit" className="btn btn-primary">
            Add Note
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Addnotes;
