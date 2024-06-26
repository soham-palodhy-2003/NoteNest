import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
import '../Stylings/NoteItem.css';

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className='note-item-card'>
      <div className="card-body">
        <h5 className="card-title">{note.title}</h5>
        <p className="card-text">{note.description}</p>
        <i className="fa-regular fa-trash-can fa-xl mx-3" onClick={() => { deleteNote(note._id); props.showAlert("Deleted Successfully", "success"); }}></i>
        <i className="fa-solid fa-pen-to-square fa-xl mx-3" onClick={() => { updateNote(note); }}></i>
      </div>
    </div>
  );
}

export default NoteItem;
