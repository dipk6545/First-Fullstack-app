import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = ({ children }) => {
  const host = `http://localhost:5000`;
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //Get alll notes
  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'auth-token': localStorage.getItem('token'),
      },
    });
    const notes = await response.json();
    setNotes(notes);
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    //Later API callout
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const newNote = await response.json();
    setNotes(notes.concat(newNote));
  };

  //Delete a note
  const deleteNote = async (id) => {
    //Later API callout
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    });

    console.log(response);
  };

  //Edit a note
  const editNote = async ({ _id, title, description, tag }) => {
    //Later API callout
    const response = await fetch(`${host}/api/notes/updatenote/${_id}`, {
      method: 'PUT',
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const res = response.json;
    console.log(res);

    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      if (newNotes[index]._id === _id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  // const [notes, setNotes] = useState(notesInitial)

  return <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes, setNotes }}>{children}</NoteContext.Provider>;
};

export default NoteState;
