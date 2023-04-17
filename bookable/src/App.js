import React, { useState,useEffect } from "react"
import Axios from "axios"
const App = () => {
  const [bookData,setBookData] = useState([])
  const [postData,setPostData] = useState([])
  const [isCreate,setIsCreate] = useState(false)
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
  return (
    <div>
      {bookData.map((bookData) => {
        return (
         <>
          <p>{bookData.title}</p>
          <p>{bookData.body}</p>
          <button onClick={() => handleDelete(bookData.id)}>Delete</button>
          <p>--------------------------------</p>
         </>
        )
      })}
      <button onClick={handleCreate}>Create Book</button>
      {isCreate && (
        <>
          <input placeholder="Enter Title of the book" onChange={handleTitle} value={title} type="text"></input>
          <input placeholder="Enter Description" onChange={handleBodyOfTheBook}></input>
          <button onClick={postBook}>Add</button>
        </>
      )}
    </div>
  )
}
export default App