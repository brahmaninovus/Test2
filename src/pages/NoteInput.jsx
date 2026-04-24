import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from '../utils/api';
import { AuthContext } from '../contexts/AuthContext';

const NoteInput = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const nav = useNavigate();
  const { token } = useContext(AuthContext);

  async function handleSubmit() {
  console.log('TOKEN:', token);

  if (!token) {
    alert('Token tidak ada, silakan login ulang');
    nav('/login');
    return;
  }

  const response = await addNote(token, { title, body });

  if (response.status === 'success') {
    nav('/');
  } else {
    alert(response.message);
  }
}

  return (
    <section className="add-new-page">
      <div className="add-new-page__input">
        <input 
          className="add-new-page__input__title" 
          placeholder="Title..."
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
        <div>
          <div 
          onInput={(e)=>setBody(e.currentTarget.innerText)}
          className="add-new-page__input__body"
          contentEditable
          data-placeholder="Body...">
          </div>
        </div>
      </div>
      <div className="add-new-page__action">
        <button className="action" type="button" title="Simpan" onClick={handleSubmit}>
          <ion-icon name="checkmark-outline"></ion-icon>
        </button>
      </div>
    </section>
  )
}

export default NoteInput