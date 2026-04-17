import React from "react"
import { NoteItem } from "./NoteItem"
import { showFormattedDate } from "../utils"
import { useLocation } from "react-router-dom"

const NoteList = ({notes}) => {
  const location = useLocation()
  const currNotes = location.pathname === '/'
  ? notes.filter((note) => !note.archived) : notes.filter((note) => note.archived) 
  return (
    <>
      {currNotes.map((item)=>(
        <NoteItem
        id={item.id}
        tittle={item.tittle}
        body={item.body}
        archived={item.archived}
        createdAt={showFormattedDate(item.createdAt)}/>
      ))}
    </>
  )
}