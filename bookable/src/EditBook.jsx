import { Axios } from "axios"
import React, { useCallback, useState } from "react"
import "./index.css"
const EditBook = ({booksInfo,onClose,onSave}) => {
  const [editBook,setEditBook] = useState(booksInfo)
  const [updateEditedData,setUpdateEditedData] = useState([])
  const handleTitleChange = useCallback((event) => {
    setEditBook((oldState) => ({...oldState, title: event.target.value}))
  },[])
  const handleBodyChange = useCallback((event) => {
    setEditBook((oldState) => ({...oldState, body: event.target.value}))
  },[])
  const handleSave = async() => {
    // const update = {
    //   title: editBook.title,7
    //   body: editBook.body
    // }
    // await Axios.patch(`http://127.0.0.1:3000/api/v1/books/${editBook.id}`,update)
    // setUpdateEditedData([update,...updateEditedData])
    // console.log("updatedData",updateEditedData)
    onSave(editBook)
  }
  return (
    <div className="modal">
      <input value={editBook.title} onChange={handleTitleChange}></input>
      <input value={editBook.body} onChange={handleBodyChange}></input><br />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Close</button>
    </div>
  )
}
export default EditBook