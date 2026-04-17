import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addNote, allNotes, getAllNotes } from '../utils/local-data'

const NoteInput = ({setNotes}) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const nav = useNavigate()

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
        <button className="action" type="button" title="simpan" onClick={()=>{
          addNote({title, body})
          setNotes(getAllNotes())
          nav('/')}}>
          <ion-icon name="checkmark-outline"></ion-icon>
        </button>
      </div>
    </section>
  )
}

export default NoteInput