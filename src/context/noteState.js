import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = ({ children }) => {
  const host = `http://localhost:5000`;
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //Get alll notes
  const getAllNotes = async ()=>{
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4Mzc1YzVjYzhlYmRmNzM0NGI5ZjAzIn0sImlhdCI6MTY4NjMzNjk2NX0.YdLTD_A-Vcl4CxZGNhyPAD3lsQRuZRHIoHFfR_mKuqo",     
      },
    });
    const json = await response.json();
    setNotes(json);
  }


  //Add a note
  const addNote = async (title, description, tag) => {
    //Later API callout
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4Mzc1YzVjYzhlYmRmNzM0NGI5ZjAzIn0sImlhdCI6MTY4NjMzNjk2NX0.YdLTD_A-Vcl4CxZGNhyPAD3lsQRuZRHIoHFfR_mKuqo",
        "Content-Type": "application/json",       
      },
      body: JSON.stringify({title, description, tag})
    });
    // const json = response.json;


    const newNote = {
      _id: '6dgfgd45d501442ac22b042a1bda04' + title,
      user: '645d4dc142ac22b02a1bd9f5',
      title: title,
      description: description,
      tag: tag,
      date: '2023-05-11T20:29:08.034Z',
      __v: 0,
    };
    setNotes(notes.concat(newNote));
  };

  //Delete a note
  const deleteNote = async (id) => {
    //Later API callout
    const newNotes = notes.filter(note=>{return note._id!==id});
    setNotes(newNotes);
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4Mzc1YzVjYzhlYmRmNzM0NGI5ZjAzIn0sImlhdCI6MTY4NjMzNjk2NX0.YdLTD_A-Vcl4CxZGNhyPAD3lsQRuZRHIoHFfR_mKuqo",
        "Content-Type": "application/json",       
      },
    });


    
  };

  //Edit a note
  const editNote = async ({_id, title, description, tag}) => {
    //Later API callout
    const response = await fetch(`${host}/api/notes/updatenote/${_id}`, {
      method: "PUT",
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4Mzc1YzVjYzhlYmRmNzM0NGI5ZjAzIn0sImlhdCI6MTY4NjMzNjk2NX0.YdLTD_A-Vcl4CxZGNhyPAD3lsQRuZRHIoHFfR_mKuqo",
        "Content-Type": "application/json",       
      },
      body: JSON.stringify({title, description, tag})
    });

    const json = response.json;

    
    let newNotes = JSON.parse(JSON.stringify(notes));
    for(let index = 0; index < notes.length;index++){
      if(newNotes[index]._id === _id){
        newNotes[index].title = title;
        newNotes[index].description = description
        newNotes[index].tag = tag
        break;
      }      
    }
    setNotes(newNotes);
  };

  // const [notes, setNotes] = useState(notesInitial)

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteState;
