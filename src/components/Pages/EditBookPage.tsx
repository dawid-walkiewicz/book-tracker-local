import { useNavigate, useParams } from "react-router-dom"

import { Book, useLibraryStore } from "@/libraryStore"
import { useEffect, useState } from "react"
import { BookEditForm } from "../BookEditForm"

import { GiQuillInk } from "react-icons/gi";

export const EditBookPage = () => {
  const { key } = useParams()
  const navigate = useNavigate()

  const { getBook } = useLibraryStore((state) => state)

  const book = getBook(key ? key : "")

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
      <BookEditForm book={book} />
    </div>
  )
}
