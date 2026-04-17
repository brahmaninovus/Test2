import React from 'react'
import { Link } from 'react-router-dom'

interface ItemProps {
  id?: string,
  title?: string,
  body?: string,
  archived?: boolean, 
  createdAt?: string,
}

export const NoteItem = ({id, title, body, archived, createdAt}:ItemProps) => {
  return (
    <div>
      <h3>
        <Link to={`/notes/${id}`}>{title}</Link>
      </h3>
      <p className='note-item__createdAt'>{createdAt}</p>
      <p className='note-item__body'>{body}</p>
    </div>
  )
}
