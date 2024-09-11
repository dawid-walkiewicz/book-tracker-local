import { useNavigate, useParams } from "react-router-dom"

import { Book, useLibraryStore } from "@/libraryStore"
import { useEffect, useState } from "react"
import { BookEditForm } from "../BookEditForm"

export const EditBookPage = () => {
  const { key } = useParams()
  const navigate = useNavigate()

  const { getBook, editBook } = useLibraryStore((state) => state)

  const [book, setBook] = useState<Book>({
    key: "",
    title: "",
    author_name: [],
    publish_year: 0,
    publishers: [],
    format: "",
    cover_i: null,
    number_of_pages: null,
    isbn: "",
    status: "backlog",
  })

  const [isKeyValid, setIsKeyValid] = useState(true)

  useEffect(() => {
    if (key) {
      const book = getBook(key)
      if (book) {
        editBook(book)
      } else {
        setIsKeyValid(false)
      }
    } else {
      navigate("/add")
    }
  }, [])

  return (
    <div>
      <p>AddBookPage</p>
      <p>{key ? key : "Creating"}</p>
      <BookEditForm />
    </div>
  )
}
