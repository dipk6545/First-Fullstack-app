import React, { useContext } from 'react';
import NoteContext from '../context/noteContext';

const Noteitem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  const handleDelete = ()=>{
    deleteNote(note._id);
  }

  const handleEdit = ()=>{
    updateNote(note);
  }

  return (
    <div className="col-md-3 my-2">
      <div className="card" style={{ width: '18rem' }}>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div className="card-title h5 me-5">{note.title}</div>
            <div>
              <i className="fa-regular fa-trash-can mx-2" onClick={handleDelete} />
              <i className="fa-regular fa-pen-to-square mx-2" onClick={handleEdit}/>
            </div>
          </div>
          <p className="card-text my-2">
            {note.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem
