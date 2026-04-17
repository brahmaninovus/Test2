import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNotes } from '../context/NotesContext'
import NoteList from '../components/NoteList'

const MainPage = ({ type }) => {
  const [search, setSearch] = React.useState('')
  const nav = useNavigate()
  const { activeNotes, archivedNotes } = useNotes()

  // Filter notes based on type and search query
  const filteredNotes = useMemo(() => {
    const notesToFilter = type === 'active' ? activeNotes : archivedNotes
    return notesToFilter.filter(note => 
      note.title.toLowerCase().includes(search.toLowerCase())
    )
  }, [type, activeNotes, archivedNotes, search])

  return (
    <section className='homepage'>
      <h1>
        {type === "active" ? 'Catatan Aktif' : 'Catatan Arsip'}
      </h1>
      <h2>hi</h2>
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
      <div className='hompage__action'>
        <button className='action' title='Tambah' type='button' onClick={() => nav('/notes/new')}>
          <ion-icon name="add-outline"></ion-icon>
        </button>
      </div>
    </section>
  )
}

export default MainPage