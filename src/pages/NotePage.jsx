import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { showFormattedDate } from '../utils';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/api';
import { AuthContext } from '../contexts/AuthContext';

const NotePage = () => {
  const { id } = useParams()
  const nav = useNavigate()
  const { token } = useContext(AuthContext)
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNote() {
      const response = await getNote(token, id)

      if (response.status === 'success') {
        setNote(response.data)
      }

      setLoading(false)
    }

    fetchNote()
  }, [id, token])

  if (loading) return <p>Loading...</p>
  if (!note) return <p>Note not found</p>

  async function handleDelete() {
    await deleteNote(token, id)
    nav('/')
  }

  async function handleArchive() {
    await archiveNote(token, id)
    nav('/')
  }

  return (
    <section className='detail-page'>
      <h3 className='detail-page__title'>{note.title}</h3>
      <p className='detail-page__createdAt'>{showFormattedDate(note.createdAt)}</p>
      <div className='detail-page__body'>{note.body}</div>
      <div className='detail-page__action'>
        <button 
          className="action" 
          type="button" 
          title={note.archived ? "Pindahkan" : "Arsipkan"} 
          onClick={async () => {
            if (note.archived) {
              await unarchiveNote(token, id); // keluar dari arsip
            } else {
              await archiveNote(token, id);
            }
            nav('/')
          }}>
          <ion-icon size="large" name={note.archived ? "arrow-undo-outline" : "archive-outline"}></ion-icon>
        </button>
        <button className="action" type="button" title="Hapus" onClick={handleDelete}>
          <ion-icon size="large" name="trash-outline"></ion-icon>
        </button>
      </div>
    </section>
  )
}

export default NotePage