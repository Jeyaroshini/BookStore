import React, { useState,useEffect } from "react"
import Axios from "axios"
import EditBook from "./EditBook"
const App = () => {
  const [bookData,setBookData] = useState([])
  const [postData,setPostData] = useState([])
  const [isCreate,setIsCreate] = useState(false)
  const [openEdit,setOpenEdit] = useState(false)
  const [modalEditInfo,setModalEditInfo] = useState()
  const [title,setTitle] = useState()
  const[body,setBody] = useState()
  const handleCreate = () => {
    setIsCreate(true)
  }

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleBodyOfTheBook = (event) => {
    setBody(event.target.value)
  }

  const handleDelete = (id) => {
    Axios.delete(`http://127.0.0.1:3000/api/v1/books/${id}`)
    fetchBookData()
  }
  
  const handleClose = () => {
    setOpenEdit(false)
  }
  const handleEdit = (id) => {
    const editInfo = bookData.find((books) => books.id === id)
    setModalEditInfo(editInfo)
    console.log(editInfo)
    setOpenEdit(true)
  }
  const fetchBookData = async () => {
    const { data } = await Axios.get(
      "http://127.0.0.1:3000/api/v1/books"
    );
    const bookData = data;
    setBookData(bookData);
  };
  useEffect(() => {
    fetchBookData();
  }, []);

  const postBook = async () => {
    const posts = {
      title: title,
      body: body
    }
  await Axios.post("http://127.0.0.1:3000/api/v1/books",posts)
  setPostData([posts, ...postData]);
  fetchBookData()
  setIsCreate(false)
  }

  const handleSave = async(editInfo) => {
      console.log("edit",editInfo.id)
      await Axios.put(`http://127.0.0.1:3000/api/v1/books/${editInfo.id}`,editInfo)
      setBookData((oldState) => {
        return oldState.map((booksData) => booksData.id === editInfo.id ? editInfo : booksData)
      })
      
      console.log("bookdata",bookData)
  }
  return (
    <div>
      {bookData.map((bookData) => {
        return (
         <>
          <p>{bookData.title}</p>
          <p>{bookData.body}</p>
          <button onClick={() => handleEdit(bookData.id)}>Edit</button>
          <button onClick={() => handleDelete(bookData.id)}>Delete</button>
          {openEdit ? <EditBook booksInfo={modalEditInfo} onClose={handleClose} onSave={handleSave}/> : null}
          <p>--------------------------------</p>
         </>
        )
      })}
      <button onClick={handleCreate}>Create Book</button>
      {isCreate && (
        <>
          <input placeholder="Enter Title of the book" onChange={handleTitle} value={title} type="text"></input>
          <input placeholder="Enter Description" onChange={handleBodyOfTheBook} value={body} type="text"></input>
          <button onClick={postBook}>Add</button>
        </>
      )}
    </div>
  )
}
export default App