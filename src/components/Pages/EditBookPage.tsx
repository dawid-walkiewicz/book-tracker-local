import { useParams } from "react-router-dom"

import { Book, useLibraryStore } from "@/libraryStore"
import { useEffect, useState } from "react"
import { BookEditForm } from "../BookEditForm"

import { GiQuillInk } from "react-icons/gi";

export const EditBookPage = () => {
  const { key } = useParams()

  const { getBook, editBook, addBook } = useLibraryStore((state) => state)

  const [book, setBook] = useState<Book | null>(null)

  useEffect(() => {
    if (key) {
      const fetchedBook = getBook(key);
      setBook(fetchedBook);
    }
  }, [key, book])

  return (
    <div>
      <div className="flex justify-center items-center gap-4 pb-6">
        {key ? (
          <h1 className="text-3xl font-bold">Edit Book</h1>
        ) : (
          <h1 className="text-3xl font-bold">Add Book</h1>
        )}
        <GiQuillInk className="size-8"/>
      </div>
      {book && (<BookEditForm book={book} doOnSubmit={ key ? editBook : addBook} />)}
    </div>
  )
}
