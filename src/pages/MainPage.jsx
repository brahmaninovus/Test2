import React, { useMemo, useEffect, useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import NoteList from '../components/NoteList'
import { getNotes, getArchivedNotes } from '../utils/api'
import { AuthContext } from '../contexts/AuthContext'

const MainPage = ({ type }) => {
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const nav = useNavigate()
  const { token } = useContext(AuthContext)
  const location = useLocation()

  useEffect(() => {
    async function fetchNotes() {
      setLoading(true)

      const response =
        type === 'archived'
          ? await getArchivedNotes(token)
          : await getNotes(token)

      if (response.status === 'success') {
        setNotes(response.data)
      }

      setLoading(false)
    }

  fetchNotes()
}, [token, type])

  const filteredNotes = useMemo(() => {
    return notes
      .filter(note =>
        note.title.toLowerCase().includes(search.toLowerCase())
      )
  }, [notes, type, search])

  if (loading) return <p>Loading...</p>

  return (
    <section className='homepage'>
      <h1>
        {type === "active" ? 'Catatan Aktif' : 'Catatan Arsip'}
      </h1>
      <section className='search-bar'>
        <input
          type="text"
          placeholder='Cari berdasarkan judul ...'
          value={search}
          onChange={(e) => { setSearch(e.target.value) }}
        />
      </section>
      <section className='notes-list'>
        <NoteList notes={filteredNotes} type={type} />
      </section>
      <div className='homepage__action'>
        <button className='action' title='Tambah' type='button' onClick={() => nav('/notes/new')}>
          <ion-icon name="add-outline"></ion-icon>
        </button>
      </div>
    </section>
  )
}

export default MainPage