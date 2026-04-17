import React from 'react'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { showFormattedDate } from '../utils';
import { archiveNote, deleteNote, getAllNotes } from '../utils/local-data';

const NotePage = ({notes, setNotes}) => {
  const {name} = useParams()
  const nav = useNavigate()
  const note = notes.find((item) => item.id === name)
  if (!note) return <p>Note not found</p>

  return (
    <section className='detail-page'>
      <h3 className='detail-page__title'>{note.title}</h3>
      <p className='detail-page__createdAt'>{showFormattedDate(note.createdAt)}</p>
      <div className='detail-page__body'>{note.body}</div>
    </section>
  )
}

export default NotePage