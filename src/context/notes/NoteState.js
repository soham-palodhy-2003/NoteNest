import NoteContext from "./NoteContext"
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // GET NOTES
  const getNotes = async () => {
    try {
      // Check if localStorage access is allowed
      if (typeof window.localStorage !== 'undefined') {
        const token = localStorage.getItem('token');
        console.log("Retrieved token:", token);

        // Use the retrieved token
        const response = await fetch(`${host}/api/notes/fetchnotes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token,
          },
        });

        console.log("Fetch request sent:", response);
        const json = await response.json();
        setNotes(json);
      } else {
        console.log("localStorage access restricted. Notes cannot be fetched.");
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // ADD NOTES
  const addNote = async (title, description, tag) => {
    //API call to edit
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    if (Array.isArray(notes)) {
      setNotes(notes.concat(note));
    } else {
      console.error("Error: notes state is not an array");
      // Handle the error (e.g., set notes to an empty array)
    }
  };

  // DELETE NOTES
  const deleteNote = async (id) => {
    //API call to delete
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = response.json();
    console.log(json)
    const newNote = notes.filter((note) => { return note._id !== id });
    setNotes(newNote);
  };

  // EDIT NOTES
  const editNote = async (id, title, description, tag) => {
    //API call to edit
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json)
    let newNotes = JSON.parse(JSON.stringify(notes));
    //logic for editing in client site
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
