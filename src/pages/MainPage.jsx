import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NoteList from '../components/NoteList'

const MainPage = ({ note, type }) => {
  const [search, setSearch] = useState('')
  const nav = useNavigate()
  const filteredNotes = useMemo(
    () => note.filter((item) => item.title.toLowerCase().includes(search.toLowerCase())),
    [note, search]
  )

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
        <NoteList notes={filteredNotes} />
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