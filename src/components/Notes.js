import React, { useContext, useEffect } from 'react';
import NoteContext from '../context/noteContext';
import Noteitem from './Noteitem';
import Addnotes from './Addnotes';

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getAllNotes } = context;
  useEffect(() => {
    getAllNotes();
  }, [])
  
  return (
    <>
      <Addnotes />
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => (
          <Noteitem key={note._id} note={note} />
        ))}
      </div>
    </>
  );
};
export default Notes;
